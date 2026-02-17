// Featured data
const featuresData = [
    {
        icon: "fa-truck-fast",
        title: "Fast Delivery",
        desc: "We ensure quick delivery of your products safely."
    },
    {
        icon: "fa-headphones",
        title: "24/7 Support",
        desc: "Our team is always ready to assist you anytime."
    },
    {
        icon: "fa-shield-halved",
        title: "Secure Payment",
        desc: "Your payments are fully protected with advanced security."
    },
    {
        icon: "fa-rotate-left",
        title: "Easy Return",
        desc: "Return products easily with our simple return process."
    }
];

const container = document.getElementById("featureCards");
// Display Feature 
featuresData.forEach(item => {
    container.innerHTML += `
    <div class="relative bg-white rounded-xl pt-12 pb-6 px-6 shadow text-center">

      <!-- Icon -->
      <div class="absolute -top-8 left-1/4 -translate-x-1/2 
                  bg-gray-100 w-16 h-16 rounded-lg 
                  flex items-center justify-center 
                  border-[3px] border-white">
        <i class="fa-solid ${item.icon} text-2xl text-primary"></i>
      </div>

      <!-- Content -->
      <h3 class="text-xl font-semibold mt-4 mb-2">${item.title}</h3>
      <p class="text-gray-600 text-sm">${item.desc}</p>

    </div>
  `;
});
// Load Top Trending Data 
fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => {
        // highest rating products
        const sorted = data.sort((a, b) => b.rating.rate - a.rating.rate);

        // Top 3 highest rating products
        const topThree = sorted.slice(0, 3);

        const container = document.getElementById("trendingContainer");
        //Display Trending products
        topThree.forEach(product => {
            container.innerHTML += `
        <div class="bg-white shadow rounded-xl overflow-hidden">

          <!-- Image -->
          <div class="bg-gray-100 flex justify-center p-6">
            <img src="${product.image}" alt="${product.title}" class="h-40 object-contain">
          </div>

          <!-- Content -->
          <div class="p-4 space-y-3">

            <!-- Category & Rating -->
            <div class="flex justify-between items-center">
              <span class="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">
                ${product.category}
              </span>

              <span class="flex items-center text-sm text-gray-600">
                <i class="fa-solid fa-star text-yellow-400 mr-1"></i>
                ${product.rating.rate} (${product.rating.count})
              </span>
            </div>

            <!-- Title -->
            <h3 class="font-semibold text-lg line-clamp-2">
              ${product.title}
            </h3>

            <!-- Price -->
            <p class="font-bold text-xl">$${product.price}</p>

            <!-- Buttons -->
            <div class="flex gap-3 pt-2">
              <button class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-100">
                <i class="fa-regular fa-eye"></i>
                Details
              </button>

              <button class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm hover:opacity-90">
                <i class="fa-solid fa-cart-shopping"></i>
                Add
              </button>
            </div>

          </div>
        </div>
      `;
        });
    });

// Products Data Load 
const homeSection = document.getElementById("home-sections");
const productsSection = document.getElementById("products-sections");

function showHome() {
    homeSection.classList.remove("hidden");
    productsSection.classList.add("hidden");
}

function showProducts() {
    homeSection.classList.add("hidden");
    productsSection.classList.remove("hidden");

    // এখন Products section এ গেলে সব products load হবে
    if (allProducts.length > 0) {
        renderProducts(allProducts); // All products দেখাবে
        setActiveAllButton();        // All button active হবে
    } else {
        loadProducts(); // fetch না করা হলে load করবে
    }
}

// Global variables
const productsContainer = document.getElementById("productsContainer");
const categoryButtons = document.getElementById("categoryButtons");
const errorMessage = document.getElementById("errorMessage");
let allProducts = [];

// Fetch all products
fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => {
        allProducts = data;

        // যদি user এখনই Products section এ থাকে, তাহলে render হবে
        if (!productsSection.classList.contains("hidden")) {
            renderProducts(allProducts);
            setActiveAllButton();
        }
    });

// Fetch categories
fetch("https://fakestoreapi.com/products/categories")
    .then(res => res.json())
    .then(categories => {
        renderCategoryButtons(categories);
    });

// Render category buttons
function renderCategoryButtons(categories) {
    const allBtn = `<button id="allBtn" class="btn btn-outline bg-primary text-white" onclick="filterCategory('all', this)">All</button>`;
    categoryButtons.innerHTML = allBtn;

    categories.forEach(cat => {
        const safeCat = cat.replace(/'/g, "\\'");
        categoryButtons.innerHTML += `
        <button class="btn btn-outline" onclick="filterCategory('${safeCat}', this)">
            ${cat}
        </button>
    `;
    });
}

// Set All button active
function setActiveAllButton() {
    const btns = categoryButtons.querySelectorAll("button");
    btns.forEach(b => b.classList.remove("bg-primary", "text-white"));
    const allBtn = document.getElementById("allBtn");
    if(allBtn) allBtn.classList.add("bg-primary", "text-white");
}

// Filter products by category
function filterCategory(category, clickedBtn) {
    const btns = categoryButtons.querySelectorAll("button");
    btns.forEach(b => b.classList.remove("bg-primary", "text-white"));
    clickedBtn.classList.add("bg-primary", "text-white");

    let filtered = [];
    if (category === "all") {
        filtered = allProducts;
    } else {
        filtered = allProducts.filter(p => p.category === category);
    }

    if (filtered.length === 0) {
        productsContainer.innerHTML = "";
        errorMessage.classList.remove("hidden");
    } else {
        errorMessage.classList.add("hidden");
        renderProducts(filtered);
    }
}

// Render products
function renderProducts(products) {
    productsContainer.innerHTML = ""; // clear previous products

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "border-gray-500 rounded-lg shadow p-4 flex flex-col";

        // Image
        const imgDiv = document.createElement("div");
        imgDiv.className = "bg-gray-200 flex justify-center items-center h-48 mb-4";
        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.title;
        img.className = "h-full object-contain";
        imgDiv.appendChild(img);
        card.appendChild(imgDiv);

        // Category + Rating
        const catRate = document.createElement("div");
        catRate.className = "flex justify-between items-center mb-2";

        const cat = document.createElement("span");
        cat.textContent = product.category;
        cat.className = "text-primary-light px-2 py-1 rounded bg-primary/10";

        const rate = document.createElement("span");
        rate.innerHTML = `<i class="fas fa-star text-yellow-500"></i> ${product.rating.rate} (${product.rating.count})`;

        catRate.appendChild(cat);
        catRate.appendChild(rate);
        card.appendChild(catRate);

        // Title
        const title = document.createElement("h3");
        title.textContent = product.title;
        title.className = "font-semibold mb-2";
        card.appendChild(title);

        // Price
        const price = document.createElement("p");
        price.textContent = `$${product.price}`;
        price.className = "font-bold mb-2";
        card.appendChild(price);

        // Buttons
        const btnDiv = document.createElement("div");
        btnDiv.className = "flex gap-2";

        const detailsBtn = document.createElement("button");
        detailsBtn.innerHTML = `<i class="fas fa-eye mr-1"></i> Details`;
        detailsBtn.className = "border border-gray-400 px-3 py-1 rounded bg-white";
        detailsBtn.onclick = () => openModal(product);

        const addBtn = document.createElement("button");
        addBtn.innerHTML = `<i class="fas fa-cart-plus mr-1"></i> Add`;
        addBtn.className = "bg-primary text-white px-3 py-1 rounded";

        btnDiv.appendChild(detailsBtn);
        btnDiv.appendChild(addBtn);
        card.appendChild(btnDiv);

        productsContainer.appendChild(card);
    });
}



// Details modal
function openModal(product) {
    // set content
    document.getElementById("modalTitle").innerText = product.title;
    document.getElementById("modalDescription").innerText = product.description;
    document.getElementById("modalRating").innerHTML = `<i class="fas fa-star text-yellow-500"></i> ${product.rating.rate} (${product.rating.count})`;

    // show modal
    const modal = document.getElementById("productModal");
    if (typeof modal.showModal === "function") {
        modal.showModal();
    } else {
        // fallback: alert
        alert(`${product.title}\n\n${product.description}`);
    }
}


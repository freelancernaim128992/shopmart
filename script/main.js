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

  loadProducts(); // products data load করবে
}

function loadProducts() {
  fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("productsContainer");
      container.innerHTML = "";

      data.forEach(product => {
        container.innerHTML += `
          <div class="border p-4 mb-3">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
          </div>
        `;
      });
    });
}

const productsContainer = document.getElementById("productsContainer");
const categoryButtons = document.getElementById("categoryButtons");
const errorMessage = document.getElementById("errorMessage");

let allProducts = [];

// Fetch all products
fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    renderProducts(allProducts);
  });

// Fetch categories
fetch("https://fakestoreapi.com/products/categories")
  .then(res => res.json())
  .then(categories => {
    renderCategoryButtons(categories);
  });

function renderCategoryButtons(categories) {
  const allBtn = `<button class="btn btn-outline btn-primary active" onclick="filterCategory('all', this)">All</button>`;
  categoryButtons.innerHTML = allBtn;

  categories.forEach(cat => {
    categoryButtons.innerHTML += `
      <button class="btn btn-outline" onclick="filterCategory('${cat}', this)">
        ${cat}
      </button>
    `;
  });
}

function filterCategory(category, btn) {
  document.querySelectorAll("#categoryButtons button").forEach(b => {
    b.classList.remove("btn-primary");
  });

  btn.classList.add("btn-primary");

  if (category === "all") {
    renderProducts(allProducts);
  } else {
    const filtered = allProducts.filter(p => p.category === category);

    if (filtered.length === 0) {
      productsContainer.innerHTML = "";
      errorMessage.classList.remove("hidden");
    } else {
      errorMessage.classList.add("hidden");
      renderProducts(filtered);
    }
  }
}

function renderProducts(products) {
  productsContainer.innerHTML = "";
  errorMessage.classList.add("hidden");

  products.forEach(product => {
    productsContainer.innerHTML += `
      <div class="bg-white shadow rounded-xl overflow-hidden">

        <div class="bg-gray-100 flex justify-center p-6">
          <img src="${product.image}" class="h-40 object-contain">
        </div>

        <div class="p-4 space-y-3">

          <div class="flex justify-between items-center">
            <span class="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">
              ${product.category}
            </span>

            <span class="flex items-center text-sm text-gray-600">
              <i class="fa-solid fa-star text-yellow-400 mr-1"></i>
              ${product.rating.rate} (${product.rating.count})
            </span>
          </div>

          <h3 class="font-semibold text-lg line-clamp-2">
            ${product.title}
          </h3>

          <p class="font-bold text-xl">$${product.price}</p>

          <div class="flex gap-3 pt-2">
            <button onclick="openDetails(${product.id})"
              class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-100">
              <i class="fa-regular fa-eye"></i>
              Details
            </button>

            <button class="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm">
              <i class="fa-solid fa-cart-shopping"></i>
              Add
            </button>
          </div>

        </div>
      </div>
    `;
  });
}

// Details modal
function openDetails(id) {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
    .then(product => {
      document.getElementById("modalTitle").innerText = product.title;
      document.getElementById("modalDescription").innerText = product.description;
      document.getElementById("modalRating").innerText =
        `Rating: ${product.rating.rate} (${product.rating.count})`;

      document.getElementById("productModal").showModal();
    });
}


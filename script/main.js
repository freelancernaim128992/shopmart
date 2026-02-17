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

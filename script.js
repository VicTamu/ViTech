document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { name: "USB-C Fast Charger", category: "Chargers", price: 15.99, image: "images/usb-c-fast-charger.jpg" },
    { name: "Multi-USB Charging Cable", category: "Chargers", price: 19.99, image: "images/multi-usb-charging-cable.jpg" },
    { name: "Magnetic Charging Cable", category: "Chargers", price: 13.49, image: "images/magnetic-charging-cable.jpg" },

    { name: "HDMI 4K Cable", category: "Cables", price: 6.99, image: "images/hdmi-4k-cable.jpg" },
    { name: "USB-C to HDMI Adapter", category: "Cables", price: 14.99, image: "images/usb-c-hdmi-adapter.jpg" },
    { name: "25ft. CAT6 Ethernet Cable", category: "Cables", price: 5.89, image: "images/ethernet-cable.jpg" },
    { name: "Power Strip", category: "Cables", price: 12.79, image: "images/power-strip.jpg" },

    { name: "Wireless Keyboard", category: "Computer", price: 29.99, image: "images/wireless-keyboard.jpg" },
    { name: "Gaming Mouse", category: "Computer", price: 23.99, image: "images/gaming-mouse.jpg" },
    { name: "USB Hub (4-Port)", category: "Computer", price: 12.99, image: "images/usb-hub.jpg" },

    { name: "Laptop Stand", category: "Desktop", price: 54.99, image: "images/laptop-stand.jpg" },
    { name: "Desktop Monitor", category: "Desktop", price: 97.49, image: "images/desktop-monitor.jpg" },
    { name: "Monitor Arm Mount", category: "Desktop", price: 42.99, image: "images/monitor-mount.jpg" },
    { name: "Apple Desktop Monitor", category: "Desktop", price: 287.99, image: "images/apple-desktop-monitor.jpg" }
  ];

  // Rotating Showcase
  const showcaseImageFront = document.getElementById("showcase-image-front");
  const showcaseNameFront = document.getElementById("showcase-name-front");
  const showcaseCategoryFront = document.getElementById("showcase-category-front");
  const showcasePriceFront = document.getElementById("showcase-price-front");
  
  const showcaseImageBack = document.getElementById("showcase-image-back");
  const showcaseNameBack = document.getElementById("showcase-name-back");
  const showcaseCategoryBack = document.getElementById("showcase-category-back");
  const showcasePriceBack = document.getElementById("showcase-price-back");
  
  const rotatingCard = document.querySelector(".rotating-card");
  let currentProductIndex = 0;
  let isShowingFront = true;

  function updateShowcase() {
    const currentProduct = products[currentProductIndex];
    const nextProduct = products[(currentProductIndex + 1) % products.length];
    
    if (showcaseImageFront && currentProduct) {
      if (isShowingFront) {
        // Update back of card while front is showing
        showcaseImageBack.src = nextProduct.image;
        showcaseNameBack.textContent = nextProduct.name;
        showcaseCategoryBack.textContent = nextProduct.category;
        showcasePriceBack.textContent = `$${nextProduct.price.toFixed(2)}`;
      } else {
        // Update front of card while back is showing
        showcaseImageFront.src = nextProduct.image;
        showcaseNameFront.textContent = nextProduct.name;
        showcaseCategoryFront.textContent = nextProduct.category;
        showcasePriceFront.textContent = `$${nextProduct.price.toFixed(2)}`;
      }

      rotatingCard.classList.toggle("animate");
      isShowingFront = !isShowingFront;
      currentProductIndex = (currentProductIndex + 1) % products.length;
    }
  }

  // Initial showcase setup
  if (showcaseImageFront && products.length > 0) {
    // Set initial front card
    showcaseImageFront.src = products[0].image;
    showcaseNameFront.textContent = products[0].name;
    showcaseCategoryFront.textContent = products[0].category;
    showcasePriceFront.textContent = `$${products[0].price.toFixed(2)}`;
    
    // Set initial back card
    const secondProduct = products[1] || products[0];
    showcaseImageBack.src = secondProduct.image;
    showcaseNameBack.textContent = secondProduct.name;
    showcaseCategoryBack.textContent = secondProduct.category;
    showcasePriceBack.textContent = `$${secondProduct.price.toFixed(2)}`;

    // Start rotation
    setInterval(updateShowcase, 4000);
  }

  const productGrid = document.getElementById("productGrid");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");

  function displayProducts(filteredProducts) {
    productGrid.innerHTML = "";
    if (filteredProducts.length === 0) {
      productGrid.innerHTML = "<p>No products found.</p>";
      return;
    }

    filteredProducts.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="category">${product.category}</p>
          <p class="price">$${product.price.toFixed(2)}</p>
          <button class="btn-primary">Add to Cart</button>
        </div>
      `;
      productGrid.appendChild(card);
    });

    setupAddToCartButtons(filteredProducts);
  }

  function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filtered = products.filter(product => {
      const matchCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchSearch = product.name.toLowerCase().includes(searchTerm);
      return matchCategory && matchSearch;
    });

    displayProducts(filtered);
  }

  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.name === product.name);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart.`);
  }

  function setupAddToCartButtons(filteredProducts) {
    const buttons = document.querySelectorAll(".product-card .btn-primary");
    buttons.forEach((btn, i) => {
      btn.addEventListener("click", () => addToCart(filteredProducts[i]));
    });
  }

  if (productGrid && searchInput && categoryFilter) {
    searchInput.addEventListener("input", filterProducts);
    categoryFilter.addEventListener("change", filterProducts);
    displayProducts(products);
  }

  // Contact page form handler (if present)
  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      alert("Message sent! We'll be in touch.");
      form.reset();
    });
  }

  // Cart Page Handling
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotalEl = document.getElementById("cartTotal");
  const clearCartBtn = document.getElementById("clearCart");
  const checkoutBtn = document.querySelector('.cart-actions .btn-primary');

  function renderCart() {
    if (!cartItemsContainer || !cartTotalEl) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p class='empty-cart'>Your cart is empty.</p>";
      cartTotalEl.textContent = "0.00";
      // Disable checkout button if cart is empty
      if (checkoutBtn) {
        checkoutBtn.disabled = true;
        checkoutBtn.style.opacity = '0.5';
        checkoutBtn.style.cursor = 'not-allowed';
      }
      return;
    }

    // Enable checkout button if cart has items
    if (checkoutBtn) {
      checkoutBtn.disabled = false;
      checkoutBtn.style.opacity = '1';
      checkoutBtn.style.cursor = 'pointer';
    }

    let total = 0;
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const itemEl = document.createElement("div");
      itemEl.className = "cart-item";
      itemEl.innerHTML = `
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p class="category">${item.category}</p>
          <p class="price">$${item.price.toFixed(2)}</p>
        </div>
        <div class="cart-item-quantity">
          <button class="quantity-btn minus" data-name="${item.name}">-</button>
          <span>${item.quantity}</span>
          <button class="quantity-btn plus" data-name="${item.name}">+</button>
        </div>
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
      `;
      cartItemsContainer.appendChild(itemEl);
    });

    cartTotalEl.textContent = total.toFixed(2);

    // Add event listeners to quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const productName = e.target.dataset.name;
        const isPlus = e.target.classList.contains('plus');
        const currentQuantity = parseInt(e.target.parentElement.querySelector('span').textContent);
        const newQuantity = isPlus ? currentQuantity + 1 : currentQuantity - 1;
        updateQuantity(productName, newQuantity);
      });
    });
  }

  function updateQuantity(productName, newQuantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = cart.findIndex(item => item.name === productName);
    
    if (itemIndex !== -1) {
      if (newQuantity < 1) {
        // Remove item if quantity becomes 0
        cart.splice(itemIndex, 1);
      } else {
        // Update quantity
        cart[itemIndex].quantity = newQuantity;
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      updateCartCount();
      
      // Show feedback message
      showFeedbackMessage(newQuantity < 1 ? "Item removed from cart" : "Quantity updated");
    }
  }

  function showFeedbackMessage(message) {
    // Remove any existing feedback message
    const existingMessage = document.querySelector('.feedback-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create new feedback message
    const feedbackMessage = document.createElement('div');
    feedbackMessage.className = 'feedback-message';
    feedbackMessage.textContent = message;
    
    // Add to cart box
    const cartBox = document.querySelector('.cart-box');
    cartBox.insertBefore(feedbackMessage, cartBox.firstChild);
    
    // Remove after 3 seconds
    setTimeout(() => {
      feedbackMessage.remove();
    }, 3000);
  }

  function removeFromCart(productName) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
  }

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
      if (totalItems > 0) {
        cartIcon.innerHTML = `🛒 <span class="cart-count">${totalItems}</span>`;
      } else {
        cartIcon.innerHTML = '🛒';
      }
    }
  }

  // Initialize cart count when page loads
  document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCart();
  });

  if (cartItemsContainer && cartTotalEl && clearCartBtn) {
    renderCart();
    clearCartBtn.addEventListener("click", () => {
      localStorage.removeItem("cart");
      renderCart();
    });
  }

  function calculateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.reduce((total, item) => {
      return total + (parseFloat(item.price) * parseInt(item.quantity));
    }, 0);
  }

  // Add event listener for checkout button
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (cart.length === 0) {
        showFeedbackMessage("Your cart is empty");
        return;
      }
      // Store cart total in localStorage before redirecting
      localStorage.setItem('cartTotal', calculateCartTotal());
      window.location.href = 'checkout.html';
    });
  }
});

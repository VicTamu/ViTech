document.addEventListener('DOMContentLoaded', () => {
  // Load cart items and display them
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const orderItemsContainer = document.getElementById('orderItems');
  const subtotalElement = document.getElementById('subtotal');
  const shippingElement = document.getElementById('shipping');
  const taxElement = document.getElementById('tax');
  const totalElement = document.getElementById('total');
  const sameAsShippingCheckbox = document.getElementById('sameAsShipping');
  const billingAddressFields = document.getElementById('billingAddressFields');
  const checkoutForm = document.getElementById('checkoutForm');

  function displayOrderItems() {
    orderItemsContainer.innerHTML = '';
    
    if (cartItems.length === 0) {
      orderItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
      return;
    }

    cartItems.forEach(item => {
      const itemTotal = parseFloat(item.price) * parseInt(item.quantity);
      const itemElement = document.createElement('div');
      itemElement.className = 'order-item';
      itemElement.innerHTML = `
        <div class="order-item-details">
          <div class="order-item-info">
            <h4>${item.name}</h4>
            <p class="order-item-category">${item.category}</p>
          </div>
          <div class="order-item-quantity">
            <span>Qty: ${item.quantity}</span>
          </div>
          <div class="order-item-price">
            <span class="item-price">$${parseFloat(item.price).toFixed(2)} each</span>
            <span class="item-total">$${itemTotal.toFixed(2)}</span>
          </div>
        </div>
      `;
      orderItemsContainer.appendChild(itemElement);
    });
  }

  function calculateTotals() {
    // Calculate subtotal from cart items
    const subtotal = cartItems.reduce((total, item) => {
      return total + (parseFloat(item.price) * parseInt(item.quantity));
    }, 0);

    // Calculate shipping (free for orders over $50)
    const shipping = subtotal >= 50 ? 0 : 2.99;

    // Calculate tax (8% of subtotal)
    const tax = subtotal * 0.08;

    // Calculate total
    const total = subtotal + shipping + tax;

    // Update the display
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('shipping').textContent = shipping.toFixed(2);
    document.getElementById('tax').textContent = tax.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);

    // Update shipping message
    const shippingMessage = document.querySelector('.shipping-message');
    if (subtotal >= 50) {
      shippingMessage.textContent = 'Free shipping applied!';
    } else {
      const amountNeeded = (50 - subtotal).toFixed(2);
      shippingMessage.textContent = `Add $${amountNeeded} more to get free shipping!`;
    }
  }

  // Initialize the page
  displayOrderItems();
  calculateTotals();

  // Handle form submission
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Here you would typically process the payment
      alert('Order placed successfully!');
    });
  }

  // Handle same as shipping address checkbox
  sameAsShippingCheckbox.addEventListener('change', (e) => {
    billingAddressFields.classList.toggle('hidden', e.target.checked);
  });
}); 
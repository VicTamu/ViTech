import React, { useEffect, useMemo, useState } from 'react'

export default function Checkout() {
  const [cart, setCart] = useState([])
  const [sameAsShipping, setSameAsShipping] = useState(true)

  useEffect(() => {
    document.title = 'Checkout - ViTech'
    const raw = localStorage.getItem('cart')
    setCart(raw ? JSON.parse(raw) : [])
  }, [])

  const subtotal = useMemo(() => cart.reduce((s, i) => s + i.price * i.quantity, 0), [cart])
  const shipping = subtotal >= 50 ? 0 : 2.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  function onSubmit(e) {
    e.preventDefault()
    alert('Order placed successfully!')
  }

  return (
    <main>
      <section className="checkout-section bg-brand-gradient">
        <div className="container">
          <h1>Checkout</h1>
          <div className="checkout-container">
            <form id="checkoutForm" className="checkout-form" onSubmit={onSubmit}>
              <div className="form-section">
                <h2>Shipping Address</h2>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input id="fullName" required />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input id="address" required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input id="city" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="zip">ZIP</label>
                    <input id="zip" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>
                    <input type="checkbox" checked={sameAsShipping} onChange={e=>setSameAsShipping(e.target.checked)} />
                    {' '}Billing address same as shipping
                  </label>
                </div>
                {!sameAsShipping && (
                  <div id="billingAddressFields">
                    <div className="form-group">
                      <label htmlFor="billingAddress">Billing Address</label>
                      <input id="billingAddress" />
                    </div>
                  </div>
                )}
              </div>

              <div className="form-section">
                <h2>Payment</h2>
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input id="cardNumber" required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="exp">Exp</label>
                    <input id="exp" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input id="cvv" required />
                  </div>
                </div>
              </div>

              <button className="btn-primary" type="submit">Place Order</button>
            </form>

            <aside className="order-summary">
              <h2>Order Summary</h2>
              <div className="order-items-container">
                <div id="orderItems" className="order-items">
                  {cart.map(item => (
                    <div key={item.name} className="order-item">
                      <div className="order-item-details">
                        <div className="order-item-info">
                          <h4>{item.name}</h4>
                          <p className="order-item-category">{item.category}</p>
                        </div>
                        <div className="order-item-quantity"><span>Qty: {item.quantity}</span></div>
                        <div className="order-item-price">
                          <span className="item-price">${item.price.toFixed(2)} each</span>
                          <span className="item-total">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-totals">
                <div className="total-row"><span>Subtotal</span><span className="amount" id="subtotal">{subtotal.toFixed(2)}</span></div>
                <div className="total-row"><span>Shipping</span><span className="amount" id="shipping">{shipping.toFixed(2)}</span></div>
                <div className="total-row"><span>Tax</span><span className="amount" id="tax">{tax.toFixed(2)}</span></div>
                <div className="total-row grand-total"><span>Total</span><span className="amount" id="total">{total.toFixed(2)}</span></div>
              </div>

              <div className="shipping-info">
                <p className="shipping-message">
                  {subtotal >= 50 ? 'Free shipping applied!' : `Add $${(50 - subtotal).toFixed(2)} more to get free shipping!`}
                </p>
              </div>

              <div className="security-info">
                <p>Secure checkout</p>
                <p>Your information is protected and will not be shared.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}



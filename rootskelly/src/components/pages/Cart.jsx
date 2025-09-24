import React from 'react'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '@/context/CartContext'

export default function Cart() {
  const navigate = useNavigate()
  const { items: cart, updateQuantity, clearCart, totalPrice: total } = useCart()

  function goCheckout(e) {
    e.preventDefault()
    if (cart.length === 0) return
    localStorage.setItem('cartTotal', total)
    navigate('/checkout')
  }

  return (
    <main>
      <section className="cart-hero bg-brand-gradient">
        <div className="container">
          <h1>Your Cart</h1>
          <div className="cart-box">
            <div id="cartItems" className="cart-items">
              {cart.length === 0 && <p className="empty-cart">Your cart is empty.</p>}
              {cart.map(item => (
                <div key={item.name} className="cart-item">
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p className="category">{item.category}</p>
                    <p className="price">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="cart-item-quantity">
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background focus-visible:ring-foreground/50 focus-visible:border-foreground"
                      aria-label={`Decrease quantity for ${item.name}`}
                      onClick={() => updateQuantity(item.name, Number(item.quantity) - 1)}
                    >
                      −
                    </Button>
                    <span aria-live="polite" role="status">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      type="button"
                      className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background focus-visible:ring-foreground/50 focus-visible:border-foreground"
                      aria-label={`Increase quantity for ${item.name}`}
                      onClick={() => updateQuantity(item.name, Number(item.quantity) + 1)}
                    >
                      +
                    </Button>
                  </div>
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="total">Total: $<span id="cartTotal">{total.toFixed(2)}</span></div>
              <div className="cart-actions">
                <button className="btn-secondary" onClick={clearCart}>Clear Cart</button>
                <button className="btn-primary" onClick={goCheckout} disabled={cart.length===0}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
          <p className="hero-subtitle">Free shipping on orders over $50.</p>
        </div>
      </section>
    </main>
  )
}



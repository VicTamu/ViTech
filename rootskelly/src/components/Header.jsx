import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '@/context/CartContext'

export default function Header() {
  const { totalItems } = useCart()

  return (
    <header className="site-header">
      <div className="container nav-container">
        <Link to="/" className="logo">ViTech</Link>
        <nav>
          <ul className="nav-links">
            <li><NavLink to="/" className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink></li>
            <li><NavLink to="/shop" className={({isActive}) => isActive ? 'active' : ''}>Shop</NavLink></li>
            <li><NavLink to="/about" className={({isActive}) => isActive ? 'active' : ''}>About</NavLink></li>
            <li><NavLink to="/contact" className={({isActive}) => isActive ? 'active' : ''}>Contact</NavLink></li>
            <li>
              <NavLink to="/cart" className={({isActive}) => `cart-icon ${isActive ? 'active' : ''}`}>
                🛒{totalItems > 0 && <span className="cart-count">{totalItems}</span>}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}



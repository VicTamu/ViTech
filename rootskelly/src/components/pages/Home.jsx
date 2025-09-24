import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  useEffect(() => { document.title = 'ViTech' }, [])
  return (
    <main>
      <section className="hero-section">
        <div className="container">
          <h1>The Best Tech Accessories for Life's Convenience</h1>
          <p className="hero-subtitle">Upgrade your essentials with high-tech accessories crafted for every moment— work, travel, and beyond.</p>

          <div className="rotating-showcase">
            <div className="rotating-card">
              <div className="card-front">
                <div className="product-image">
                  <img src="/images/usb-c-fast-charger.jpg" alt="Featured Product" />
                </div>
                <div className="product-info">
                  <h3>USB-C Fast Charger</h3>
                  <p className="category">Chargers</p>
                  <p className="price">$15.99</p>
                </div>
              </div>
              <div className="card-back">
                <div className="product-image">
                  <img src="/images/hdmi-4k-cable.jpg" alt="Featured Product" />
                </div>
                <div className="product-info">
                  <h3>HDMI 4K Cable</h3>
                  <p className="category">Cables</p>
                  <p className="price">$6.99</p>
                </div>
              </div>
            </div>
          </div>

          <div className="cta-buttons">
            <Link to="/shop" className="btn-primary">Shop Now</Link>
            <p className="reviews-text">5 Stars from 15+ reviews</p>
          </div>
        </div>
      </section>

      <section className="categories-section">
        <div className="container">
          <h2>Essential Categories</h2>
          <div className="category-grid">
            <div className="category-card">
              <h3>Chargers</h3>
              <p>Premium charging solutions from USB-C fast chargers to magnetic charging cables.</p>
              <Link to="/shop?category=Chargers" className="btn-secondary">Shop Chargers</Link>
            </div>
            <div className="category-card">
              <h3>Cables</h3>
              <p>High quality HDMI, Ethernet, and power cables designed to meet all your connectivity needs.</p>
              <Link to="/shop?category=Cables" className="btn-secondary">Shop Cables</Link>
            </div>
            <div className="category-card">
              <h3>Desktop</h3>
              <p>Enhance your workspace with premium monitors, stands, and desktop accessories.</p>
              <Link to="/shop?category=Desktop" className="btn-secondary">Shop Desktop</Link>
            </div>
          </div>
        </div>
      </section>

      
    </main>
  )
}



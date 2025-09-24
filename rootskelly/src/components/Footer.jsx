import React from 'react'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} ViTech Inc., All Rights Reserved</p>
          <p className="rating">100% of Customers Recommend Our Products</p>
        </div>
      </div>
    </footer>
  )
}



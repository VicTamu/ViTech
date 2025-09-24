import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main>
      <section className="shop-hero">
        <div className="container" style={{textAlign:'center'}}>
          <h1>Page not found</h1>
          <p className="hero-subtitle">The page you are looking for doesn’t exist.</p>
          <Link to="/" className="btn-primary">Go Home</Link>
        </div>
      </section>
    </main>
  )
}



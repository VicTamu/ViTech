import React, { useEffect } from 'react'

export default function About() {
  useEffect(() => { document.title = 'About - ViTech' }, [])
  return (
    <main>
      <section className="about-hero bg-brand-gradient">
        <div className="container">
          <div className="mission-box">
            <h2>Our Mission</h2>
            <p>
              We provide high-quality, affordable tech accessories designed to enhance your digital life.
              From chargers to desktop accessories, ViTech focuses on value and reliability.
            </p>
            <p className="hero-subtitle">Built for everyday performance.</p>
          </div>
        </div>
      </section>
    </main>
  )
}



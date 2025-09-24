import React, { useEffect, useMemo, useState } from 'react'
import { useCart } from '@/context/CartContext'

const BASE = import.meta.env.BASE_URL || '/'
const withBase = (p) => `${BASE.replace(/\/$/, '')}${p}`
const PRODUCTS = [
  { name: 'USB-C Fast Charger', category: 'Chargers', price: 15.99, image: withBase('/images/usb-c-fast-charger.jpg') },
  { name: 'Multi-USB Charging Cable', category: 'Chargers', price: 19.99, image: withBase('/images/multi-usb-charging-cable.jpg') },
  { name: 'Magnetic Charging Cable', category: 'Chargers', price: 13.49, image: withBase('/images/magnetic-charging-cable.jpg') },
  { name: 'HDMI 4K Cable', category: 'Cables', price: 6.99, image: withBase('/images/hdmi-4k-cable.jpg') },
  { name: 'USB-C to HDMI Adapter', category: 'Cables', price: 14.99, image: withBase('/images/usb-c-hdmi-adapter.jpg') },
  { name: '25ft. CAT6 Ethernet Cable', category: 'Cables', price: 5.89, image: withBase('/images/ethernet-cable.jpg') },
  { name: 'Power Strip', category: 'Cables', price: 12.79, image: withBase('/images/power-strip.jpg') },
  { name: 'Wireless Keyboard', category: 'Computer', price: 29.99, image: withBase('/images/wireless-keyboard.jpg') },
  { name: 'Gaming Mouse', category: 'Computer', price: 23.99, image: withBase('/images/gaming-mouse.jpg') },
  { name: 'USB Hub (4-Port)', category: 'Computer', price: 12.99, image: withBase('/images/usb-hub.jpg') },
  { name: 'Laptop Stand', category: 'Desktop', price: 54.99, image: withBase('/images/laptop-stand.jpg') },
  { name: 'Desktop Monitor', category: 'Desktop', price: 97.49, image: withBase('/images/desktop-monitor.jpg') },
  { name: 'Monitor Arm Mount', category: 'Desktop', price: 42.99, image: withBase('/images/monitor-mount.jpg') },
  { name: 'Apple Desktop Monitor', category: 'Desktop', price: 287.99, image: withBase('/images/apple-desktop-monitor.jpg') },
]

function addToCartLegacy() {}

export default function Shop() {
  const { addItem } = useCart()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const categories = useMemo(() => {
    const set = new Set(PRODUCTS.map((p) => p.category))
    return ['all', ...Array.from(set)]
  }, [])

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase()
    return PRODUCTS.filter((p) => {
      const matchCategory = category === 'all' || p.category === category
      const matchSearch = !s || p.name.toLowerCase().includes(s)
      return matchCategory && matchSearch
    })
  }, [search, category])

  useEffect(() => {
    document.title = 'Shop - ViTech'
  }, [])

  return (
    <>
      <main>
        <section className="shop-hero">
          <div className="container">
            <h1>Our Products</h1>
            <p>Discover our range of high-quality tech accessories</p>
          </div>
        </section>

        <section className="shop-section">
          <div className="container">
            <div className="shop-tools">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((c) => (
                  <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>
                ))}
              </select>
            </div>

            <div className="product-grid" id="productGrid">
              {filtered.length === 0 && <p>No products found.</p>}
              {filtered.map((p) => (
                <div className="product-card" key={p.name}>
                  <div className="product-image">
                    <img src={p.image} alt={p.name} />
                  </div>
                  <div className="product-info">
                    <h3>{p.name}</h3>
                    <p className="category">{p.category}</p>
                    <p className="price">${p.price.toFixed(2)}</p>
                    <button className="btn-primary" onClick={() => addItem(p)}>Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}



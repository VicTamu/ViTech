/* @refresh reload */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(undefined)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [initialized, setInitialized] = useState(false)

  // Load from localStorage once
  useEffect(() => {
    const raw = localStorage.getItem('cart')
    setItems(raw ? JSON.parse(raw) : [])
    setInitialized(true)
  }, [])

  // Persist on change
  useEffect(() => {
    if (!initialized) return
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items, initialized])

  const totalItems = useMemo(() => items.reduce((s, i) => s + Number(i.quantity || 0), 0), [items])
  const totalPrice = useMemo(() => items.reduce((s, i) => s + Number(i.price) * Number(i.quantity), 0), [items])

  function addItem(product) {
    setItems(prev => {
      const idx = prev.findIndex(p => p.name === product.name)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], quantity: Number(next[idx].quantity) + 1 }
        return next
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  function updateQuantity(name, quantity) {
    const normalized = Math.max(0, Number.isFinite(Number(quantity)) ? Number(quantity) : 0)
    setItems(prev => prev
      .map(i => (i.name === name ? { ...i, quantity: normalized } : i))
      .filter(i => i.quantity > 0)
    )
  }

  function clearCart() { setItems([]) }

  const value = useMemo(() => ({ items, addItem, updateQuantity, clearCart, totalItems, totalPrice }), [items, totalItems, totalPrice])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}



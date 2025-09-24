import React, { useEffect, useState } from 'react'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [errors, setErrors] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  useEffect(() => { document.title = 'Contact - ViTech' }, [])

  function validate() {
    const next = { name: '', email: '', subject: '', message: '' }
    if (!name.trim()) next.name = 'Please enter your name.'
    if (!email.trim()) next.email = 'Please enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Please enter a valid email address.'
    if (!subject.trim()) next.subject = 'Please add a subject.'
    if (!message.trim()) next.message = 'Please write a brief message.'
    setErrors(next)
    return !next.name && !next.email && !next.subject && !next.message
  }

  function onSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    setStatus('Sending your message...')
    setTimeout(() => {
      setSubmitting(false)
      setStatus('Message sent! We\'ll be in touch shortly.')
      setName(''); setEmail(''); setSubject(''); setMessage('')
      setErrors({ name: '', email: '', subject: '', message: '' })
    }, 700)
  }

  return (
    <main>
      <section className="contact-hero bg-brand-gradient">
        <div className="container">
          <h1>Contact Us</h1>
          <p className="contact-intro">We'd love to hear from you. Email us at <a href="mailto:support@vitech.com">support@vitech.com</a></p>
          <div className="contact-box">
            <h2>Send a Message</h2>
            <form className="contact-form" onSubmit={onSubmit} noValidate aria-describedby="formStatus">
              <div className="form-group">
                <label htmlFor="name">Name <span aria-hidden="true">*</span></label>
                <input
                  id="name"
                  value={name}
                  onChange={e=>setName(e.target.value)}
                  onBlur={validate}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  placeholder="Jane Doe" />
                {errors.name && <span id="name-error" className="error-text" role="alert">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email <span aria-hidden="true">*</span></label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e=>setEmail(e.target.value)}
                  onBlur={validate}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  placeholder="you@example.com" />
                {errors.email && <span id="email-error" className="error-text" role="alert">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject <span aria-hidden="true">*</span></label>
                <input
                  id="subject"
                  value={subject}
                  onChange={e=>setSubject(e.target.value)}
                  onBlur={validate}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                  placeholder="How can we help?" />
                {errors.subject && <span id="subject-error" className="error-text" role="alert">{errors.subject}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="message">Message <span aria-hidden="true">*</span></label>
                <textarea
                  id="message"
                  value={message}
                  onChange={e=>setMessage(e.target.value)}
                  onBlur={validate}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  placeholder="Give us a bit more detail" />
                {errors.message && <span id="message-error" className="error-text" role="alert">{errors.message}</span>}
              </div>
              <div className="form-actions">
                <button className="btn-primary" type="submit" disabled={submitting}>
                  {submitting ? 'Sending…' : 'Send Message'}
                </button>
                <span id="formStatus" className="form-status" aria-live="polite">{status}</span>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}



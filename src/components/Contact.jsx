import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

const socialLinks = [
  {
    name: 'GitHub',
    handle: '@alisha-walunj',
    href: 'https://github.com/alishawalunj',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.907-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    handle: 'alisha-walunj',
    href: 'https://www.linkedin.com/in/walunjalisha/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    name: 'Email',
    handle: 'walunjalisha@gmail.com',
    href: 'mailto:walunjalisha@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    name: 'LeetCode',
    handle: '@alisha_dev',
    href: 'https://leetcode.com/u/aaaalisha274/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
]

const Contact = () => {
  const sectionRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-head > *',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      )
      gsap.fromTo('.contact-body > *',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: '.contact-body', start: 'top 75%' } }
      )
      gsap.fromTo('.social-card',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1,
          scrollTrigger: { trigger: '.socials-col', start: 'top 80%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => {
    e.preventDefault()
    gsap.to('.submit-btn', { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1, onComplete: () => setSent(true) })
  }

  return (
    <div ref={sectionRef} className="contact-section">
      <div className="section-inner contact-head">
        <span className="section-label">Let's Talk</span>
        <h2 className="section-title">Get In <span className="accent-dot">Touch</span></h2>
        <p className="section-sub">Open to new opportunities and collaborations. Drop me a line.</p>
      </div>

      <div className="contact-body">
        <div className="form-col">
          {sent ? (
            <div className="success-msg">
              <div className="success-icon">✓</div>
              <h3>Message Sent!</h3>
              <p>Thanks for reaching out. I'll get back to you within 24 hours.</p>
              <button className="btn-outline" onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }) }}>Send Another</button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
                </div>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea name="message" rows={6} value={form.message} onChange={handleChange} placeholder="What's on your mind?" required />
              </div>
              <button type="submit" className="btn-primary submit-btn">Send Message →</button>
            </form>
          )}
        </div>

        <div className="socials-col">
          <p className="socials-intro">Or find me here:</p>
          {socialLinks.map(s => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="social-card">
              <div className="social-icon">{s.icon}</div>
              <div className="social-info">
                <span className="social-name">{s.name}</span>
                <span className="social-handle">{s.handle}</span>
              </div>
              <svg className="social-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          ))}
        </div>
      </div>

      <div className="footer-bar">
        <p>© 2024 Alisha Walunj · Built with React & GSAP</p>
      </div>
    </div>
  )
}

export default Contact

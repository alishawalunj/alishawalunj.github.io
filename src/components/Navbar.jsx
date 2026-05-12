import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { gsap } from 'gsap'
import './Navbar.css'

const links = ['home', 'projects', 'education', 'experience', 'skills', 'resume', 'contact']

const Navbar = () => {
  const { dark, setDark } = useTheme()
  const navRef = useRef(null)
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
    )
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { threshold: 0.4 }
    )
    links.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav ref={navRef} className="navbar">
      <div className="nav-logo" onClick={() => scrollTo('home')}>
        <span className="logo-initials">AW</span>
      </div>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {links.map(id => (
          <button
            key={id}
            className={`nav-link ${active === id ? 'active' : ''}`}
            onClick={() => scrollTo(id)}
          >
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </button>
        ))}
      </div>

      <div className="nav-controls">
        <button
          className="theme-toggle"
          onClick={() => setDark(d => !d)}
          aria-label="Toggle theme"
        >
          {dark ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
        <button className="hamburger" onClick={() => setMenuOpen(m => !m)} aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar

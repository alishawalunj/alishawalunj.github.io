import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Home.css'

const Home = () => {
  const containerRef = useRef(null)
  const nameRef = useRef(null)
  const descRef = useRef(null)
  const ctaRef = useRef(null)
  const lineRef = useRef(null)
  const badgesRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.6 })

      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, ease: 'power3.inOut', transformOrigin: 'left' }
      )
        .fromTo(
          '.home-label',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.2'
        )
        .fromTo(
          nameRef.current.querySelectorAll('.char'),
          { y: '110%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.04 },
          '-=0.1'
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(
          badgesRef.current.querySelectorAll('.badge'),
          { opacity: 0, y: 16, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.5)' },
          '-=0.3'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.2'
        )

      gsap.to('.orb-1', { y: -30, x: 15, duration: 6, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      gsap.to('.orb-2', { y: 25, x: -20, duration: 8, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1 })
      gsap.to('.orb-3', { y: -20, x: 10, duration: 5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2 })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const name = 'Alisha Walunj'
  const chars = name.split('').map((ch, i) => (
    <span key={i} className="char" style={{ display: 'inline-block', overflow: 'hidden' }}>
      {ch === ' ' ? '\u00A0' : ch}
    </span>
  ))

  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToProjects = () =>
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div ref={containerRef} className="home-container">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="home-content">
        <div className="home-top">
          <div ref={lineRef} className="home-line" />
          <span className="home-label section-label">Software Engineer</span>
        </div>

        <div className="name-wrapper" ref={nameRef}>
          {chars}
        </div>

        <p ref={descRef} className="home-desc">
          Master's in Computer Science · Purdue University
          <br />
          4+ years building Full Stack & GenAI systems, scalable APIs & polished interfaces.
        </p>

        <div ref={badgesRef} className="home-badges">
          {['Full Stack', 'GenAI & RAG', 'Cloud & DevOps', 'System Design'].map((b) => (
            <span key={b} className="badge">
              {b}
            </span>
          ))}
        </div>

        <div ref={ctaRef} className="home-cta">
          <button className="btn-primary" onClick={scrollToProjects}>
            View Work
          </button>
          <button className="btn-outline" onClick={scrollToContact}>
            Get In Touch
          </button>
        </div>
      </div>

      <div className="home-scroll-hint">
        <div className="scroll-line" />
        <span>scroll</span>
      </div>
    </div>
  )
}

export default Home

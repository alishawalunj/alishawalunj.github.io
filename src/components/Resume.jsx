import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Resume.css'

gsap.registerPlugin(ScrollTrigger)

const Resume = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.resume-head > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%'
          }
        }
      )

      gsap.fromTo('.resume-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.resume-card',
            start: 'top 80%'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="resume-section">

      <div className="section-inner resume-head">
        <span className="section-label">Document</span>
        <h2 className="section-title">
          Resume<span className="accent-dot">.</span>
        </h2>
      </div>

      <div className="resume-card">

        <div className="pdf-preview-wrapper">

          <div className="pdf-toolbar">
            <span className="pdf-filename">resume.pdf</span>

            <div className="pdf-actions">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="pdf-action-btn"
              >
                View
              </a>

              <a
                href="/resume.pdf"
                download="resume.pdf"
                className="pdf-action-btn"
              >
                Download
              </a>
            </div>
          </div>

          <iframe
            src="/resume.pdf"
            title="Resume Preview"
            className="pdf-iframe"
          />

        </div>

      </div>
    </div>
  )
}

export default Resume
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Resume.css'

gsap.registerPlugin(ScrollTrigger)

const Resume = () => {
  const sectionRef = useRef(null)
  const [pdfUrl, setPdfUrl] = useState(null)
  const [dragOver, setDragOver] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.resume-head > *',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      )
      gsap.fromTo('.resume-card',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: '.resume-card', start: 'top 80%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleFile = (file) => {
    if (file && file.type === 'application/pdf') {
      const url = URL.createObjectURL(file)
      setPdfUrl(url)
    }
  }

  const onInputChange = (e) => handleFile(e.target.files[0])
  const onDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files[0])
  }
  const onDragOver = (e) => { e.preventDefault(); setDragOver(true) }
  const onDragLeave = () => setDragOver(false)

  return (
    <div ref={sectionRef} className="resume-section">
      <div className="section-inner resume-head">
        <span className="section-label">Document</span>
        <h2 className="section-title">Resume<span className="accent-dot">.</span></h2>
      </div>

      <div className="resume-card">
        {!pdfUrl ? (
          <div
            className={`drop-zone ${dragOver ? 'drag-active' : ''}`}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
          >
            <div className="drop-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="12" y1="18" x2="12" y2="12"/>
                <polyline points="9 15 12 12 15 15"/>
              </svg>
            </div>
            <p className="drop-title">Drop your resume PDF here</p>
            <p className="drop-sub">or click to browse</p>
            <label className="btn-primary upload-btn">
              Choose PDF
              <input type="file" accept=".pdf" onChange={onInputChange} style={{ display: 'none' }} />
            </label>
          </div>
        ) : (
          <div className="pdf-preview-wrapper">
            <div className="pdf-toolbar">
              <span className="pdf-filename">resume.pdf</span>
              <div className="pdf-actions">
                <label className="pdf-action-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  Replace
                  <input type="file" accept=".pdf" onChange={onInputChange} style={{ display: 'none' }} />
                </label>
                <a href={pdfUrl} download="resume.pdf" className="pdf-action-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download
                </a>
              </div>
            </div>
            <iframe
              src={pdfUrl}
              title="Resume Preview"
              className="pdf-iframe"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Resume

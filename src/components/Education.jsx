import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Timeline.css'

gsap.registerPlugin(ScrollTrigger)

const educationData = [
  {
    degree: 'Master of Science, Computer Science',
    school: 'Purdue University',
    period: '2023 – 2025',
    location: 'INDIANA, USA',
    coursework:
      'Web Development, Deep Learning, Machine Learning, Natural Language Processing, Software Design',
  },
  {
    degree: 'Bachelor of Engineering, Information Technology',
    school: 'University of Pune',
    period: '2016 – 2020',
    location: 'PUNE, INDIA',
    coursework:
      'Data Structures, Algorithms, Database Management, Software Engineering, Cloud Computing',
  },
]

const Education = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.edu-head > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      )

      gsap.fromTo(
        '.timeline-line-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          ease: 'power2.out',
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: '.timeline-track',
            start: 'top 70%',
          },
        }
      )

      gsap.fromTo(
        '.timeline-item',
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.timeline-track',
            start: 'top 70%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="timeline-section">
      <div className="section-inner edu-head">
        <span className="section-label">Academic Background</span>

        <h2 className="section-title">
          Education<span className="accent-dot">.</span>
        </h2>
      </div>

      <div className="timeline-wrapper">
        <div className="timeline-track">
          <div className="timeline-spine">
            <div className="timeline-line-track" />
            <div className="timeline-line-fill" />
          </div>

          <div className="timeline-items">
            {educationData.map((item, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-dot">
                  <div className="dot-inner" />
                </div>

                <div className="timeline-card">
                  <div className="tcard-header">
                    <span className="tcard-period">{item.period}</span>

                    <span className="tcard-loc">
                      📍 {item.location}
                    </span>
                  </div>

                  <h3 className="tcard-title">{item.degree}</h3>

                  <p className="tcard-school">{item.school}</p>

                  <ul className="tcard-highlights">
                    {item.coursework
                      .split(', ')
                      .map((course, j) => (
                        <li key={j}>{course}</li>
                      ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Education
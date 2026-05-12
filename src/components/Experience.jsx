import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Timeline.css'

gsap.registerPlugin(ScrollTrigger)

const experienceData = [
  {
    role: 'Software Engineer',
    company: 'One Community USA',
    period: 'Jun 2025 – Present',
    location: 'Remote, USA',
    type: 'Full-time',
    highlights: [
      'Built AI-powered RAG applications and analytics dashboards for housing and volunteer management',
      'Developed scalable backend APIs and optimized semantic search using vector databases',
      'Improved retrieval accuracy and reduced latency through embedding and prompt optimization',
      'Worked across React, Python, FastAPI, MongoDB, and cloud deployment workflows',
    ],
  },
  {
    role: 'Associate Consultant',
    company: 'Capgemini',
    period: 'Jan 2023 – Aug 2023',
    location: 'India',
    type: 'Full-time',
    highlights: [
      'Enhanced enterprise backend systems with optimized SQL queries and Spring Boot integrations',
      'Built CI/CD deployment pipelines and improved code quality through automated testing',
      'Collaborated with cross-functional teams in Agile environments for insurance domain applications',
    ],
  },
  {
    role: 'Senior Software Engineer',
    company: 'Capgemini',
    period: 'Jan 2022 – Dec 2022',
    location: 'India',
    type: 'Full-time',
    highlights: [
      'Developed scalable REST APIs and modern Angular applications for financial services platforms',
      'Refactored legacy systems and created reusable UI components to accelerate development',
      'Implemented secure authentication and optimized application performance across services',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Capgemini',
    period: 'Nov 2020 – Dec 2021',
    location: 'India',
    type: 'Full-time',
    highlights: [
      'Automated ETL workflows and optimized backend database operations for enterprise systems',
      'Resolved production issues, improved observability, and maintained high-traffic Java applications',
      'Worked on microservices logging, debugging, and performance optimization initiatives',
    ],
  },
]

const Experience = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.exp-head > *',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
      )
      gsap.fromTo('.exp-track .timeline-line-fill',
        { scaleY: 0 },
        { scaleY: 1, duration: 1.4, ease: 'power2.out', transformOrigin: 'top',
          scrollTrigger: { trigger: '.exp-track', start: 'top 70%' } }
      )
      gsap.fromTo('.exp-track .timeline-item',
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out',
          scrollTrigger: { trigger: '.exp-track', start: 'top 70%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="timeline-section alt-bg">
      <div className="section-inner exp-head">
        <span className="section-label">Work History</span>
        <h2 className="section-title">Experience<span className="accent-dot">.</span></h2>
      </div>

      <div className="timeline-wrapper">
        <div className="timeline-track exp-track right-align">
          <div className="timeline-spine">
            <div className="timeline-line-track" />
            <div className="timeline-line-fill" />
          </div>
          <div className="timeline-items">
            {experienceData.map((item, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-dot">
                  <div className="dot-inner" />
                </div>
                <div className="timeline-card">
                  <div className="tcard-header">
                    <span className="tcard-period">{item.period}</span>
                    <span className={`tcard-type ${item.type === 'Full-time' ? 'full' : 'intern'}`}>{item.type}</span>
                  </div>
                  <h3 className="tcard-title">{item.role}</h3>
                  <p className="tcard-school">{item.company} · {item.location}</p>
                  <ul className="tcard-highlights">
                    {item.highlights.map((h, j) => <li key={j}>{h}</li>)}
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
export default Experience

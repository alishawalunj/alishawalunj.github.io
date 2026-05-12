import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Skills.css'

gsap.registerPlugin(ScrollTrigger)

const techStack = [
  { name: 'Python', icon: '🐍', level: 92 },
  { name: 'Java', icon: '☕', level: 90 },
  { name: 'React', icon: '⚛️', level: 88 },
  { name: 'Node.js', icon: '🟩', level: 85 },
  { name: 'TypeScript', icon: '🔷', level: 85 },
  { name: 'Spring Boot', icon: '🍃', level: 88 },
  { name: 'Azure', icon: '☁️', level: 84 },
  { name: 'Docker', icon: '🐳', level: 83 },
  { name: 'LangChain', icon: '🔗', level: 87 },
  { name: 'MongoDB', icon: '🍃', level: 82 },
  { name: 'PostgreSQL', icon: '🐘', level: 80 },
  { name: 'Angular', icon: '🔺', level: 78 },
]

const categories = [
  {
    name: 'Frontend',
    skills: ['React', 'Angular', 'TypeScript', 'D3.js', 'Chart.js', 'Recharts', 'Redux', 'NgRx'],
    color: '#c9a96e',
  },
  {
    name: 'Backend',
    skills: ['Python (FastAPI)', 'Java (Spring Boot)', 'Node.js', 'REST APIs', 'GraphQL', 'JAX-WS / SOAP'],
    color: '#7c9a92',
  },
  {
    name: 'AI & Data',
    skills: ['LangChain', 'RAG', 'Pinecone', 'Weaviate', 'BGE Embeddings', 'MCP Orchestration'],
    color: '#9a7c92',
  },
  {
    name: 'Cloud & DevOps',
    skills: ['Azure', 'Docker', 'Azure DevOps', 'CI/CD', 'SonarQube', 'Oracle / MySQL'],
    color: '#7c8a9a',
  },
]

const Skills = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skills-head > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      )

      gsap.fromTo(
        '.tech-icon-card',
        { opacity: 0, y: 30, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'back.out(1.5)',
          scrollTrigger: { trigger: '.tech-grid', start: 'top 75%' },
        }
      )

      gsap.fromTo(
        '.bar-fill',
        { width: 0 },
        {
          width: (i, el) => el.dataset.level + '%',
          duration: 1,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.tech-grid', start: 'top 70%' },
        }
      )

      gsap.fromTo(
        '.skill-category',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: { trigger: '.skills-categories', start: 'top 80%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="skills-section">
      <div className="section-inner skills-head">
        <span className="section-label">Technical Expertise</span>
        <h2 className="section-title">
          Skills<span className="accent-dot">.</span>
        </h2>
        <p className="section-sub">Technologies I work with on a daily basis.</p>
      </div>

      <div className="skills-content">
        <div className="tech-grid">
          {techStack.map((tech) => (
            <div key={tech.name} className="tech-icon-card">
              <div className="tech-emoji">{tech.icon}</div>
              <div className="tech-name">{tech.name}</div>
              <div className="tech-bar">
                <div className="bar-fill" data-level={tech.level} />
              </div>
              <span className="tech-level">{tech.level}%</span>
            </div>
          ))}
        </div>

        <div className="skills-categories">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="skill-category"
              style={{ '--cat-color': cat.color }}
            >
              <h3 className="cat-name">{cat.name}</h3>
              <div className="cat-chips">
                {cat.skills.map((s) => (
                  <span key={s} className="cat-chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Skills

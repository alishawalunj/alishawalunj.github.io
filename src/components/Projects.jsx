import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Mastodon TutorAI',
    desc: 'Developed an AI-powered learning assistant that helps students understand complex topics through interactive conversations and personalized explanations.',
    tags: ['Streamlit', 'Python', 'FastAPI', 'MongoDB', 'ChromaDB', 'OpenAI API'],
    github: 'https://github.com/MastodonTutorAI/v1',
    year: '2024',
    accentFrom: '#c9a96e',
    accentTo: '#7c9a92',
  },
  {
    title: 'Community Cart',
    desc: 'Engineered a community-based marketplace platform connecting local buyers and sellers with real-time chat and secure transaction system.',
    tags: ['Java', 'Spring Boot', 'React', 'Redux', 'Tailwind CSS', 'RestAPI'],
    github: 'https://github.com/alishawalunj/Community-Cart',
    year: '2025',
    accentFrom: '#7c9a92',
    accentTo: '#c9a96e',
  },
  {
    title: 'TaskOps',
    desc: 'Built a full-stack task management platform with real-time collaboration, GraphQL API, and advanced project analytics.',
    tags: ['Next.js', 'Spring Boot', 'GraphQL', 'PostgreSQL', 'JWT'],
    github: 'https://github.com/alishawalunj/TaskOps',
    year: '2025',
    accentFrom: '#a96ec9',
    accentTo: '#c9a96e',
  },
];

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.907-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
)

const Projects = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const total = projects.length;

  const safeIndex = current >= 0 && current < total ? current : 0;

  const applyCarousel = useCallback((targetIndex, animate = true) => {
    cardRefs.current.forEach((card, i) => {
      if (!card) return;

      const offset = i - targetIndex;
      const wrappedOffset =
        ((offset + total + Math.floor(total / 2)) % total) - Math.floor(total / 2);

      const x = wrappedOffset * 200;           // Increased spacing for wider cards
      const z = -Math.abs(wrappedOffset) * 90;
      const rotY = wrappedOffset * 20;
      const scale = Math.max(0.78, 1 - Math.abs(wrappedOffset) * 0.11);
      const opacity = Math.max(0.22, 1 - Math.abs(wrappedOffset) * 0.48);

      const animation = {
        x,
        z,
        rotateY: rotY,
        scale,
        opacity,
        duration: 0.75,
        ease: 'power3.inOut',
        zIndex: 100 - Math.abs(wrappedOffset) * 10,
      };

      if (animate) {
        gsap.to(card, animation);
      } else {
        gsap.set(card, animation);
      }
    });
  }, [total]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      applyCarousel(0, false);
    }, 80);

    return () => clearTimeout(timeout);
  }, [applyCarousel]);



  useEffect(() => {
    applyCarousel(current, true);
    const t = setTimeout(() => setIsAnimating(false), 800);
    return () => clearTimeout(t);
  }, [current, applyCarousel]);


  const go = (dir) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((c) => (c + dir + total) % total);
  };


  return (
    <div ref={sectionRef} className="projects-section">
      <div className="section-inner">
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-sub">
          A curated collection of software, AI, and full-stack projects.
        </p>
      </div>

      <div className="carousel-scene-wrapper">
        <button className="carousel-btn carousel-btn--prev" onClick={() => go(-1)}>
          ‹
        </button>

        <div className="carousel-scene">
          {projects.map((p, i) => (
            <div
              key={p.title}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`project-card ${i === safeIndex ? 'project-card--active' : ''}`}
              style={{
                '--accent-from': p.accentFrom,
                '--accent-to': p.accentTo,
              }}
              onClick={() => !isAnimating && setCurrent(i)}
            >
              <div className="card-glow" />
              <div className="card-header">
                <span className="card-year">{p.year}</span>
                <div className="card-links">
                  <a href={p.github} className="card-icon-link" aria-label="GitHub" onClick={e => e.stopPropagation()}>
                    <GitHubIcon />
                  </a>
                </div>
              </div>
              <h3 className="card-title">{p.title}</h3>
              <p className="card-desc">{p.desc}</p>
              <div className="card-tags">
                {p.tags.map((t) => (
                  <span key={t} className="card-tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-btn carousel-btn--next" onClick={() => go(1)}>
          ›
        </button>
      </div>

      <div className="carousel-dots">
        {projects.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === safeIndex ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>

      <p className="carousel-hint">
        {projects[safeIndex]
          ? `${safeIndex + 1} / ${total} — ${projects[safeIndex].title}`
          : ''}
      </p>
    </div>
  );
};

export default Projects;
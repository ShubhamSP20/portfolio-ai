import { useEffect, useRef, useState } from 'react'

const projects = [
  {
    id: 1,
    title: 'AMC Smart Civic Management Platform',
    description: 'Smart governance system for complaints, permits and payments with forecasting features.',
    tech: ['React Native', 'Flutter', 'Node.js', 'Machine Learning'],
    color: '#00f5ff',
    icon: '🏛️',
    category: 'Web / Mobile Application',
    stars: 120,
    forks: 28
  },
  {
    id: 2,
    title: 'CryptoVerse',
    description: 'Real-time cryptocurrency tracking app with 3D price charts and portfolio management.',
    tech: ['Next.js', 'Three.js', 'WebSocket', 'MongoDB'],
    color: '#bf00ff',
    icon: '₿',
    category: 'Web3',
    stars: 89,
    forks: 21,
  },
  {
    id: 3,
    title: 'DevCollab',
    description: 'Real-time collaborative code editor with AI-powered suggestions and live preview.',
    tech: ['React', 'Node.js', 'Socket.io', 'PostgreSQL'],
    color: '#00ff88',
    icon: '👥',
    category: 'SaaS',
    stars: 203,
    forks: 58,
  },
  {
    id: 4,
    title: 'AI Lead Generator',
    description: 'Automated web scraping system with analytics dashboard for generating business leads.',
    tech: ['Apify', 'Playwright', 'FastAPI', 'Next.js'],
    color: '#a78bfa',
    icon: '🤖',
    category: 'AI / Data Tool',
    stars: 110,
    forks: 26
  },
  {
  id: 5,
  title: 'AI-Assisted Blockchain Forensics System',
  description: 'Blockchain investigation platform that analyzes crypto wallets, detects suspicious transactions, calculates risk scores using forensic factors, and generates AI-powered investigation reports.',
  tech: ['React', 'Python', 'Flask', 'Neo4j', 'Scikit-learn'],
  color: '#38bdf8',
  icon: '🔗',
  category: 'AI / Blockchain Application',
  stars: 210,
  forks: 48
},
  {
    id: 6,
    title: 'SmartChat',
    description: 'Conversational AI chatbot with context-awareness and multi-language support.',
    tech: ['Python', 'FastAPI', 'LangChain', 'React'],
    color: '#ff3e7a',
    icon: '💬',
    category: 'AI/ML',
    stars: 445,
    forks: 119,
  },
]

function ProjectCard({ project, index, visible }) {
  const [flipped, setFlipped] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="perspective-1000"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(50px)',
        transition: `all 0.6s ease ${index * 0.1}s`,
        perspective: '1000px',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative w-full h-72 cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : `rotateY(${hovered ? -5 : 0}deg) rotateX(${hovered ? 3 : 0}deg)`,
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onClick={() => setFlipped(!flipped)}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl p-6 flex flex-col"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: `linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.6))`,
            border: `1px solid ${project.color}40`,
            boxShadow: hovered
              ? `0 20px 60px ${project.color}30, 0 0 30px ${project.color}20`
              : `0 10px 30px ${project.color}10`,
          }}
        >
          {/* Top bar */}
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{
                background: `${project.color}15`,
                border: `1px solid ${project.color}40`,
              }}
            >
              {project.icon}
            </div>
            <span
              className="font-fira text-xs px-2 py-1 rounded-full"
              style={{
                background: `${project.color}15`,
                color: project.color,
                border: `1px solid ${project.color}40`,
              }}
            >
              {project.category}
            </span>
          </div>

          <h3
            className="font-orbitron text-lg font-bold mb-2"
            style={{ color: project.color }}
          >
            {project.title}
          </h3>

          <p className="text-sm leading-relaxed flex-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {project.description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: `1px solid ${project.color}20` }}>
            <div className="flex gap-4">
              <span className="font-fira text-xs flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                ⭐ {project.stars}
              </span>
              <span className="font-fira text-xs flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                ⑂ {project.forks}
              </span>
            </div>
            <span className="font-fira text-xs" style={{ color: `${project.color}80` }}>
              Click to flip →
            </span>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl p-6 flex flex-col"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `linear-gradient(135deg, ${project.color}15, rgba(0,0,0,0.9))`,
            border: `1px solid ${project.color}60`,
            boxShadow: `0 20px 60px ${project.color}30`,
          }}
        >
          <h3 className="font-orbitron text-base font-bold mb-4" style={{ color: project.color }}>
            Tech Stack
          </h3>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-fira text-xs px-3 py-1.5 rounded-full"
                style={{
                  background: `${project.color}15`,
                  color: project.color,
                  border: `1px solid ${project.color}40`,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex-1 flex flex-col justify-end gap-3">
            <button
              className="w-full py-2.5 rounded-lg font-fira text-sm font-medium transition-all duration-300 hover:opacity-80"
              style={{
                background: project.color,
                color: '#000',
              }}
            >
              View Project
            </button>
            <button
              className="w-full py-2.5 rounded-lg font-fira text-sm font-medium transition-all duration-300 hover:opacity-80"
              style={{
                border: `1px solid ${project.color}`,
                color: project.color,
                background: 'transparent',
              }}
            >
              GitHub Repo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [filter, setFilter] = useState('All')

  const categories = ['All', ...new Set(projects.map((p) => p.category))]
  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, transparent, rgba(0,245,255,0.02) 50%, transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className="text-center mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease',
          }}
        >
          <span className="font-fira text-sm" style={{ color: 'rgba(0,245,255,0.7)' }}>
            03. projects
          </span>
          <h2 className="font-orbitron text-4xl lg:text-5xl font-bold mt-3">
            <span className="gradient-text">My Work</span>
          </h2>
          <div
            className="w-24 h-0.5 mx-auto mt-4 rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, #00f5ff, transparent)' }}
          />
          <p className="mt-4 font-fira text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Click any card to reveal the tech stack
          </p>
        </div>

        {/* Filter tabs */}
        <div
          className="flex flex-wrap justify-center gap-3 mb-12"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.2s',
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="font-fira text-sm px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
              style={
                filter === cat
                  ? {
                      background: 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(191,0,255,0.2))',
                      border: '1px solid rgba(0,245,255,0.5)',
                      color: '#00f5ff',
                      boxShadow: '0 0 15px rgba(0,245,255,0.2)',
                    }
                  : {
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.6)',
                    }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}

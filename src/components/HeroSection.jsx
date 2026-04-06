import { useEffect, useRef, useState } from 'react'
import ThreeScene from './ThreeScene'

const roles = [
  'Software Developer',
  'Full Stack Engineer',
  'UI/UX Enthusiast',
  '3D Web Creator',
  'Problem Solver',
]

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 200)
  }, [])

  useEffect(() => {
    const role = roles[roleIndex]
    let charIndex = 0
    setDisplayText('')
    setIsTyping(true)

    const typeInterval = setInterval(() => {
      if (charIndex <= role.length) {
        setDisplayText(role.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(typeInterval)
        setIsTyping(false)
        setTimeout(() => {
          setRoleIndex((prev) => (prev + 1) % roles.length)
        }, 2000)
      }
    }, 80)

    return () => clearInterval(typeInterval)
  }, [roleIndex])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: '80px' }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 245, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 245, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'grid-move 8s linear infinite',
        }}
      />

      {/* Gradient orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,245,255,0.08) 0%, transparent 70%)',
          animation: 'float 8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(191,0,255,0.08) 0%, transparent 70%)',
          animation: 'float 10s ease-in-out infinite reverse',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div
          className="flex flex-col gap-6"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1s ease',
          }}
        >
          {/* Status badge */}
          <div className="inline-flex items-center gap-3 w-fit">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: '#00ff88', boxShadow: '0 0 10px #00ff88' }}
            />
            <span className="font-fira text-sm" style={{ color: '#00ff88' }}>
              Available for opportunities
            </span>
          </div>

          {/* Greeting */}
          <div>
            <p
              className="font-fira text-lg mb-2"
              style={{ color: 'rgba(0, 245, 255, 0.8)' }}
            >
              {'<'} Hello, World! {'>'}
            </p>
            <h1 className="font-orbitron leading-tight">
              <span className="text-white text-5xl lg:text-6xl block">I&apos;m</span>
              <span
                className="text-6xl lg:text-7xl block mt-1"
                style={{
                  background: 'linear-gradient(135deg, #00f5ff, #bf00ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: 'none',
                }}
              >
                Alex Dev
              </span>
            </h1>
          </div>

          {/* Typewriter role */}
          <div className="flex items-center gap-2">
            <span className="font-fira text-xl" style={{ color: 'rgba(255,255,255,0.6)' }}>
              &gt;&gt;
            </span>
            <span
              className="font-fira text-xl font-medium"
              style={{ color: '#00f5ff' }}
            >
              {displayText}
            </span>
            <span
              className="inline-block w-0.5 h-6 rounded"
              style={{
                background: isTyping ? '#00f5ff' : 'transparent',
                boxShadow: isTyping ? '0 0 8px #00f5ff' : 'none',
                animation: 'blink-cursor 0.8s step-end infinite',
              }}
            />
          </div>

          {/* Description */}
          <p
            className="text-lg leading-relaxed max-w-lg"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            Crafting immersive digital experiences with cutting-edge technologies.
            Passionate about transforming complex problems into elegant solutions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 rounded-full font-fira font-medium text-sm transition-all duration-300 hover:scale-105 relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(191,0,255,0.2))',
                border: '1px solid rgba(0,245,255,0.5)',
                boxShadow: '0 0 20px rgba(0,245,255,0.2)',
                color: '#00f5ff',
              }}
            >
              <span className="relative z-10">View My Work</span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, rgba(0,245,255,0.3), rgba(191,0,255,0.3))' }}
              />
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 rounded-full font-fira font-medium text-sm transition-all duration-300 hover:scale-105"
              style={{
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.8)',
                background: 'rgba(255,255,255,0.05)',
              }}
            >
              Contact Me
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-4">
            {[
              { num: '15+', label: 'Projects' },
              { num: '3+', label: 'Years Coding' },
              { num: '10+', label: 'Technologies' },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <div
                  className="font-orbitron text-2xl font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #00f5ff, #bf00ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {num}
                </div>
                <div className="font-fira text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: 3D Scene */}
        <div
          className="relative h-[500px] lg:h-[600px]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(40px)',
            transition: 'all 1.2s ease',
          }}
        >
          <ThreeScene />

          {/* Floating code badges */}
          {[
            { text: 'React.js', top: '10%', left: '5%', color: '#00f5ff' },
            { text: 'Node.js', top: '25%', right: '5%', color: '#00ff88' },
            { text: 'Python', bottom: '30%', left: '2%', color: '#bf00ff' },
            { text: 'Three.js', bottom: '15%', right: '8%', color: '#ff6b35' },
          ].map(({ text, color, ...pos }, i) => (
            <div
              key={text}
              className="absolute font-fira text-xs px-3 py-1.5 rounded-full pointer-events-none"
              style={{
                ...pos,
                border: `1px solid ${color}40`,
                color: color,
                background: `${color}10`,
                boxShadow: `0 0 10px ${color}30`,
                animation: `float ${5 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.8}s`,
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-fira text-xs" style={{ color: 'rgba(0,245,255,0.5)' }}>
          scroll down
        </span>
        <div
          className="w-5 h-9 rounded-full border flex justify-center pt-1.5"
          style={{ borderColor: 'rgba(0,245,255,0.3)' }}
        >
          <div
            className="w-1 h-2 rounded-full"
            style={{
              background: '#00f5ff',
              animation: 'float 1.5s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </section>
  )
}

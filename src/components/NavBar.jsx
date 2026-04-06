import { useState, useEffect } from 'react'

const navLinks = ['Home', 'About', 'Skills', 'Projects', 'Contact']

export default function NavBar({ scrollY }) {
  const [active, setActive] = useState('Home')
  const [menuOpen, setMenuOpen] = useState(false)

  const isScrolled = scrollY > 50

  const handleNav = (link) => {
    setActive(link)
    setMenuOpen(false)
    const el = document.getElementById(link.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: isScrolled ? 'rgba(2, 0, 16, 0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(0, 245, 255, 0.1)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="font-orbitron text-xl font-bold cursor-pointer"
          onClick={() => handleNav('Home')}
        >
          <span className="neon-text-cyan">DEV</span>
          <span className="text-white">_</span>
          <span className="neon-text-purple">FOLIO</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => handleNav(link)}
              className="relative font-fira text-sm transition-all duration-300 group"
              style={{ color: active === link ? '#00f5ff' : 'rgba(255,255,255,0.7)' }}
            >
              <span className="relative z-10">{link}</span>
              {active === link && (
                <span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: 'var(--neon-cyan)', boxShadow: '0 0 8px #00f5ff' }}
                />
              )}
              <span
                className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'rgba(0, 245, 255, 0.05)' }}
              />
            </button>
          ))}
          <button
            onClick={() => handleNav('Contact')}
            className="font-fira text-sm px-5 py-2 rounded-full border transition-all duration-300 hover:scale-105"
            style={{
              borderColor: 'var(--neon-cyan)',
              color: 'var(--neon-cyan)',
              boxShadow: '0 0 15px rgba(0, 245, 255, 0.2)',
            }}
          >
            Hire Me
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-6 h-0.5 transition-all duration-300"
              style={{
                background: 'var(--neon-cyan)',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(4px, 4px)' :
                    i === 1 ? 'opacity: 0' : 'rotate(-45deg) translate(4px, -4px)'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
          style={{ background: 'rgba(2, 0, 16, 0.98)', borderTop: '1px solid rgba(0,245,255,0.1)' }}
        >
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => handleNav(link)}
              className="text-left font-fira text-sm py-2"
              style={{ color: active === link ? '#00f5ff' : 'rgba(255,255,255,0.7)' }}
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

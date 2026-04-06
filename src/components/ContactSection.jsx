import { useEffect, useRef, useState } from 'react'

const socialLinks = [
  { name: 'GitHub', icon: '⑂', color: '#f0f6fc', href: '#' },
  { name: 'LinkedIn', icon: 'in', color: '#0077b5', href: '#' },
  { name: 'Twitter', icon: '𝕏', color: '#1d9bf0', href: '#' },
  { name: 'Email', icon: '@', color: '#00f5ff', href: 'mailto:alex@dev.com' },
]

export default function ContactSection() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSent(true)
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setSent(false), 4000)
    }, 2000)
  }

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* BG effects */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.3), transparent)' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(191,0,255,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className="text-center mb-20"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease',
          }}
        >
          <span className="font-fira text-sm" style={{ color: 'rgba(0,245,255,0.7)' }}>
            04. contact
          </span>
          <h2 className="font-orbitron text-4xl lg:text-5xl font-bold mt-3">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <div
            className="w-24 h-0.5 mx-auto mt-4 rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, #bf00ff, transparent)' }}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <div
            className="space-y-8"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'all 0.8s ease 0.2s',
            }}
          >
            <div>
              <h3 className="font-orbitron text-2xl font-bold text-white mb-4">
                Let&apos;s Build Something{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #00f5ff, #bf00ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Amazing
                </span>
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                I&apos;m actively looking for internships and junior developer
                positions. Whether you have a project in mind or just want to
                connect, my inbox is always open.
              </p>
            </div>

            {/* Info cards */}
            <div className="space-y-4">
              {[
                { label: 'Location', value: 'San Francisco, CA', icon: '📍', color: '#00f5ff' },
                { label: 'Availability', value: 'Available from June 2026', icon: '📅', color: '#00ff88' },
                { label: 'Response', value: 'Usually within 24 hours', icon: '⚡', color: '#bf00ff' },
              ].map(({ label, value, icon, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-4 rounded-xl"
                  style={{
                    background: `${color}08`,
                    border: `1px solid ${color}20`,
                  }}
                >
                  <span className="text-xl">{icon}</span>
                  <div>
                    <p className="font-fira text-xs" style={{ color: `${color}80` }}>
                      {label}
                    </p>
                    <p className="font-medium text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p className="font-fira text-sm mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Find me on:
              </p>
              <div className="flex gap-4">
                {socialLinks.map(({ name, icon, color, href }) => (
                  <a
                    key={name}
                    href={href}
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-bold transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    title={name}
                    style={{
                      background: `${color}10`,
                      border: `1px solid ${color}30`,
                      color: color,
                      fontSize: name === 'LinkedIn' ? '12px' : '16px',
                      boxShadow: `0 0 15px ${color}10`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 25px ${color}40`
                      e.currentTarget.style.borderColor = `${color}60`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 15px ${color}10`
                      e.currentTarget.style.borderColor = `${color}30`
                    }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'all 0.8s ease 0.4s',
            }}
          >
            <div
              className="p-8 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(0,245,255,0.15)',
                boxShadow: '0 0 40px rgba(0,245,255,0.05)',
              }}
            >
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-6"
                    style={{
                      background: 'rgba(0,255,136,0.1)',
                      border: '2px solid rgba(0,255,136,0.4)',
                      boxShadow: '0 0 40px rgba(0,255,136,0.2)',
                    }}
                  >
                    ✓
                  </div>
                  <h3 className="font-orbitron text-xl font-bold mb-2" style={{ color: '#00ff88' }}>
                    Message Sent!
                  </h3>
                  <p className="font-fira text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    I&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { id: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
                    { id: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
                  ].map(({ id, label, type, placeholder }) => (
                    <div key={id}>
                      <label
                        className="block font-fira text-xs mb-2"
                        style={{ color: focused === id ? '#00f5ff' : 'rgba(255,255,255,0.5)' }}
                      >
                        {label}
                      </label>
                      <input
                        type={type}
                        value={form[id]}
                        onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                        onFocus={() => setFocused(id)}
                        onBlur={() => setFocused(null)}
                        placeholder={placeholder}
                        required
                        className="w-full px-4 py-3 rounded-lg font-fira text-sm outline-none transition-all duration-300"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: `1px solid ${focused === id ? 'rgba(0,245,255,0.5)' : 'rgba(255,255,255,0.1)'}`,
                          color: 'white',
                          boxShadow: focused === id ? '0 0 20px rgba(0,245,255,0.1)' : 'none',
                        }}
                      />
                    </div>
                  ))}

                  <div>
                    <label
                      className="block font-fira text-xs mb-2"
                      style={{ color: focused === 'message' ? '#00f5ff' : 'rgba(255,255,255,0.5)' }}
                    >
                      Message
                    </label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      placeholder="Tell me about your project or just say hi..."
                      required
                      className="w-full px-4 py-3 rounded-lg font-fira text-sm outline-none transition-all duration-300 resize-none"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: `1px solid ${focused === 'message' ? 'rgba(0,245,255,0.5)' : 'rgba(255,255,255,0.1)'}`,
                        color: 'white',
                        boxShadow: focused === 'message' ? '0 0 20px rgba(0,245,255,0.1)' : 'none',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-4 rounded-xl font-fira font-medium text-sm transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(191,0,255,0.2))',
                      border: '1px solid rgba(0,245,255,0.4)',
                      color: '#00f5ff',
                      boxShadow: '0 0 20px rgba(0,245,255,0.15)',
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0,245,255,0.3), rgba(191,0,255,0.3))',
                      }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {sending ? (
                        <>
                          <div
                            className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
                            style={{ borderColor: '#00f5ff', borderTopColor: 'transparent' }}
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <span>→</span>
                        </>
                      )}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="mt-24 pt-8 text-center"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="font-orbitron font-bold">
              <span className="neon-text-cyan">DEV</span>
              <span className="text-white">_</span>
              <span className="neon-text-purple">FOLIO</span>
            </span>
          </div>
          <p className="font-fira text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Built with React + Three.js + Love ♥ &nbsp;|&nbsp; © 2026 Alex Dev
          </p>
        </div>
      </div>
    </section>
  )
}

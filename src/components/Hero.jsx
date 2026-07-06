import { useEffect, useRef } from 'react'
import './Hero.css'

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Particles
    const particles = []
    const PARTICLE_COUNT = 80
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      })
    }

    // Rune circle
    let runeAngle = 0
    const runeRadius = 200
    const runePoints = 8

    const drawRuneCircle = (cx, cy, angle) => {
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(angle)

      // Outer ring
      ctx.beginPath()
      ctx.arc(0, 0, runeRadius, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(201, 168, 76, 0.08)'
      ctx.lineWidth = 1
      ctx.stroke()

      // Inner ring
      ctx.beginPath()
      ctx.arc(0, 0, runeRadius * 0.6, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(201, 168, 76, 0.05)'
      ctx.lineWidth = 1
      ctx.stroke()

      // Rune lines
      for (let i = 0; i < runePoints; i++) {
        const a = (i / runePoints) * Math.PI * 2
        const nextA = ((i + 1) / runePoints) * Math.PI * 2

        const x1 = Math.cos(a) * runeRadius
        const y1 = Math.sin(a) * runeRadius
        const x2 = Math.cos(nextA) * runeRadius
        const y2 = Math.sin(nextA) * runeRadius
        const ix1 = Math.cos(a) * runeRadius * 0.6
        const iy1 = Math.sin(a) * runeRadius * 0.6

        // Spoke
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(ix1, iy1)
        ctx.strokeStyle = 'rgba(201, 168, 76, 0.06)'
        ctx.lineWidth = 1
        ctx.stroke()

        // Outer star connection
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.strokeStyle = 'rgba(201, 168, 76, 0.04)'
        ctx.lineWidth = 1
        ctx.stroke()

        // Rune dots
        ctx.beginPath()
        ctx.arc(x1, y1, 2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(201, 168, 76, 0.12)'
        ctx.fill()
      }

      ctx.restore()
    }

    // Horizontal grid lines
    const drawGrid = () => {
      const spacing = 60
      ctx.strokeStyle = 'rgba(201, 168, 76, 0.02)'
      ctx.lineWidth = 1

      for (let x = 0; x < canvas.width; x += spacing) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += spacing) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    // Floating rune symbols
    const runes = ['ᚺ', 'ᛏ', 'ᚱ', 'ᛉ', 'ᛗ', 'ᛇ', 'ᚨ', 'ᛚ']
    const floatingRunes = []
    for (let i = 0; i < 6; i++) {
      floatingRunes.push({
        char: runes[Math.floor(Math.random() * runes.length)],
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 14 + 10,
        alpha: Math.random() * 0.04 + 0.02,
        speed: Math.random() * 0.1 + 0.05,
        drift: Math.random() * 0.2 - 0.1,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background gradient
      const grad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.6
      )
      grad.addColorStop(0, 'rgba(18, 18, 30, 0.3)')
      grad.addColorStop(0.5, 'rgba(10, 10, 15, 0.1)')
      grad.addColorStop(1, 'rgba(5, 5, 10, 0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drawGrid()

      // Draw rune circle
      drawRuneCircle(canvas.width * 0.7, canvas.height * 0.5, runeAngle)
      drawRuneCircle(canvas.width * 0.3, canvas.height * 0.4, -runeAngle * 0.7)

      // Update particles
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201, 168, 76, ${p.alpha})`
        ctx.fill()
      }

      // Floating runes
      for (const r of floatingRunes) {
        r.y -= r.speed
        r.x += r.drift
        if (r.y < -20) {
          r.y = canvas.height + 20
          r.x = Math.random() * canvas.width
        }
        ctx.font = `${r.size}px serif`
        ctx.fillStyle = `rgba(201, 168, 76, ${r.alpha})`
        ctx.fillText(r.char, r.x, r.y)
      }

      runeAngle += 0.002
      animId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section id="hero" className="hero">
      <canvas ref={canvasRef} className="hero-canvas" />

      {/* Video background placeholder — replace with your own video */}
      {/* <video className="hero-video" autoPlay muted loop playsInline poster="/hero-poster.jpg">
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video> */}

      <div className="hero-overlay" />

      <div className="hero-content content-container">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          Game Design Portfolio
        </div>

        <h1 className="hero-title">
          <span className="hero-title-line">Hank</span>
          <span className="hero-title-sub">Game Designer &amp; World Builder</span>
        </h1>

        <p className="hero-description">
          RMIT University · 3rd Year · Building immersive worlds through game design,
          interactive storytelling, and creative code.
        </p>

        <div className="hero-actions">
          <a href="#projects" className="hero-btn-primary">
            View My Work
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#contact" className="hero-btn-secondary">
            Get In Touch
          </a>
        </div>

        <div className="hero-scroll">
          <div className="scroll-mouse">
            <div className="scroll-dot"></div>
          </div>
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  )
}

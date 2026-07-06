import './About.css'

export default function About() {
  const stats = [
    { value: '3+', label: 'Years Learning' },
    { value: '4', label: 'Game Projects' },
    { value: '3', label: 'Engines' },
    { value: '∞', label: 'Ideas' },
  ]

  return (
    <section id="about" className="about">
      <div className="content-container">
        <div className="about-grid">
          <div className="about-visual">
            <div className="avatar-frame">
              <div className="avatar-placeholder">
                <span className="avatar-initials">H</span>
                <div className="avatar-ring"></div>
              </div>
            </div>
            <div className="contact-mini">
              <div className="contact-mini-item">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 4L8 9L14 4V12H2V4Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
                <span>hank.gamedesign@example.com</span>
              </div>
              <div className="contact-mini-item">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M8 4V8L10 10" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                <span>Melbourne / Remote</span>
              </div>
            </div>
          </div>

          <div className="about-info">
            <div className="section-label">About Me</div>
            <h2 className="section-title">A Game Designer in the Making</h2>
            <p className="about-description">
              I'm a third-year Game Design student at RMIT University, driven by a passion 
              for creating immersive worlds and memorable player experiences. My journey 
              into game design started with wondering how my favorite games worked — now 
              I'm building my own.
            </p>
            <p className="about-description">
              From Unreal Engine prototypes to Unity gameplay systems, I explore 
              every layer of game development. I'm fascinated by the intersection of 
              mythology, storytelling, and interactive systems — inspired by epics like 
              <em> God of War</em> and <em>The Legend of Zelda</em>.
            </p>
            <p className="about-description">
              Currently preparing my portfolio for graduate school applications, 
              focused on level design, gameplay mechanics, and world-building.
            </p>

            <div className="about-stats">
              {stats.map((s, i) => (
                <div key={i} className="stat-item">
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

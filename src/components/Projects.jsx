import './Projects.css'

const projects = [
  {
    id: 'gds',
    title: 'GDS Project',
    subtitle: 'Top-Down Adventure',
    description: 'A top-down action-adventure game built in Unreal Engine with puzzle mechanics, chase sequences, and a death-triggered world state system.',
    tags: ['Unreal Engine', 'Level Design', 'Blueprints'],
    color: '#c9a84c',
  },
  {
    id: 'mechanics',
    title: 'Game Mechanics Lab',
    subtitle: 'Systems Design',
    description: 'A collection of gameplay prototypes exploring movement systems, chase AI, false paths, portals, and environmental interaction mechanics.',
    tags: ['UE Prototype', 'Game Flow', 'Mechanics'],
    color: '#4a9eff',
  },
  {
    id: 'creative-coding',
    title: 'Creative Coding',
    subtitle: 'Code as Canvas',
    description: 'Generative art and interactive systems built through code — exploring how algorithms can create visual poetry and emergent behaviors.',
    tags: ['Processing', 'p5.js', 'Interactive'],
    color: '#e06040',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="content-container">
        <div className="projects-header">
          <div className="section-label">Featured Work</div>
          <h2 className="section-title">Selected Projects</h2>
          <p className="section-subtitle">
            A look at the games and systems I've designed, from concept to prototype.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <article key={p.id} className="project-card" style={{ '--card-accent': p.color }}>
              <div className="project-card-image">
                <div className="project-visual" data-project={p.id}>
                  <div className="project-visual-grid">
                    {[...Array(12)].map((_, j) => (
                      <div
                        key={j}
                        className="grid-cell"
                        style={{
                          animationDelay: `${j * 0.05}s`,
                          background: j % 3 === 0
                            ? `rgba(201, 168, 76, 0.03)`
                            : j % 3 === 1
                            ? `rgba(74, 158, 255, 0.03)`
                            : `rgba(224, 96, 64, 0.03)`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="project-visual-center">
                    <span className="project-icon">
                      {p.id === 'gds' ? '⚔' : p.id === 'mechanics' ? '⚙' : '✦'}
                    </span>
                    <span className="project-visual-label">{p.subtitle}</span>
                  </div>
                  <div className="project-corner top-left"></div>
                  <div className="project-corner top-right"></div>
                  <div className="project-corner bottom-left"></div>
                  <div className="project-corner bottom-right"></div>
                </div>
              </div>
              <div className="project-card-info">
                <span className="project-number">0{i + 1}</span>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-description">{p.description}</p>
                <div className="project-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="project-tag">{t}</span>
                  ))}
                </div>
                <button className="project-link">
                  View Project
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

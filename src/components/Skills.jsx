import './Skills.css'

const skillCategories = [
  {
    title: 'Game Engines',
    icon: '⚙',
    skills: ['Unreal Engine', 'Unity', 'Blueprints', 'C#'],
  },
  {
    title: 'Design & Art',
    icon: '✦',
    skills: ['Level Design', 'World Building', 'Game Flow', 'UI/UX'],
  },
  {
    title: 'Programming',
    icon: '〈〉',
    skills: ['C++', 'C#', 'Python', 'JavaScript'],
  },
  {
    title: 'Story & Narrative',
    icon: '📜',
    skills: ['Interactive Storytelling', 'Mythology', 'Scriptwriting', 'Lore Building'],
  },
  {
    title: 'Tools & Pipeline',
    icon: '🔧',
    skills: ['Blender', 'Photoshop', 'Git', 'Notion'],
  },
  {
    title: 'Soft Skills',
    icon: '◇',
    skills: ['Team Collaboration', 'Iterative Design', 'Problem Solving', 'Critical Thinking'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="content-container">
        <div className="skills-header">
          <div className="section-label">My Arsenal</div>
          <h2 className="section-title">Skills &amp; Tools</h2>
          <p className="section-subtitle">
            The tools, engines, and disciplines I work with to bring game worlds to life.
          </p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((cat, i) => (
            <div key={i} className="skill-card" style={{ '--index': i }}>
              <div className="skill-card-header">
                <span className="skill-icon">{cat.icon}</span>
                <h3 className="skill-category-title">{cat.title}</h3>
              </div>
              <ul className="skill-list">
                {cat.skills.map((s) => (
                  <li key={s} className="skill-item">{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

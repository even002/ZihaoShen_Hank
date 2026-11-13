import PortfolioImage from './PortfolioImage'
import './HomePortfolio.css'

const media = `${import.meta.env.BASE_URL}assets/portfolio/`
const projects = [
  {
    id: 'ready-to-die', title: 'Ready to Die', context: 'Individual project in Unity',
    role: 'Game and level design', image: 'ready-to-die-level2-environment.png',
    alt: 'The flooded industrial area in Ready to Die',
    summary: 'A third-person game where dying changes the route through a flooded city. Four levels combine parkour, office puzzles and shooting, with a final fight shaped by the player’s death count.',
    contribution: 'I designed the level layouts, puzzles and changes after death, then developed and revised the game in Unity with AI assistance.',
    topics: ['Death and progression', 'Level layouts and puzzles', 'Changes made during playtesting'],
  },
  {
    id: 'last-amber', title: 'Last Amber', context: 'Team project in Unreal Engine',
    role: 'VFX design & implementation', image: 'last-amber-blade-slash-final.png',
    alt: 'The red and black blade slash effect in Last Amber',
    summary: 'A boss encounter in a gothic hall. I took on the effects work and learned Niagara and Unreal’s material tools to make the attacks and atmosphere fit the game.',
    contribution: 'My work includes blade effects, the falling AOE attack, player ultimate, scene fog adjustments and phase-two screen blood mist.',
    topics: ['Attack effects and timing', 'Material and Niagara iterations', 'Team integration'],
  },
]

export default function HomePortfolio() {
  return <div className="portfolio-home content-shell">
    <section className="home-introduction" id="top" aria-labelledby="home-name">
      <div><h1 id="home-name">Zihao Shen</h1><p className="home-role">Game Designer</p></div>
      <p className="home-bio">I study Game Design at RMIT University. I designed a death loop where the level only changes if you die in the right place.</p>
    </section>

    <section className="home-work" id="work" aria-labelledby="home-work-title">
      <h2 id="home-work-title">Selected projects</h2>
      {projects.map(project => <article className="home-project" key={project.id}>
        <a className="home-project-image" href={`#/${project.id}`} aria-label={`View ${project.title} project`}>
          <PortfolioImage src={`${media}${project.image}`} alt={project.alt} loading={project.id === 'ready-to-die' ? 'eager' : 'lazy'} />
        </a>
        <div className="home-project-body">
          <p className="home-project-context">{project.context}</p>
          <h3><a href={`#/${project.id}`}>{project.title}</a></h3>
          <p className="home-project-role">{project.role}</p>
          <p>{project.summary}</p>
          <p>{project.contribution}</p>
          <ul className="home-project-topics" aria-label={`Inside the ${project.title} case study`}>{project.topics.map(topic => <li key={topic}>{topic}</li>)}</ul>
          <a className="home-project-link" href={`#/${project.id}`}>View {project.title}</a>
        </div>
      </article>)}
    </section>

    <section className="home-about" id="about" aria-labelledby="home-about-title">
      <h2 id="home-about-title">About me</h2>
      <div><p>I’m interested in how a level teaches the player what to do and how its rules change as they progress. Ready to Die gave me room to work on those questions across a complete game.</p>
      <p>For Last Amber, I learned real-time effects because the team needed them. My role changed with the project, but I kept checking how the work would look and behave during play.</p>
      <p>The case studies explain my own work, the parts developed with AI assistance, and the assets made by other creators.</p>
      <a className="home-profile-link" href="https://github.com/even002" target="_blank" rel="noreferrer">GitHub profile</a></div>
    </section>
  </div>
}

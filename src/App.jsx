import PortfolioImage from './components/PortfolioImage'
import { useEffect, useState } from 'react'
import './App.css'
import ReadyToDieCase from './components/ReadyToDieCase'
import ReadyToDieCredits from './components/ReadyToDieCredits'
import HomePortfolio from './components/HomePortfolio'
import KeyDecisions from './components/KeyDecisions'

const base = `${import.meta.env.BASE_URL}assets/portfolio/`

const amberStudies = [
  {
    number: '01',
    title: 'Fog',
    guide: 'Look for the dark-red colour and added emissive light that keep the fog visible in the darker parts of the room.',
    date: '29 Jul–02 Aug 2026',
    paragraphs: ["I built the fog in Niagara using an Unreal Engine texture and a material I made in the Material Editor. I wanted to darken the arena without hiding the routes or attacks.", "The first version did not fit the scene lighting. I changed it to dark red and added a small amount of emissive colour so it stayed visible in the darker parts of the room."],
    tools: 'Unreal Engine · Niagara',
    images: [
      { src: `${base}last-amber-fog-final.png`, label: 'Final version · dark-red volumetric fog' },
    ],
  },
  {
    number: '02',
    title: 'Blade Light',
    guide: 'Compare the white-core test with the red-black version after the texture and palette were rebuilt.',
    date: '03–10 Aug 2026',
    paragraphs: ["I made the blade mask, material, mesh and Niagara trail, then adjusted them to the attack animation. A bright centre and dark-red edge helped the trail show the direction of the swing.", "The first version had broken pieces at the tail, visible stripes and a grey ghost image. I rebuilt the texture and changed the palette to red and black. The images show that change from the white-core test to the final version."],
    tools: 'Unreal Engine · Niagara · Materials',
    images: [
      { src: `${base}last-amber-blade-light-v1.png`, label: 'First version · white-core silhouette test' },
      { src: `${base}last-amber-blade-light-v2.png`, label: 'Second version · fire and edge treatment' },
      { src: `${base}last-amber-blade-light-final.png`, label: 'Final version · red-black palette' },
    ],
    note: 'Player variant: I used the boss effect as a starting point, then reduced its size, brightness, lifetime and curve. The smaller version shows the player’s attack direction without competing with the boss effects.',
  },
  {
    number: '03',
    title: 'Blade Slash',
    guide: 'Look for how the blade, fire and black outer flame form a slash that plays once with the attack animation.',
    date: '11–31 Aug 2026',
    paragraphs: ["For the boss’s wide slash, I combined the blade, fire and black outer flame in one Niagara system. The effect needed to warn the player and follow the attack animation.", "Early tests sometimes repeated or showed no particles. I removed a duplicate actor and kept one Spawn Burst instead of using both Burst and Spawn Rate. I also gave the black flame its own translucent material because it disappeared beside the bright centre.", "Making the effect double-sided and adjusting its scale helped it read from different angles. The final slash plays once with the animation."],
    tools: 'Unreal Engine · Niagara · Materials',
    images: [
      { src: `${base}last-amber-blade-slash-setup.png`, label: 'Attack setup' },
      { src: `${base}last-amber-blade-slash-windup.png`, label: 'Wind-up and range cue' },
      { src: `${base}last-amber-blade-slash-impact.png`, label: 'Impact frame' },
      { src: `${base}last-amber-blade-slash-final.png`, label: 'Final slash integration' },
    ],
  },
  {
    number: '04',
    title: 'AOE Falling Attack',
    guide: 'Follow the targeting columns and warning ring through to the falling column, ground spread and fog.',
    caption: 'I built the attack in stages: targeting columns, a warning ring, a falling column, ground energy and fog. Flat sprites did not give the impact enough volume, so I used a cylindrical mesh with vertex displacement to spread its base. Noise breaks it into red strands and black gaps. I also replaced custom HLSL targeting with Niagara curve and position modules. The columns converge before the strike, and the falling column meets the ground spread. I worked with the team on integration and testing.',
    date: '10–29 Sep 2026',
    paragraphs: ["I built this attack in stages: targeting columns gather at the centre, a ring marks the area, the main column falls, then energy spreads across the ground and releases volumetric fog. Separate emitters let me adjust the warning, impact and fade independently.", "The ground impact was the hardest part. A stock cone repeated the texture on each face, while sprites and crossed planes looked flat from the side. I replaced them with a cylindrical mesh and used World Position Offset to push its lower vertices outward. Noise breaks up the surface into red strands and black gaps.", "I also replaced a custom HLSL approach for the targeting columns with Niagara curve and position modules. The columns converge before the strike, and the column joins the ground spread instead of ending above a separate burst. I worked with the team on the later integration and testing."],
    tools: 'Unreal Engine 5.6 · Niagara · Niagara Fluids · Materials',
    images: [
      { src: `${base}aoe-sequence-01-targeting-columns.png`, label: '01 · Thin targeting columns gather at the centre' },
      { src: `${base}aoe-sequence-02-warning-ring.png`, label: '02 · Warning ring and centre marker appear' },
      { src: `${base}aoe-sequence-03-falling-column.png`, label: '03 · Falling column reaches the marked area' },
      { src: `${base}aoe-sequence-04-ground-impact.png`, label: '04 · Red-and-black energy spreads across the ground' },
    ],
    noteLabel: 'Migration note',
    note: 'The target project must enable Niagara Fluids before migration. Without it, the Grid3D emitters lose their plugin scripts and report unknown-function errors even though the migrated Niagara asset itself is present.',
  },
  {
    number: '05',
    title: 'Better Fog System',
    guide: 'Compare the warm-grey and dark-red scene tests while checking the player, nearby fire and distant attacks.',
    date: 'October 2026',
    paragraphs: ["My final work on Better Fog focused on the scene’s colour, density and visibility. I compared warm-grey and dark-red versions while checking whether the player, nearby fire and distant attacks remained readable.", "Earlier texture tests looked too much like rolling smoke. I tried softer veils and ground wisps, then adjusted the scene fog around the existing lighting. The images here show those development comparisons."],
    tools: 'Unreal Engine 5.6 · Niagara · Blueprint · Volumetric Fog',
    images: [
      { src: `${base}better-fog-veil.png`, label: 'Main veil texture · broad, low-contrast fog layer' },
      { src: `${base}better-fog-wisps.png`, label: 'Ground wisps texture · narrow moving detail' },
      { src: `${base}better-fog-scene-warm-grey.png`, label: 'Warm-grey test · distant red effects remain visible' },
      { src: `${base}better-fog-scene-dark-red.png`, label: 'Dark-red test · fog changes the scene mood and depth' },
    ],
    noteLabel: 'Development images',
    note: 'These images preserve earlier texture and scene comparisons, rather than final-build captures. My final contribution focused on adjusting the scene fog.',
  },
  {
    number: '06', title: 'Player Ultimate',
    guide: 'The ultimate changed from an overhead beam to an enlarged sword, with the burst redirected along the blade.', date: 'October 2026',
    paragraphs: ["The ultimate began as an overhead energy beam, but I changed it to an enlarged sword so the attack stayed connected to the player’s weapon. I developed the sword energy, gathering particles, burst and trail as separate stages.", "An early burst spread out like a star. I changed its shape and movement to follow the length of the blade, then worked with the team to integrate and test the effect."],
    tools: 'Unreal Engine · Niagara · Materials',
  },
  {
    number: '07', title: 'Phase Two Screen Blood Mist',
    guide: 'Look for how the mist stays around the screen edges while the centre remains open for combat.', date: 'October 2026',
    paragraphs: ["I made a warm-red mist around the screen edges for the boss’s second phase, keeping the centre open for combat. A full-screen widget displays the material, and a controller handles showing and removing it.", "The first version was too faint in the scene. I adjusted its colour, opacity and edge coverage, then prepared the dependencies and controller instructions for the team to integrate and test."],
    tools: 'Unreal Engine · Materials · UMG · Blueprint',
  },
]

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>
}

function Header({ projectPage = false }) {
  return (
    <header className="site-header">
      <a className="wordmark" href={projectPage ? '#' : '#top'} aria-label="Zihao Shen home">
        <span className="wordmark-initials">ZS</span>
        <span>Zihao Shen</span>
      </a>
      <nav aria-label="Primary navigation">
        <a href="#work">{projectPage ? 'All work' : 'Work'}</a>
        {!projectPage && <a href="#about">About</a>}
        <a className="nav-cta" href="https://github.com/even002" target="_blank" rel="noreferrer">GitHub <ArrowIcon /></a>
      </nav>
    </header>
  )
}

function ProjectHeader({ title, discipline }) {
  return (
    <div className="project-heading">
      <div>
        <p>{discipline}</p>
        <h2>{title}</h2>
      </div>
    </div>
  )
}

function ProjectPageShell({ children, nextHref, nextLabel }) {
  return (
    <div className="project-page">
      <div className="content-shell project-page-content">
        {children}
        <nav className="case-navigation" aria-label="Case study navigation">
          <a href="#work"><span>←</span> Back to selected work</a>
          <a href={nextHref}>Next project: {nextLabel} <span>→</span></a>
        </nav>
      </div>
    </div>
  )
}

function ProcessStudy({ study, compact = false }) {

  return (
    <section data-piece-id={`LA-${study.number}`} className={`process-study${compact ? ' compact' : ''}${study.title === 'AOE Falling Attack' ? ' aoe-sequence-study' : ''}${study.title === 'Better Fog System' ? ' better-fog-study' : ''}`}>
      <header className="process-study-header">
        <div><p>{study.tools}</p><h3>{study.title}</h3><p className="study-role">My role: {study.title === 'Better Fog System' ? 'Scene fog adjustment' : 'VFX design and implementation'}</p></div>
        <div className="process-status"><span>{study.date}</span></div>
      </header>
      {study.guide && <p className="process-story study-guide">{study.guide}</p>}
      {study.images && (
        <div className={`process-gallery gallery-${Math.min(study.images.length, 4)}`}>
          {study.images.map((image) => (
            <figure key={image.src}>
              <PortfolioImage src={image.src} alt={`${study.title} — ${image.label}`} loading="lazy" />
              <figcaption>{image.label}</figcaption>
            </figure>
          ))}
        </div>
      )}
      <div className="process-story">{(study.caption ? [study.caption] : study.paragraphs).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      {study.caption && <details className="process-detail"><summary>Development notes</summary>{study.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</details>}
      {study.note && <aside className="process-note"><span>{study.noteLabel || 'Player version'}</span><p>{study.note.replace('Player variant: ', '')}</p></aside>}
    </section>
  )
}

function LastAmber() {
  return (
    <ProjectPageShell nextHref="#/ready-to-die" nextLabel="Ready to Die">
    <article className="project section project-detail" id="last-amber">
      <ProjectHeader title="Last Amber" discipline="VFX design & implementation · Team project · Completed" />
      <div className="project-intro">
        <div className="intro-lead"><p>A short boss fight in a gothic hall, with clear combat effects, dark fog and red fire.</p></div>
        <dl className="facts">
          <div><dt>Engine</dt><dd>Unreal Engine 5.6.1</dd></div>
          <div><dt>Platform</dt><dd>PC</dd></div>
          <div><dt>Length</dt><dd>5–10 minute encounter</dd></div>
          <div><dt>My role</dt><dd>VFX design & implementation</dd></div>
        </dl>
      </div>
      <aside className="authorship-note"><span>My contribution</span><p>I developed the blade effects, AOE attack, player ultimate and screen blood mist, adjusted the scene fog and prepared VFX for team integration. Character, environment and gameplay work belong to the wider team and their credited asset creators.</p></aside>
      <figure className="project-opening-media">
        <PortfolioImage src={`${base}last-amber-blade-slash-final.png`} alt="Final red-black blade slash effect in the Last Amber encounter" loading="eager" />
        <figcaption>Current Unreal Engine capture — final blade slash integration</figcaption>
      </figure>
      <KeyDecisions items={[
        ['Give the ground impact volume', 'Sprites and crossed planes looked flat. For the AOE impact, I used a cylindrical mesh and displaced its lower vertices outward to join the falling column to the ground spread.'],
        ['Give the ultimate a connection to the weapon', 'The early ultimate was an overhead beam. I changed it to an enlarged sword and redirected the burst along the blade.'],
        ['Leave room to read combat', 'The second-phase screen mist needed to change the mood without covering the fight. I placed the warm-red mist around the edges and kept the centre open.'],
      ]} />
      <div className="case-heading">
        <span>Scene design</span>
        <p>The boss fight takes place in a corrupted gothic throne hall. The room is symmetrical, with an open circular floor and the throne at the far end. Red light from the stained glass makes the room feel dangerous without hiding the attacks.</p>
      </div>
      <section className="environment-study">
        <figure className="environment-sketch">
          <PortfolioImage src={`${base}last-amber-scene-design.png`} alt="Gothic throne hall environment sketch" loading="lazy" />
          <figcaption>Scene concept — central axis and open combat floor</figcaption>
        </figure>
        <div className="environment-copy">
          <span>Level layout</span>
          <h3>A throne room with enough space for a clear boss fight</h3>
          <p>The throne gives the player a clear point to face, while the open centre leaves room for dodging and large attacks. The symmetrical layout helps the player stay oriented when fog and fire fill the room.</p>
          <dl>
            <div><dt>Layout</dt><dd>A straight path to the throne and an open combat area</dd></div>
            <div><dt>Look</dt><dd>Gothic stone, red stained glass and demonic corruption</dd></div>
            <div><dt>VFX</dt><dd>Dark-red fog adds depth while bright attacks stay visible</dd></div>
          </dl>
        </div>
      </section>
      <figure className="reference-board environment-reference">
        <PortfolioImage src={`${base}last-amber-environment-reference-board.jpg`} alt="Environment visual reference board with gothic halls, arenas and moonlit spaces" loading="lazy" />
        <figcaption>Environment reference board — visual references collected during development</figcaption>
      </figure>

      <aside className="authorship-note"><span>Team context</span><p>The scene and character concepts show the team’s shared art direction. The following studies focus on my VFX contribution and its development.</p></aside>
      <div className="case-heading">
        <span>Character design</span>
        <p>The two characters come from the same group of royal guards. The player character survived the ritual, while the corrupted guard became the boss. This difference guided the size, colour and movement of their effects.</p>
      </div>
      <div className="character-studies">
        <article className="character-study player-character">
          <header><p>Player Character Design</p><h3>Survivor</h3></header>
          <div className="character-visuals">
            <figure className="character-concept">
              <PortfolioImage src={`${base}last-amber-player-concept.png`} alt="Player character concept line drawing with heavy armour and an oversized sword" loading="lazy" />
              <figcaption>Player character concept drawing</figcaption>
            </figure>
            <figure className="reference-board">
              <PortfolioImage src={`${base}last-amber-player-reference-board.png`} alt="Player character visual reference board featuring heavy armour and sword silhouettes" loading="lazy" />
              <figcaption>Player reference board — third-party visual references used during development</figcaption>
            </figure>
          </div>
          <h4>A heavy, grounded fighter who still reads as human</h4>
          <p>Once a royal guard, the protagonist survived the failed ritual and the boss’s massacre. He abandoned that identity to hunt the source of the corruption and seek revenge for the dead.</p>
          <dl><div><dt>Key features</dt><dd>Worn heavy armour, a steady stance and a large sword show that he has survived many fights.</dd></div><div><dt>VFX link</dt><dd>His blade effect is smaller and shorter, with a brighter centre, so the direction of his attack stays clear.</dd></div></dl>
        </article>
        <article className="character-study boss-character">
          <header><p>Boss Character Design</p><h3>Corrupted Guard</h3></header>
          <div className="character-visuals">
            <figure className="character-concept">
              <PortfolioImage src={`${base}last-amber-boss-concept.png`} alt="Horned boss character concept with a corrupted flame-covered arm" loading="lazy" />
              <figcaption>Boss character concept drawing</figcaption>
            </figure>
            <figure className="reference-board boss-reference">
              <PortfolioImage src={`${base}last-amber-boss-reference-board.jpg`} alt="Boss visual reference board with horned armour, red-black corruption and weapon silhouettes" loading="lazy" />
              <figcaption>Boss reference board — third-party visual references used during development</figcaption>
            </figure>
          </div>
          <h4>Black armour and red fire show what the ritual did to him</h4>
          <p>He was the strongest royal guard, but lost control during the ritual. The released power changed his body and mind. He now stays in the hall and attacks his former allies.</p>
          <dl><div><dt>Key features</dt><dd>Uneven horns, black armour and one burning red side make the corruption visible before the fight starts.</dd></div><div><dt>VFX link</dt><dd>Red blade energy, black outer flames and wide attacks make him feel larger and more dangerous than the player.</dd></div></dl>
        </article>
      </div>
      <div className="case-heading">
        <span>VFX development</span>
        <p>The work below shows how I built and changed each effect, from the first test to the version used in the level.</p>
      </div>
      <div className="process-sequence">
        {amberStudies.map((study) => <ProcessStudy study={study} key={study.title} />)}
      </div>
      <section className="process-study project-credits"><header><h3>Handover and credits</h3></header><p>I prepared effect dependencies and usage notes for the team, including how to show and remove the screen mist. The later VFX work, handover and migration checks were completed and tested.</p><p>The custom entrance fog gate was an exploration that was not used in the final game. After a crash caused work to be lost, I stopped rebuilding it within the remaining time.</p><p>Purchased resources include Fog Wall VFX and Blood Magic Skill Vfx Pack. These are third-party assets and are not presented as effects I created from scratch. Team models, animation, programming and collected visual references are also separate from my own VFX work.</p><p>AI tools assisted with visual exploration, some texture work and technical troubleshooting. I made the visual decisions and built and adjusted the materials, Niagara systems and screen-effect components in Unreal Engine.</p></section>
    </article>
    </ProjectPageShell>
  )
}

function ReadyToDie() {
  return <ProjectPageShell nextHref="#/last-amber" nextLabel="Last Amber"><ReadyToDieCase /></ProjectPageShell>
}

function HomePage() {
  return (
    <>
      <Header />
      <main><HomePortfolio /></main>
    </>
  )
}

function getRoute() {
  if (window.location.hash === '#/ready-to-die/credits') return 'ready-to-die-credits'
  if (window.location.hash === '#/last-amber') return 'last-amber'
  if (window.location.hash === '#/ready-to-die') return 'ready-to-die'
  return 'home'
}

function App() {
  const [route, setRoute] = useState(getRoute)

  useEffect(() => {
    const handleRoute = () => setRoute(getRoute())
    window.addEventListener('hashchange', handleRoute)
    return () => window.removeEventListener('hashchange', handleRoute)
  }, [])

  useEffect(() => {
    if (route !== 'home') {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }
    const targetId = window.location.hash.replace('#', '')
    window.requestAnimationFrame(() => {
      const target = targetId && document.getElementById(targetId)
      if (target) target.scrollIntoView({ behavior: 'auto' })
      else window.scrollTo({ top: 0, behavior: 'auto' })
    })
  }, [route])

  return (
    <div className="app">
      {route === 'home' && <HomePage />}
      {route === 'last-amber' && <><Header projectPage /><main><LastAmber /></main></>}
      {route === 'ready-to-die' && <><Header projectPage /><main><ReadyToDie /></main></>}
      {route === 'ready-to-die-credits' && <><Header projectPage /><main className="project-page"><div className="content-shell project-page-content"><ReadyToDieCredits /></div></main></>}
      <footer><span>Zihao Shen</span><span>Game Design Portfolio · 2026</span></footer>
    </div>
  )
}

export default App

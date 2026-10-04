import { useEffect, useRef, useState } from 'react'
import './App.css'

const base = '/ZihaoShen_Hank/assets/portfolio/'

const amberStudies = [
  {
    number: '01',
    title: 'Fog',
    date: '29 Jul–02 Aug 2026',
    status: 'Completed',
    tools: 'Unreal Engine · Niagara',
    images: [
      { src: `${base}last-amber-fog-final.png`, label: 'Final version · dark-red volumetric fog' },
    ],
    goal: 'Make the scene feel darker with fog without hiding routes, enemies or attacks.',
    work: 'I built the smoke effect in Niagara and tested it in the boss arena.',
    process: 'I started with an Unreal Engine texture, built the material in the Material Editor and used Niagara to spread the smoke particles through the scene.',
    problem: 'The first version clashed with the scene lighting and did not feel dark enough.',
    changes: 'I changed the fog to dark red so it matched the lighting already used in the arena.',
    result: 'The dark-red version fits the scene better. A small amount of emissive colour keeps the fog visible in dark areas.',
  },
  {
    number: '02',
    title: 'Blade Light',
    date: '03–10 Aug 2026',
    status: 'Completed',
    tools: 'Unreal Engine · Niagara · Materials',
    images: [
      { src: `${base}last-amber-blade-light-v1.png`, label: 'First version · white-core silhouette test' },
      { src: `${base}last-amber-blade-light-v2.png`, label: 'Second version · fire and edge treatment' },
      { src: `${base}last-amber-blade-light-final.png`, label: 'Final version · red-black palette' },
    ],
    goal: 'Make a flame-like blade trail for both the player and the boss. It needed to show the direction, speed and weight of each attack while matching the scene’s dark-red colour palette.',
    work: 'I made the material, mask texture, mesh and Niagara trail, then adjusted the colour, width, lifetime and movement to fit the attack animation.',
    process: 'I studied reference effects, drew the blade mask, made an emissive material with a bright core and dark-red edge, placed it on a rectangular mesh and used a Niagara Ribbon for the curved trail.',
    problem: 'The first version had broken pieces at the tail, stripes on the right and a grey ghost image. The colour also did not match the scene.',
    changes: 'I rebuilt the texture to remove the stripes and ghost image, then changed the colours to match the final scene.',
    result: 'The final red-and-black version looks more like a corrupted, blood-like blade and is much clearer than the first test.',
    note: 'Player variant: I used the boss effect as a starting point, then reduced its size, brightness, lifetime and curve. The smaller version shows the player’s attack direction without competing with the boss effects.',
  },
  {
    number: '03',
    title: 'Blade Slash',
    date: '11–31 Aug 2026',
    status: 'Completed',
    tools: 'Unreal Engine · Niagara · Materials',
    images: [
      { src: `${base}last-amber-blade-slash-setup.png`, label: 'Attack setup' },
      { src: `${base}last-amber-blade-slash-windup.png`, label: 'Wind-up and range cue' },
      { src: `${base}last-amber-blade-slash-impact.png`, label: 'Impact frame' },
      { src: `${base}last-amber-blade-slash-final.png`, label: 'Final slash integration' },
    ],
    goal: 'Build the boss’s main wide slash. The player needed to see its direction, range and warning before it hit.',
    work: 'I made the Niagara system, materials, textures and blade mesh, then joined the slash, fire and black outer flame into one attack that follows the boss animation.',
    process: 'I made an RGBA mask and an emissive red-and-black material, combined several Niagara emitters and adjusted the spawn settings, mesh size, lifetime and timing.',
    problem: 'Some early tests showed no particles, while others kept repeating. There was also a duplicate Niagara actor, and both Spawn Rate and Spawn Burst were active. The black flame disappeared beside the bright centre, and the effect only looked clear from one camera angle.',
    changes: 'I kept one Spawn Burst, turned off Spawn Rate, removed the duplicate actor and gave the black flame its own translucent material. I also changed the colour, opacity and mesh scale, and made the effect double-sided.',
    result: 'The attack now plays once with the animation. The red blade, fire and black outer flame clearly show the direction, range and power of the attack from different angles.',
  },
  {
    number: '04',
    title: 'AOE Falling Attack',
    date: '10–29 Sep 2026',
    status: 'Current build',
    tools: 'Unreal Engine 5.6 · Niagara · Niagara Fluids · Materials',
    images: [
      { src: `${base}aoe-sequence-01-targeting-columns.png`, label: '01 · Thin targeting columns gather at the centre' },
      { src: `${base}aoe-sequence-02-warning-ring.png`, label: '02 · Warning ring and centre marker appear' },
      { src: `${base}aoe-sequence-03-falling-column.png`, label: '03 · Falling column reaches the marked area' },
      { src: `${base}aoe-sequence-04-ground-impact.png`, label: '04 · Red-and-black energy spreads across the ground' },
    ],
    goal: 'Make a large falling attack that warns the player before impact, then carries the red-and-black energy from the vertical column into a fast ground-level spread.',
    work: 'I built the warning rings, falling column, impact flash, a three-dimensional ground-flare mesh, post-impact volumetric fog and a group of thin targeting columns that spiral into the centre.',
    process: 'The effect starts with the ground warning and thin vertical columns. The columns rotate and move into the centre before the main strike, then the falling column opens into radial ground energy and releases Grid3D Gas fog after impact. Each stage stays in a separate Niagara emitter so I can tune the warning, hit and fade independently.',
    problem: 'A stock cone repeated the texture on every face, while camera-facing sprites and crossed planes looked flat from side angles. The column also needed to bend continuously into the ground spread rather than ending above a separate smoke burst.',
    changes: 'I replaced the cone with a custom cylindrical mesh and used World Position Offset to push its lower vertices outward in 360 degrees. Animated noise breaks the surface into irregular red strands with black gaps. For the targeting stage, I replaced custom HLSL with Niagara curve, lerp and position modules so the columns converge cleanly without a handwritten expression.',
    result: 'The current system compiles and plays as one centred impact. The thin columns meet at the centre at about 0.83–0.90 seconds and disappear at about 1.08–1.12 seconds before the main hit. The system has been saved and migrated with its Niagara Fluids dependency restored. A final boss-arena readability pass and a test away from the world origin are still needed.',
    noteLabel: 'Migration note',
    note: 'The target project must enable Niagara Fluids before migration. Without it, the Grid3D emitters lose their plugin scripts and report unknown-function errors even though the migrated Niagara asset itself is present.',
  },
  {
    number: '05',
    title: 'Better Fog System',
    date: '02–04 Oct 2026',
    status: 'In testing',
    tools: 'Unreal Engine 5.6 · Niagara · Blueprint · Volumetric Fog',
    images: [
      { src: `${base}better-fog-veil.png`, label: 'Main veil texture · broad, low-contrast fog layer' },
      { src: `${base}better-fog-wisps.png`, label: 'Ground wisps texture · narrow moving detail' },
      { src: `${base}better-fog-scene-warm-grey.png`, label: 'Warm-grey test · distant red effects remain visible' },
      { src: `${base}better-fog-scene-dark-red.png`, label: 'Dark-red test · fog changes the scene mood and depth' },
    ],
    goal: 'Build dense environmental fog that feels fine and natural rather than like a group of smoke clouds, while keeping the player and nearby fire readable.',
    work: 'I made the texture set, material instances and a two-emitter Niagara system, then combined it with Exponential Height Fog and Volumetric Fog in a separate test map.',
    process: 'The main atmosphere comes from the engine fog, while Niagara adds a small amount of movement. Fog_MainBody uses large, soft cards. Fog_GroundWisps uses thinner cards close to the ground with slow velocity, drag and a fade at both ends of the particle lifetime.',
    problem: 'The first texture direction looked too much like rolling smoke. A Niagara-only solution also could not create the same depth across the whole level.',
    changes: 'I changed the texture set to a softer veil, narrow ground wisps and low-frequency noise. The test map uses warm grey global fog with low-alpha Niagara layers, so the distant scene fades while nearby torches remain visible.',
    result: 'The two Niagara layers compile and the combined fog is visible in the test map. The reusable Blueprint fade controller has been connected for density and emissive, but its final runtime test, Niagara fade sync and boss-arena tuning are still in progress.',
    noteLabel: 'Current boundary',
    note: 'This is a working environment test, not the final Last Amber arena pass. The current controller starts on BeginPlay; player-entry triggering and cross-project migration still need to be tested.',
  },
]

const readyFoundation = [
  {
    number: '01', eyebrow: 'Player movement', title: 'Build movement the player can rely on',
    copy: 'Before testing death as a mechanic, the platforming had to feel predictable. I built camera-relative movement, smooth facing, run, jump and dash around Unity’s CharacterController.',
    decision: 'A 0.15-second Coyote Time helps when the player jumps just after leaving an edge. Dash duration and cooldown make recovery useful without removing the risk of a jump.',
    outcome: 'The player can read the space, commit to a jump and understand whether a failure came from the level or from their own timing.',
  },
  {
    number: '02', eyebrow: 'Death system', title: 'Save each death and use it again',
    copy: 'Falling below the level or entering a hazard begins one shared death sequence. The system pauses control, records the event, moves the player to the active checkpoint and then restores play.',
    decision: 'Teleporting while CharacterController and leftover velocity were still active caused sliding and repeated deaths. I disabled the controller, cleared the velocity and turned each part back on in a fixed order.',
    outcome: 'Respawning became stable, and the saved death data could also change lighting, level objects and progress.',
  },
]

const readyDeathFlow = [
  { number: '01', title: 'Detect', copy: 'Falling below the level or entering a hazard ends the current attempt.' },
  { number: '02', title: 'Record', copy: 'The system stores the death count and the area in which the player failed.' },
  { number: '03', title: 'Respawn', copy: 'Control pauses, velocity resets and the player returns to the active checkpoint.' },
  { number: '04', title: 'Change the level', copy: 'The level reads the saved death data and makes a visible change.' },
]

const readyWorldResponses = [
  {
    label: 'Mood change', title: 'The world grows darker',
    copy: 'Each death moves the main light and fog further along the same colour gradient. The change happens gradually, so the player returns to a familiar space that now feels darker.',
    result: 'The whole scene shows the growing death count without adding another UI element.',
  },
  {
    label: 'Path change', title: 'Death opens the bridge',
    copy: 'The bridge area records where the player died, not only how many times. Dying in that area triggers the bridge after respawn.',
    result: 'This shows the main idea in one short sequence: a blocked route, a death, a respawn and a new path.',
  },
]

const readyControls = ['WASD · Move', 'Shift · Run', 'Space · Jump', 'E · Dash', 'Mouse · Camera', 'Wheel · Zoom']

const readyBrainstorm = [
  {
    number: '01', title: 'Limited steps', state: 'Kept for the prototype',
    copy: 'The player begins with a fixed movement allowance and must plan a route before it runs out. Optional side interactions could recover steps, turning traversal into a small resource-management puzzle.',
    retained: 'I kept the focus on planning a route, but replaced the step counter with visible changes to the level.',
  },
  {
    number: '02', title: 'Use enemies against each other', state: 'Not used',
    copy: 'In a room of visually similar NPCs, the player cannot attack directly. They identify hostile behaviour, manipulate sight lines and objects, and make one NPC eliminate another.',
    retained: 'I kept the idea of indirect actions and clear cause and effect, but enemy AI was too large for this prototype.',
  },
  {
    number: '03', title: 'Collect items while being chased', state: 'Not used',
    copy: 'A hostile village turns item collection into a timed escape. Each return increases pressure, asking the player to search, improvise and leave before the crowd closes in.',
    retained: 'The rising pressure led to the idea of the world becoming darker. I removed the collection and crowd systems to keep the prototype focused.',
  },
  {
    number: '04', title: 'Run first, fight back later', state: 'Story idea',
    copy: 'A repeating chase changes when the player suddenly receives a weapon. The player moves from running away to fighting back.',
    retained: 'This change helped me treat death as a turning point instead of a normal failure screen.',
  },
  {
    number: '05', title: 'Death, resets and different endings', state: 'System idea',
    copy: 'Early notes tested revival, full resets, shifting universes and multiple endings. Sound-based identification and deliberately difficult routes were also explored as ways to make each attempt carry new information.',
    retained: 'The final prototype keeps the clearest part: the game remembers a death and changes the level after respawn.',
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

function HeroBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frameId
    let width = 0
    let height = 0
    const particles = Array.from({ length: 52 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00022,
      vy: (Math.random() - 0.5) * 0.00022,
      size: Math.random() * 1.7 + 0.4,
      alpha: Math.random() * 0.34 + 0.08,
    }))

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.floor(width * ratio)
      canvas.height = Math.floor(height * ratio)
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const glow = ctx.createRadialGradient(width * 0.68, height * 0.48, 0, width * 0.68, height * 0.48, width * 0.56)
      glow.addColorStop(0, 'rgba(201,168,76,.065)')
      glow.addColorStop(1, 'rgba(10,10,15,0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, width, height)

      particles.forEach((particle) => {
        particle.x = (particle.x + particle.vx + 1) % 1
        particle.y = (particle.y + particle.vy + 1) % 1
        ctx.fillStyle = `rgba(223,189,90,${particle.alpha})`
        ctx.beginPath()
        ctx.arc(particle.x * width, particle.y * height, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      if (!reduceMotion) frameId = window.requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas className="hero-canvas" ref={canvasRef} aria-hidden="true" />
}

function Hero() {
  return (
    <section className="hero" id="top">
      <img className="hero-project-image" src={`${base}last-amber-blade-slash-final.png`} alt="Last Amber boss blade slash effect inside Unreal Engine" />
      <HeroBackground />
      <div className="hero-shade" />
      <div className="hero-content">
        <p className="hero-kicker">Game Design Portfolio · 2026</p>
        <h1 className="hero-name">Zihao Shen</h1>
        <p className="hero-role">Game Designer · Real-time VFX Artist</p>
        <p className="hero-description">I make gameplay systems, level prototypes and real-time effects that are easy for players to understand.</p>
        <div className="hero-actions">
          <a className="primary-button" href="#work">View selected work <span>→</span></a>
          <a className="secondary-button" href="#about">About</a>
        </div>
      </div>
      <p className="hero-caption">Last Amber — blade slash integration</p>
    </section>
  )
}

function WorkIndex() {
  return (
    <section className="work-index section" id="work">
      <div className="section-kicker">Selected work</div>
      <div className="section-intro">
        <h2>Two projects, from early ideas to working builds.</h2>
        <p>Last Amber focuses on real-time effects for a boss fight. Ready to Die is a Unity prototype where death changes the level.</p>
      </div>
      <div className="project-showcase">
        <article className="featured-project">
          <a className="featured-project-media" href="#/last-amber" aria-label="Open Last Amber case study">
            <img src={`${base}last-amber-blade-slash-final.png`} alt="Last Amber final blade slash effect" />
            <span>Featured project</span>
          </a>
          <div className="featured-project-copy">
            <div className="featured-project-title"><span className="card-type">Unreal Engine 5 · Team Project</span><h3>Last Amber</h3></div>
            <div className="featured-project-summary">
              <dl>
                <div><dt>My role</dt><dd>Real-time VFX artist</dd></div>
                <div><dt>Main challenge</dt><dd>Keep attacks easy to see inside a dark, fog-heavy boss fight.</dd></div>
                <div><dt>What I made</dt><dd>Fog, blade light and blade slash are in the level. The current AOE build combines a falling column, radial ground flare and volumetric impact fog.</dd></div>
              </dl>
              <a className="case-link" href="#/last-amber">View full case study <span>→</span></a>
            </div>
          </div>
        </article>
        <article className="secondary-project">
          <a className="secondary-project-media" href="#/ready-to-die" aria-label="Open Ready to Die case study">
            <img src={`${base}ready-to-die-player-view.png`} alt="Ready to Die greybox prototype viewed from behind the player character" />
          </a>
          <div className="secondary-project-copy">
            <span className="card-type">Unity · Gameplay Systems</span>
            <h3>Ready to Die</h3>
            <p>A playable tutorial-level greybox where the game remembers a death, respawns the player and opens one new route.</p>
            <a className="case-link" href="#/ready-to-die">View case study <span>→</span></a>
          </div>
        </article>
      </div>
    </section>
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
      <div className="project-page-aura" aria-hidden="true"><HeroBackground /><div className="project-page-shade" /></div>
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
  const details = [
    ['Goal', study.goal],
    ['My work', study.work],
    ['Process', study.process],
    ['Problem', study.problem],
    ['Modification', study.changes],
    ['Result', study.result],
  ]

  return (
    <section className={`process-study${compact ? ' compact' : ''}${study.title === 'AOE Falling Attack' ? ' aoe-sequence-study' : ''}${study.title === 'Better Fog System' ? ' better-fog-study' : ''}`}>
      <header className="process-study-header">
        <div><p>{study.tools}</p><h3>{study.title}</h3></div>
        <div className="process-status"><span>{study.date}</span><strong className={study.status.toLowerCase().includes('progress') ? 'progress' : ''}>{study.status}</strong></div>
      </header>
      {study.images && (
        <div className={`process-gallery gallery-${Math.min(study.images.length, 4)}`}>
          {study.images.map((image) => (
            <figure key={image.src}>
              <img src={image.src} alt={`${study.title} — ${image.label}`} loading="lazy" />
              <figcaption>{image.label}</figcaption>
            </figure>
          ))}
        </div>
      )}
      <dl className="process-details">
        {details.map(([label, copy]) => <div key={label}><dt>{label}</dt><dd>{copy}</dd></div>)}
      </dl>
      {study.note && <aside className="process-note"><span>{study.noteLabel || 'Player version'}</span><p>{study.note.replace('Player variant: ', '')}</p></aside>}
    </section>
  )
}

function LastAmber() {
  return (
    <ProjectPageShell nextHref="#/ready-to-die" nextLabel="Ready to Die">
    <article className="project section project-detail" id="last-amber">
      <ProjectHeader title="Last Amber" discipline="Real-time VFX · Team Project" />
      <div className="project-intro">
        <div className="intro-lead"><p>A short boss fight in a gothic hall, with clear combat effects, dark fog and red fire.</p></div>
        <dl className="facts">
          <div><dt>Engine</dt><dd>Unreal Engine 5.6.1</dd></div>
          <div><dt>Platform</dt><dd>PC</dd></div>
          <div><dt>Length</dt><dd>5–10 minute encounter</dd></div>
          <div><dt>My role</dt><dd>VFX Artist</dd></div>
        </dl>
      </div>
      <figure className="project-opening-media">
        <img src={`${base}last-amber-blade-slash-final.png`} alt="Final red-black blade slash effect in the Last Amber encounter" />
        <figcaption>Current Unreal Engine capture — final blade slash integration</figcaption>
      </figure>
      <div className="case-heading">
        <span>Scene design</span>
        <p>The boss fight takes place in a corrupted gothic throne hall. The room is symmetrical, with an open circular floor and the throne at the far end. Red light from the stained glass makes the room feel dangerous without hiding the attacks.</p>
      </div>
      <section className="environment-study">
        <figure className="environment-sketch">
          <img src={`${base}last-amber-scene-design.png`} alt="Gothic throne hall environment sketch" loading="lazy" />
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
        <img src={`${base}last-amber-environment-reference-board.jpg`} alt="Environment visual reference board with gothic halls, arenas and moonlit spaces" loading="lazy" />
        <figcaption>Environment reference board — visual references collected during development</figcaption>
      </figure>

      <div className="case-heading">
        <span>Character design</span>
        <p>The two characters come from the same group of royal guards. The Witcher survived the ritual, while the corrupted guard became the boss. This difference guided the size, colour and movement of their effects.</p>
      </div>
      <div className="character-studies">
        <article className="character-study player-character">
          <header><p>Player Character Design</p><h3>Witcher</h3></header>
          <div className="character-visuals">
            <figure className="character-concept">
              <img src={`${base}last-amber-player-concept.png`} alt="Player character concept line drawing with heavy armour and an oversized sword" loading="lazy" />
              <figcaption>Player character concept drawing</figcaption>
            </figure>
            <figure className="reference-board">
              <img src={`${base}last-amber-player-reference-board.png`} alt="Player character visual reference board featuring heavy armour and sword silhouettes" loading="lazy" />
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
              <img src={`${base}last-amber-boss-concept.png`} alt="Horned boss character concept with a corrupted flame-covered arm" loading="lazy" />
              <figcaption>Boss character concept drawing</figcaption>
            </figure>
            <figure className="reference-board boss-reference">
              <img src={`${base}last-amber-boss-reference-board.jpg`} alt="Boss visual reference board with horned armour, red-black corruption and weapon silhouettes" loading="lazy" />
              <figcaption>Boss reference board — third-party visual references used during development</figcaption>
            </figure>
          </div>
          <h4>Black armour and red fire show what the ritual did to him</h4>
          <p>He was the strongest royal guard, but lost control during the ritual. The released power changed his body and mind. He now stays in the hall and attacks his former allies.</p>
          <dl><div><dt>Key features</dt><dd>Uneven horns, black armour and one burning red side make the corruption visible before the fight starts.</dd></div><div><dt>VFX link</dt><dd>Red blade energy, black outer flames and wide attacks make him feel larger and more dangerous than the player.</dd></div></dl>
        </article>
      </div>
      <aside className="authorship-note"><span>My role</span><p>The scene and character concepts show the team’s shared art direction. My own work is the real-time VFX shown below, including the fog, blade effects and the current AOE build.</p></aside>
      <div className="case-heading">
        <span>VFX development</span>
        <p>The work below shows how I built and changed each effect, from the first test to the version used in the level.</p>
      </div>
      <div className="process-sequence">
        {amberStudies.map((study) => <ProcessStudy study={study} key={study.title} />)}
      </div>
    </article>
    </ProjectPageShell>
  )
}

function ReadyToDie() {
  return (
    <ProjectPageShell nextHref="#/last-amber" nextLabel="Last Amber">
    <article className="project section project-detail" id="ready-to-die">
      <ProjectHeader title="Ready to Die" discipline="Gameplay Systems · Level Prototype" />
      <div className="project-intro">
        <div className="intro-lead"><p>A one-level third-person platforming prototype that asks a simple question: what if failure changed the level instead of erasing progress?</p></div>
        <dl className="facts">
          <div><dt>Engine</dt><dd>Unity 6000.4.0f1</dd></div>
          <div><dt>Platform</dt><dd>PC</dd></div>
          <div><dt>State</dt><dd>Playable tutorial-level prototype</dd></div>
          <div><dt>My role</dt><dd>Concept, systems, level blockout</dd></div>
        </dl>
      </div>
      <section className="ready-thesis">
        <span>Design question</span>
        <div>
          <h3>How can death become a tool for progress?</h3>
          <p>Most platformers reset the player after death. In Ready to Die, the game remembers where the player died, sends them back to a checkpoint and changes the next attempt. The prototype tests this idea with one short playable level.</p>
        </div>
      </section>
      <div className="loop" aria-label="Core gameplay loop">
        {['Explore', 'Die', 'Respawn', 'World changes', 'New route'].map((step, index) => (
          <div key={step}><strong>{step}</strong>{index < 4 && <b aria-hidden="true">→</b>}</div>
        ))}
      </div>
      <figure className="prototype-media">
        <img src={`${base}ready-to-die-player-view.png`} alt="Ready to Die greybox prototype viewed from behind the player character" loading="lazy" />
        <figcaption>Player view in the current Unity greybox</figcaption>
      </figure>
      <div className="case-heading">
        <span>Building the prototype</span>
        <p>I started with two basic systems: movement that felt predictable and one death event that the rest of the level could use.</p>
      </div>
      <div className="ready-foundation">
        {readyFoundation.map((item) => (
          <section key={item.title}>
            <header><p>{item.eyebrow}</p></header>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
            <dl>
              <div><dt>Design decision</dt><dd>{item.decision}</dd></div>
              <div><dt>Why it matters</dt><dd>{item.outcome}</dd></div>
            </dl>
          </section>
        ))}
      </div>
      <div className="ready-controls" aria-label="Prototype controls">
        <span>Playable controls</span>
        <ul>{readyControls.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>

      <div className="case-heading">
        <span>How death works</span>
        <p>The death system has four steps. Keeping each step separate made it easier to test and change.</p>
      </div>
      <div className="ready-pipeline">
        {readyDeathFlow.map((step) => (
          <section key={step.title}>
            <h3>{step.title}</h3><p>{step.copy}</p>
          </section>
        ))}
      </div>

      <div className="case-heading">
        <span>Map preview</span>
        <p>These Unity Scene views show the same route before and after a recorded death changes the level.</p>
      </div>
      <section className="ready-map-preview" aria-label="Ready to Die map state comparison">
        <figure>
          <img src={`${base}ready-to-die-map-before-death.png`} alt="Unity Scene view of the route before death, with a gap between platforms" loading="lazy" />
          <figcaption><strong>Before death</strong><span>The route is broken and cannot be crossed.</span></figcaption>
        </figure>
        <figure>
          <img src={`${base}ready-to-die-map-after-death.png`} alt="Unity Scene view of the route after death, with the bridge section enabled" loading="lazy" />
          <figcaption><strong>After death</strong><span>The bridge section is enabled and opens the next route.</span></figcaption>
        </figure>
      </section>
      <p className="ready-map-note">Development view: the yellow colour in the second image is Unity’s selection highlight, not the final appearance of the level.</p>

      <div className="case-heading">
        <span>Changes in the level</span>
        <p>The same saved death can change the mood of the level or open a new path.</p>
      </div>
      <div className="ready-responses">
        {readyWorldResponses.map((response) => (
          <section key={response.title}>
            <span>{response.label}</span>
            <h3>{response.title}</h3>
            <p>{response.copy}</p>
            <div><strong>Result</strong><p>{response.result}</p></div>
          </section>
        ))}
      </div>

      <div className="case-heading ready-brainstorm-heading">
        <span>Early ideas</span>
        <p>I explored five ways that failure could change the game, then chose the one idea I could build and test clearly.</p>
      </div>
      <div className="ready-brainstorm">
        {readyBrainstorm.map((idea) => (
          <article key={idea.number}>
            <header><strong>{idea.state}</strong></header>
            <h3>{idea.title}</h3>
            <p>{idea.copy}</p>
            <div><b>What I kept</b><p>{idea.retained}</p></div>
          </article>
        ))}
      </div>
      <aside className="scope-note brainstorm-note">
        <span>Not in the build</span>
        <p>These boards show early ideas, not finished features. The current prototype does not include NPC combat, collectibles, advertising, multiple endings or several finished levels. It only tests the death, respawn and level-change loop shown above.</p>
      </aside>

      <section className="ready-resolution">
        <span>Current build</span>
        <div>
          <h3>One tutorial level built to test the mechanic</h3>
          <p>The current prototype connects movement, death, respawn, lighting changes and the bridge inside one short tutorial level. A scene transition exists as a technical test, but the project does not contain a finished second level.</p>
        </div>
        <div>
          <h3>What I learned</h3>
          <p>The idea became clearer when I removed extra features. Saving the place where the player died made the bridge change easy to understand, while the lighting and fog showed the same rule across the whole level.</p>
        </div>
      </section>
      <aside className="scope-note">
        <span>Next steps</span>
        <p>Next, I would test whether players choose to die after learning the rule, make the link between each death area and its change more obvious, and add more than one useful change to the next scene.</p>
      </aside>
    </article>
    </ProjectPageShell>
  )
}

function About() {
  return (
    <section className="about section" id="about">
      <div className="section-kicker">About</div>
      <div className="about-grid">
        <h2>Gameplay systems, level prototypes and real-time VFX.</h2>
        <div>
          <p>I am a third-year Game Design student at RMIT University. In Last Amber, I developed blade effects, a multi-stage AOE attack and environmental fog tests in Unreal Engine. In Ready to Die, I built one tutorial-level Unity prototype around movement, death, respawn and a death-triggered bridge.</p>
          <a className="text-link" href="https://github.com/even002" target="_blank" rel="noreferrer">View GitHub <ArrowIcon /></a>
        </div>
      </div>
    </section>
  )
}

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="content-shell">
          <WorkIndex />
          <About />
        </div>
      </main>
    </>
  )
}

function getRoute() {
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
      <footer><span>Zihao Shen</span><span>Game Design Portfolio · 2026</span></footer>
    </div>
  )
}

export default App

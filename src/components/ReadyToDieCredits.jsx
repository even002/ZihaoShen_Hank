import './ReadyToDieCredits.css'

const unity = 'https://assetstore.unity.com/packages/'
const fab = 'https://www.fab.com/listings/'
const assets = [
  ['Low Poly Simple Furniture FREE', 'Gobormu', 'Furniture in the tutorial and offices.', `${unity}3d/props/furniture/low-poly-simple-furniture-free-240197`, 'Unity Asset Store'],
  ['Low Poly Industrial Pack - LITE', 'Tyuris', 'Industrial buildings, pipes, valves and maintenance platforms.', `${unity}3d/environments/industrial/low-poly-industrial-pack-lite-402518`, 'Unity Asset Store'],
  ['Apocalypse FREE - Low Poly Asset Pack', 'ithappy', 'Player, boss, bodies, dogs, props and character animations. Project copies include animation setup, poses and material adjustments.', `${unity}3d/characters/apocalypse-free-low-poly-asset-pack-401152`, 'Unity Asset Store'],
  ['Low-poly city asset pack', 'Stokion', 'City buildings and distant scenery. Models were scaled and placed for the levels; some roof geometry was adapted to the platform layout.', `${fab}8bcb58cd-7afd-4840-9894-a0381a1e7f6d`, 'CC BY 4.0'],
  ['A.U.R.W. URP Free', 'The Phantom Studios', 'Water surfaces, with project-specific materials and settings.', `${unity}vfx/shaders/a-u-r-w-urp-free-195139`, 'Unity Asset Store'],
  ['Human Soldier Animations FREE', 'Kevin Iglesias', 'Pistol aiming, shooting, reloading and hand poses, retargeted to the ithappy character.', `${unity}3d/animations/human-soldier-animations-free-340690`, 'Unity Asset Store'],
  ['Low Poly Weapons Set', 'MR POLY', 'The Tactical Pistol (Black) used by the player and boss, and as a pickup. Material references were repaired and adapted for URP.', `${fab}47827bc6-d20b-4567-b6e1-4650f5bc8057`, 'Fab'],
  ['Ammo Box', 'Beatheart Creative Studio', 'Ammo supplies in the floodgate and final levels, with project-made material copies and lid feedback.', `${unity}3d/props/weapons/ammo-box-7701`, 'Unity Asset Store'],
]
const audio = [
  ['9mm pistol shot', 'michorvath', '427592', 'Gunfire'],
  ['Reload Pistol.mp3', 'baconandbeans', '609667', 'Reloading'],
  ['footsteps on surfaced road in boots', 'Frigus_XIII', '456428', 'Footsteps'],
  ['Small_Flashlight_Click_on_01.wav', 'Rudmer_Rotteveel', '457458', 'Switches'],
  ['ItemPickup.wav', 'nicholasdaryl', '563465', 'Item pickup'],
  ['Explosion_01.wav', 'tommccann', '235968', 'Explosion'],
  ['Dog Growl - Beast / Creature', 'coldvet', '404920', 'Dog growls'],
  ['door - open 01.wav', 'Anthousai', '398750', 'Doors'],
  ['Short Male Pain Grunts', 'unfa', '610991', 'Injury voices'],
  ['Gentle Ocean Waves Loop', 'kkenny101', '852826', 'Water ambience'],
  ['Gentle wind', 'fthgurdy', '528944', 'Wind ambience'],
  ['peaceful ambient pad', 'jjwoosh', '743772', 'Final corridor music'],
]
function SourceLink({ href, children }) {
  return <a href={href} target="_blank" rel="noreferrer">{children} <span aria-hidden="true">↗</span><span className="credits-sr-only"> (opens in a new tab)</span></a>
}

export default function ReadyToDieCredits() {
  return (
    <article className="rtd-credits" lang="en">
      <a className="text-link" href="#/ready-to-die">← Back to Ready to Die</a>
      <header className="rtd-credits-heading">
        <p>Ready to Die</p>
        <h1>Assets and credits</h1>
        <p>The models, animations and recordings used in the game, alongside my own work and the role of AI.</p>
      </header>
      <section aria-labelledby="credits-authorship">
        <h2 id="credits-authorship">My work and AI assistance</h2>
        <p>All creative ideas and design concepts for Ready to Die are my own. I designed the gameplay, levels, progression and ending, and decided how the game should look, sound and feel.</p>
        <p>I used AI to help turn those ideas into a working game: writing and revising code, troubleshooting problems, and assisting with scene and visual production. I set the direction, reviewed the results and decided what to keep or change.</p>
        <p>The third-party work below belongs to its original creators. Adapting an asset for my game does not make its model, animation or recording my own.</p>
      </section>
      <section aria-labelledby="credits-assets">
        <h2 id="credits-assets">Models, environments and animation</h2>
        <p>Each title links to its source listing. Unity Asset Store assets follow their recorded Asset Store licence. The city pack uses <SourceLink href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</SourceLink>. See the Fab listing and acquisition terms for the weapon pack.</p>
        <ul className="rtd-credit-list">
          {assets.map(([title, author, use, href, source]) => <li key={title}>
            <h3><SourceLink href={href}>{title}</SourceLink></h3>
            <p className="rtd-credit-byline">{author} · {source}</p>
            <p>{use}</p>
          </li>)}
        </ul>
      </section>
      <section aria-labelledby="credits-audio">
        <h2 id="credits-audio">Sound and music</h2>
        <p>These recordings were sourced from Freesound and recorded in the project’s source log as <SourceLink href="https://creativecommons.org/publicdomain/zero/1.0/">CC0 1.0</SourceLink>. The links below open the individual recordings.</p>
        <ul className="rtd-credit-list rtd-audio-list">
          {audio.map(([title, author, id, use]) => <li key={id}>
            <h3><SourceLink href={`https://freesound.org/people/${author}/sounds/${id}/`}>{title}</SourceLink></h3>
            <p className="rtd-credit-byline">{author} · {use}</p>
          </li>)}
        </ul>
        <p>The game uses edited public HQ MP3 previews, not the original lossless downloads. Clips were trimmed and their levels adjusted; footsteps and injury sounds were split into variations, and ambience was prepared for looping.</p>
      </section>
      <nav className="case-navigation" aria-label="Credits navigation">
        <a href="#/ready-to-die">← Back to Ready to Die</a>
        <a href="#work">All selected work →</a>
      </nav>
    </article>
  )
}

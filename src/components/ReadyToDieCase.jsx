import './ReadyToDieCase.css'

const media = '/ZihaoShen_Hank/assets/portfolio/'
const chapters = [['overview','Overview'],['tutorial','Tutorial'],['level-one','Level 1'],['death-progress','Death & progress'],['level-two','Level 2'],['iteration','Development notes'],['status','Current progress'],['credits','My role & credits']]

function Shot({ number, title, note, src }) {
  return <figure className="rtd-shot">
    {src ? <a className="rtd-image-link" href={`${media}${src}`} target="_blank" rel="noreferrer" aria-label={`View full image: ${title} (new tab)`}><img src={`${media}${src}`} alt={title} loading="lazy" /></a> : <div className="rtd-placeholder"><span>Screenshot · {number}</span><strong>{title}</strong><p>{note}</p><small>Gameplay screenshot to be added</small></div>}
    <figcaption><strong>{title}</strong>{src && <span>{note}</span>}</figcaption>
  </figure>
}
function Gallery({ title, images }) {
  return <section className="rtd-gallery"><h4>{title}</h4><div className={`rtd-gallery-images rtd-gallery-${images.length}`}>
    {images.map(([file, caption]) => <Shot key={file} src={`ready-to-die-${file}.png`} title={caption} />)}
  </div></section>
}
function Chapter({ id, number, title, children }) {
  return <section className="rtd-chapter" id={`rtd-${id}`}><header><span>{number}</span><h3>{title}</h3></header>{children}</section>
}
function Flow({ steps }) {
  return <ol className="rtd-flow">{steps.map((step,i)=><li key={step}><span>{String(i+1).padStart(2,'0')}</span>{step}</li>)}</ol>
}
const milestones = [
  ['20 Oct','Planning the game','Chose death as the main theme. Left the revival minigame for later so I could focus on the main levels first.'],
  ['21 Oct','Building Level 1','Blocked out the hall, the parkour route on the right and the offices on the left. The offices connect to the hall through one central doorway.'],
  ['22–23 Oct','Adding the interactions','Adjusted movement and added collapsing platforms, pickups, power, the computer, the safe, bomb assembly, the breakable wall and the door.'],
  ['24 Oct','Building Level 2','Connected the first level to the second, blocked out the floodgate area and added two parkour sections.'],
  ['25 Oct','Adding platform supports','Added bases, columns and side walls to bring the parkour areas closer to the reference image.'],
]
const status = [
  ['Tutorial','Prototype built','Movement, death and respawning work. Dying in a specific area makes a bridge appear.'],
  ['Level 1','Main interactions built','Item collection, power, the computer, the safe, crafting, the wall and the door are implemented. A full playthrough still needs testing.'],
  ['Level transition','Connected and tested','The opening in the wall leads from Level 1 to Level 2.'],
  ['Level 2','Whitebox','The floodgate route and two parkour sections are built. Shooting interactions are not implemented yet.'],
  ['Weapons, enemies and ammo','Not built yet','The layout leaves room for these, but their gameplay systems are still to be made.'],
  ['Final boss and ending','Planned','These will have their own level. Work on that scene has not started.'],
  ['Revival minigame','For later','A simple 2D minigame is planned, where completing it earns a revival coin.'],
  ['Changes to the hall','Concept agreed','The hall will change from worn and rusty to intact after death. This will be built once the assets are chosen.'],
]

export default function ReadyToDieCase() {
  return <article className="project section project-detail rtd-case" id="ready-to-die" lang="en">
    <div className="project-heading"><div><p>Unity · Third-person · Parkour & puzzles</p><h2>Ready to Die</h2></div></div>
    <div className="rtd-intro" id="rtd-overview"><h3>A third-person game<br />about death</h3><div><p>Ready to Die is a Unity game I am making about finding a way through a flooded city. Players jump between platforms, search for items and solve puzzles. I want them to return after death and find something that was not there before: a bridge, a path or a new clue.</p><p>So far, I have built the tutorial, the main interactions in Level 1 and a whitebox for Level 2. The game is still in development. Shooting and the final boss level are next.</p></div></div>
    <dl className="rtd-facts"><div><dt>Engine</dt><dd>Unity 6000.4.0f1</dd></div><div><dt>Platform</dt><dd>PC</dd></div><div><dt>Status</dt><dd>In development</dd></div><div><dt>Gameplay</dt><dd>Death, parkour, item collection and puzzles</dd></div></dl>
    <nav className="rtd-index" aria-label="Case study sections">{chapters.map(([id,label])=><button type="button" onClick={() => document.getElementById(`rtd-${id}`)?.scrollIntoView({ behavior: 'smooth' })} key={id}>{label}</button>)}</nav>
    <Shot src="ready-to-die-player-view.png" title="An early view of the tutorial" note="The player's view in the early whitebox, before replacing the placeholder assets." />
    <Chapter id="tutorial" number="01" title="Tutorial: a bridge appears after death">
      <p>The player wakes up with no memory in a small rooftop room. Outside, seawater has covered the city, leaving a route across the rooftops. At the end is a gap that is too wide to jump. After dying here and respawning on the starting roof, the player finds a bridge across it.</p>
      <Flow steps={['Explore the rooftops','Reach an impossible gap','Die in the marked area','Respawn on the starting roof','Find the new bridge']} />
      <div className="rtd-grid"><Shot src="ready-to-die-map-before-death.png" title="Before death: no way across" note="An overhead view of the tutorial in Unity." /><Shot src="ready-to-die-map-after-death.png" title="After respawning: a bridge appears" note="The yellow highlight is Unity's selection outline." /></div>
      <p>I placed a separate death trigger below the gap. Only dying in this area makes the bridge appear; falling elsewhere does not trigger the change. When the player respawns, their movement velocity resets so they do not keep sliding or falling.</p>
      <aside className="rtd-note">An early version changed the sky and lighting colours after death. I also want rooms, objects and paths to change, so returning to a place feels different from the first visit.</aside>
    </Chapter>
    <Chapter id="level-one" number="02" title="Level 1: find the parts and assemble a bomb">
      <p>After the tutorial, the player enters a building. An assembly table sits in the central hall, and a wall blocks the exit. The player needs Material B from the route on the right and a timer from the offices on the left. Back in the hall, they combine the two into a bomb to open the exit.</p>
      <Shot src="ready-to-die-level-one-overview.png" title="Level 1 layout" note="The whitebox in Unity. The central hall connects the offices and the parkour route." />
      <div className="rtd-grid rtd-cards"><section><span className="rtd-tag">Right: parkour</span><h4>Platforms collapse after one second</h4><p>The platforms sit above toxic water, so falling means death. Some collapse one second after the player steps on them. Jumping away does not stop the countdown. Material B is at the end of this route.</p><p>Before collecting Material B, dying restores the platforms for another attempt. Once the item is collected, the player keeps it after death and the platforms no longer reset.</p></section><section><span className="rtd-tag">Left: offices</span><h4>Restore power and find the code</h4><p>The timer is locked in a safe, and its code is in a folder on the office computer. The computer starts without power. The player must find a fuse and install it in the electrical panel first.</p><p>I wanted the player to search between several rooms, so I did not add another shortcut through the offices. After collecting the timer, they return to the hall through the central doorway.</p></section></div>
      <Flow steps={['Find the fuse','Restore power','Open the computer folder','Read the safe code','Unlock the safe and take the timer','Return to the hall and assemble the bomb']} />
      <Gallery title="Before and after the platforms collapse" images={[[ 'platforms-before', 'The platforms form a route along the wall.' ], [ 'platforms-after', 'The platforms the player stepped on have disappeared.' ]]} />
      <Gallery title="Finding the fuse and restoring power" images={[[ 'fuse', 'The fuse inside a room.' ], [ 'power-off', 'A red light shows that power is off.' ], [ 'power-on', 'The light turns green after the fuse is installed.' ]]} />
      <Gallery title="Turning on the computer" images={[[ 'computer-off', 'The computer has no power.' ], [ 'computer-on', 'The screen lights up once power is restored.' ], [ 'computer-desktop', 'On the desktop, the player can open Office Records.' ]]} />
      <Gallery title="Opening the safe and collecting the timer" images={[[ 'safe-closed', 'The locked safe.' ], [ 'safe-keypad', 'Enter the code found on the computer.' ], [ 'safe-timer', 'The open safe reveals the timer.' ]]} />
      <h4>The computer and safe interfaces</h4><p>I used Canvas to create the computer desktop, folder window and safe keypad. The player opens Office Records to find the code, then enters it at the safe to collect the timer.</p>
      <h4>A door unlocked from the inside</h4><p>A door at the end of the parkour route leads back to the hall. It cannot be unlocked from the hall side: the player must finish the route and unlock it from inside. After that, they can push it open with their body. It slowly closes on its own but stays unlocked. If the player dies after collecting Material B but before unlocking the door, they can still continue without returning for the item.</p>
      <div className="rtd-grid"><Shot src="ready-to-die-assembly-table.png" title="Assembling the bomb" note="Bring Material B and the timer back to the table, then press F to assemble them." /><Shot src="ready-to-die-push-door.png" title="Pushing through the unlocked door" note="Once unlocked from inside, the door can be pushed open and does not lock again." /></div>
    </Chapter>
    <Chapter id="death-progress" number="03" title="The explosion and the next respawn">
      <p>Placing the bomb starts a three-second countdown. At first, movement was locked during this time. I removed that restriction so the player can try to run away. The explosion still kills them, however far they move. After respawning, they find the wall has opened and can leave Level 1.</p>
      <div className="rtd-wall-story">
        <Shot src="ready-to-die-wall-before.png" title="Placing the bomb" note="After assembly, the player brings the bomb to the blocked exit." />
        <div className="rtd-wall-transition"><span aria-hidden="true">↓</span><div><h4>Three seconds until the explosion</h4><p>The player can move during the countdown. The explosion kills them, and they return here after respawning.</p></div></div>
        <Shot src="ready-to-die-wall-after.png" title="After respawning, the exit is open" note="The opening stays in place and leads to Level 2." />
      </div>
      <div className="rtd-grid rtd-cards"><section><h4>Keeping progress after death</h4><p>I do not want players to find the fuse and look up the code every time they die. Collected items stay with them, the power stays on, and the safe and wall remain open.</p><small>This progress currently lasts through respawns in the same scene. Saving after quitting the game is not implemented yet.</small></section><section><h4>A different hall after respawning</h4><p>I want the hall to look worn and rusty on the first visit. After the explosion and respawn, it would look clean and intact. The layout would be familiar, but the room would no longer look like the place the player just left.</p><small>This is still planned. Once I choose the assets, I will replace the wall surfaces, lighting, furniture and other props together.</small></section></div>
    </Chapter>
    <Chapter id="level-two" number="04" title="Level 2: parkour and shooting at the floodgate">
      <p>A passage leads out of the first building to an outdoor floodgate area. I want players to see the control hub on the far side as soon as they arrive, so they know where they are heading. Water blocks the direct path, forcing them to take a longer route around it.</p>
      <p>This level is planned to introduce a pistol for breaking bridge chains and fighting enemies. Combat will take place on large platforms, with parkour and ammunition supplies between encounters. Enemies will not attack during jumps; the next fight starts after the player lands.</p>
      <Flow steps={['See the control hub','Pick up the pistol','Shoot to lower a bridge','Lower platform fight','Parkour A and ammo','Middle platform fight','Parkour B','Upper fight and bridge','Exit to the final level']} />
      <aside className="rtd-note">The route and parkour whitebox are built. Weapons, enemies, ammunition and shooting interactions are not implemented yet. For now, the bridges can be crossed directly.</aside>
      <Shot number="10" title="Level 2 layout" note="An overhead view showing the entrance, destination and route between them." />
      <div className="rtd-grid rtd-cards"><section><span className="rtd-tag">Parkour A</span><h4>Three consecutive jumps</h4><p>Three 3 × 3 metre platforms are slightly offset, with small changes in height. The player adjusts direction between jumps and lands near the stairs. Their size follows the platforms in Level 1.</p></section><section><span className="rtd-tag">Parkour B</span><h4>Jumping up to the next floor</h4><p>Four 4 × 4 metre platforms rise by about 0.6 metres each. I kept the gaps shorter than the level jumps because the player is also gaining height. A short staircase connects the last landing to the upper platform.</p></section></div>
      <div className="rtd-grid"><Shot number="11" title="The first parkour blockout" note="The jumping platforms before bases and supports were added." /><Shot number="12" title="With bases and supports" note="The updated platforms with their bases, columns and walls." /></div>
    </Chapter>
    <Chapter id="iteration" number="05" title="Recent changes">
      <div className="rtd-grid rtd-cards"><section><h4>Jumping and dashing</h4><p>Movement in the air was too loose, and the gravity and jump distance did not feel right. I adjusted air steering, gravity and falling speed. Dashing sometimes sent the character diagonally forwards, so I changed it to follow the direction they face. Walking, running, jumping and dashing are all still available.</p><small>These changes came from problems I noticed while playing. I still need feedback from other players.</small></section><section><h4>The crafting message</h4><p>Crafting the bomb used to display a huge ASSEMBLED label across the hall. I replaced it with a short message at the bottom of the screen that disappears after a few seconds.</p></section></div>
      <ol className="rtd-timeline">{milestones.map(([date,title,copy])=><li key={date}><time>{date}</time><div><h4>{title}</h4><p>{copy}</p></div></li>)}</ol>
      <details className="rtd-early"><summary>Other ideas I considered</summary><p>Early ideas included limiting the number of steps, making enemies attack each other, searching for items while being chased, and escaping before finding a weapon to fight back. I also considered multiple worlds and endings. I decided to focus on changes after death first, so these other ideas have not been built.</p><p>The office puzzle originally involved staff records and identity checks. The current version is simpler: find a fuse, turn on the computer, read the code and collect the timer from the safe.</p></details>
    </Chapter>
    <Chapter id="status" number="06" title="Current progress">
      <div className="rtd-status-table" role="region" aria-label="Feature progress" tabIndex="0"><table><thead><tr><th>Feature</th><th>Status</th><th>Details</th></tr></thead><tbody>{status.map(([name,state,note])=><tr key={name}><th scope="row">{name}</th><td>{state}</td><td>{note}</td></tr>)}</tbody></table></div>
      <h4>What has been tested</h4><p>Individual checks covered incorrect safe codes, consuming materials when crafting, preventing duplicate pickups, keeping progress after death and blocking attempts to unlock the door from outside. Level 2 also had nine simulated jumps using the character's current movement settings, checking collisions and landings. All reached their targets without dashing.</p><p>These were individual checks in the editor, not a complete manual playthrough. I still need to play through each level to check camera obstruction, difficult jumps and places where the route is unclear.</p>
      <h4>What comes next</h4><p>The next tasks are shooting and enemies in Level 2, followed by the final boss level and story ending. The revival minigame comes after those: players would complete a simple 2D game to earn a revival coin. I have considered sharing three chances across all three levels, but have not decided where the player restarts when these run out. Final assets, environmental changes and full playtesting are also still ahead.</p>
    </Chapter>
    <Chapter id="credits" number="07" title="My role and asset credits">
      <p>I developed the game concept, level flow, puzzle design and most of the Level 1 whitebox. I work in Unity, try the interactions and adjust them based on what I find. I used AI assistance for code, parts of the interaction UI and the Level 2 whitebox.</p><p>The layout reference images were AI-generated; the actual scenes still needed building and adjusting in Unity. The computer currently uses a Windows default wallpaper. Most of the environment is still whitebox geometry and will be replaced with final assets.</p>
    </Chapter>
  </article>
}

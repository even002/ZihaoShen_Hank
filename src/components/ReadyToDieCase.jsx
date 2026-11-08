import './ReadyToDieCase.css'

const media = '/ZihaoShen_Hank/assets/portfolio/'
const chapters = [['role', 'My work'], ['tutorial', 'Tutorial'], ['office', 'Office level'], ['combat', 'Floodgate'], ['ending', 'Final encounter'], ['process', 'Development'], ['credits', 'Credits']]
function Chapter({ id, title, children }) {
  return <section className="rtd-chapter" id={`rtd-${id}`}><header><h3>{title}</h3></header>{children}</section>
}
function Shot({ file, title, note }) {
  return <figure className="rtd-shot"><a className="rtd-image-link" href={`${media}${file}`} target="_blank" rel="noreferrer" aria-label={`View full image: ${title}`}><img src={`${media}${file}`} alt={title} loading="lazy" /></a><figcaption><strong>{title}</strong><span>{note}</span></figcaption></figure>
}
export default function ReadyToDieComplete() {
  return <article className="project section project-detail rtd-case" id="ready-to-die" lang="en">
    <div className="project-heading"><h2>Ready to Die</h2><p className="rtd-subtitle">A third-person exploration, puzzle and combat game</p></div>
    <div className="rtd-overview">
      <div><p>I made Ready to Die in Unity. The player wakes up in a flooded city and crosses rooftops, abandoned offices and industrial platforms before meeting another version of themselves.</p><p>Death changes parts of the route: a bridge appears across a gap, and a ruined hall returns intact. The accumulated death count also determines how many bosses the player faces at the end.</p></div>
      <dl className="rtd-project-info"><div><dt>Project</dt><dd>Individual game project</dd></div><div><dt>Engine</dt><dd>Unity</dd></div><div><dt>Platform</dt><dd>PC</dd></div><div><dt>Scope</dt><dd>Tutorial and three main levels</dd></div></dl>
    </div>
    <aside className="rtd-authorship"><strong>Original ideas and design by Zihao Shen</strong><p>All creative ideas and design concepts for Ready to Die are my own. I used AI as a production assistant to help implement them, write and revise code, troubleshoot problems and support parts of the scene and visual work. I set the direction, reviewed the results and decided what to keep or change. Third-party models, animations and audio are credited separately.</p></aside>
    <Shot file="ready-to-die-level2-environment.png" title="The flooded industrial area" note="Development capture of the dressed Level 2 environment." />
    <nav className="rtd-index" aria-label="Case study sections">{chapters.map(([id, label]) => <button key={id} type="button" onClick={() => document.getElementById(`rtd-${id}`)?.scrollIntoView({ behavior: 'smooth' })}>{label}</button>)}</nav>
    <Chapter id="role" title="My work">
      <p>I developed the game concept, level layouts, puzzles and interaction flow. I also planned the environment and sound, played through sections of the game and adjusted the design when something was unclear or difficult to use.</p>
      <p>My design work covers the flooded-city setting, the death-and-respawn rules, the order of the levels, the office puzzle, the shooting interactions and the final encounter. I also decided how the spaces should change, what information the player should see and how the ending should feel.</p>
      <p>I described the intended behaviour, used AI assistance to help produce it, then checked it in Unity. When a result did not match my idea, I specified the changes and tested again. This included both large decisions, such as the hall changing after death, and smaller ones, such as removing an on-screen hint or lowering an explosion’s volume.</p>
    </Chapter>
    <Chapter id="tutorial" title="Learning what changes after death">
      <p>The player wakes up in a small rooftop room. The first route introduces movement, jumping and an air dash, then ends at a gap they cannot cross.</p>
      <p>After dying in this area and returning to the start, the player finds a bridge. Falling elsewhere does not trigger it. Passing through the same place twice lets the player notice the change themselves.</p>
      <h4>Movement and guidance</h4>
      <p>The player can walk, run, jump and dash in the air. During development I adjusted air steering, gravity and falling speed, and changed the dash to follow the character’s facing direction. I wanted the player to judge each landing through movement rather than rely on a long series of instructions.</p>
      <p>I moved the basic controls onto a sign beside the starting room and removed the continuous bottom-of-screen tutorial text. The opening fade remains. A readable diary adds context without making the player stop for a separate cutscene.</p>
      <details className="rtd-early"><summary>Early blockout: before and after death</summary><div className="rtd-grid"><Shot file="ready-to-die-map-before-death.png" title="Before death" note="Early Unity blockout, before environment dressing." /><Shot file="ready-to-die-map-after-death.png" title="The bridge appears" note="Early editor capture; the yellow outline is a selection highlight." /></div></details>
    </Chapter>
    <Chapter id="office" title="The office level">
      <p>A central hall connects two routes. Collapsing platforms lead to a timer. In the offices, the player finds a fuse, restores power, reads a code on the computer and opens a cabinet containing C4. Both routes bring them back to the workbench to assemble a bomb.</p>
      <h4>The collapsing-platform route</h4>
      <p>Some platforms collapse one second after the player steps on them. Jumping away does not cancel that countdown. Before the timer is collected, death restores the platforms for another attempt. Once the timer has been collected, the player keeps it after death and the platforms no longer reset.</p>
      <p>A shortcut at the end unlocks from the inside. It can then be pushed open and closes slowly, but does not lock again. The player can finish the route and return to the hall without repeating every jump.</p>
      <h4>Restoring power in the offices</h4>
      <p>The fuse is a small ceramic object in the maintenance room. The player has to find it and install it on the correct electrical line. This turns on the office and hall lights and supplies power to the computer. Office Records contains the code for the C4 cabinet.</p>
      <p>The computer desktop, folder and cabinet keypad use in-game interfaces. A map identifies the rooms without giving away the password or item locations. Room labels, a maintenance note and other readable records help the player connect the spaces. Ordinary doors open when pushed and slowly close after the player stops pushing.</p>
      <details className="rtd-early"><summary>Early computer interface</summary><Shot file="ready-to-die-computer-desktop.png" title="Office Records" note="Early interface study. The final cabinet contains C4; the timer is on the parkour route." /></details>
      <h4 id="rtd-world">Returning after the explosion</h4>
      <p>The bomb has a three-second countdown. The player can still move, but the explosion kills them. When they return, the hall is intact. The blocked exit has become a pair of open doors, and the workbench and maintenance note are gone.</p>
      <Shot file="ready-to-die-restored-exit.png" title="The restored exit" note="Development capture of the intact double doors after the world change." />
      <p>I wanted the player to recognise the room but notice that it had changed. This meant updating the objects as well as the wall materials, and removing the collisions and interactions of anything that disappeared. Completed puzzle steps stay completed, so dying does not mean searching for the same materials again.</p>
      <p>An ordinary death leaves the workbench and note in place. The explosion is the event that changes the hall. I included the bench’s drawers, trim and radio in that change so the room would not be left with floating parts or invisible interactions. The restored exit leads to the next level, while the office map remains.</p>
      <h4>Returning to play after death</h4>
      <p>The screen goes black as the player dies. After respawning, the camera returns to the character before the picture fades back in. Movement velocity is reset as part of the return. This keeps the reset out of view and lets the player see the changed room when control resumes.</p>
    </Chapter>
    <Chapter id="combat" title="Adding shooting at the floodgate">
      <p>The player takes a pistol from a body and shoots chains to lower a bridge. The route continues through dog encounters, ammunition supplies and parkour sections on the industrial platforms.</p>
      <p>The pistol has two uses here: fighting and opening the route. The level combines it with the movement introduced earlier. Death returns the player to the start of this level and resets the enemies and per-life ammunition supplies.</p>
      <p>The route includes two parkour sections between larger platforms. Five dog enemies use those spaces for encounters. Four ammunition boxes each provide ten rounds per life, so ammunition collection is part of moving through the level. I kept the chain interaction to the sound of the gunshot rather than adding another sound for every broken chain.</p>
      <h4>Health, ammunition and weapon feedback</h4>
      <p>The HUD shows a 100-point health bar in the top left. After the pistol is collected, a weapon display appears in the bottom right with the magazine and reserve ammunition. It updates when the player fires, reloads or collects ammunition, and health returns after respawning.</p>
      <p>The HUD hides during reading, dialogue, death and the ending. I also removed the on-screen death counter and the first level’s material inventory list. The game still records deaths for the final encounter; hiding the number does not remove that rule.</p>
      <p>The character uses a third-party model and movement animations, with separate pistol aiming, shooting and reloading animations adapted to it. The model and source animations are credited to their creators.</p>
    </Chapter>
    <Chapter id="ending" title="The final encounter">
      <p>The player meets another version of themselves. The number of bosses depends on their accumulated deaths. Dying in this fight increases the number for the next attempt.</p>
      <p>The doors stay locked during the conversation and battle, then open after victory. On a failed attempt, the encounter is rebuilt with the bosses at full health. Two ammunition boxes each provide fifteen rounds on a twenty-second refill cycle.</p>
      <Shot file="ready-to-die-final-encounter.png" title="The final encounter" note="Development capture of the boss formation in the final room." />
      <p>Earlier deaths open routes; here, they affect the fight. I used this connection to carry the death mechanic from the tutorial through to the ending.</p>
      <h4>The corridor</h4>
      <p>After the fight and final conversation, the character walks slowly down a corridor. The player can still look around. Sea and wind fade out, ambient music comes in, and the scene fades to white with the title. I slowed this section down to give the game a quiet ending after combat.</p>
      <p>The final dialogue keeps the question “READY TO DIE?” In the corridor, manual movement, jumping and dashing are disabled, while the camera remains under the player’s control. At the end, the character stops and the music fades out. I replaced an earlier generated audio fallback with a sourced ambient track for this sequence.</p>
      <Shot file="ready-to-die-ending-corridor.png" title="A quiet final walk" note="Environment development capture; music and automatic walking were added afterwards." />
    </Chapter>
    <Chapter id="process" title="Building and revising the game">
      <p>The early blockout became a flooded city, damaged offices and industrial platforms. I adjusted furniture and passageways around the character’s scale, then added signs, maps and readable notes to help explain the space and tasks.</p>
      <p>In the offices, I worked on broken windows, damaged walls and ceilings, desks, filing cabinets and scattered documents. I checked how monitors, keyboards and papers sat on the desks, and adjusted furniture that looked out of scale. In the parkour area, broken walls and a view of the flooded city give the route a setting without changing the intended jumping path.</p>
      <h4 id="rtd-sound">Environment and sound</h4>
      <p>Exploration mainly uses sea and wind. Indoors, they become quieter and more muffled; outside, they return. Footsteps, doors, pickups, switches, shooting and injury have their own sounds. The final corridor uses a separate ambient music track.</p>
      <p>The nine short sound groups are gunfire, reloading, footsteps, doors, the electrical switch, pickups, explosions, dog growls and player injury. Footsteps follow the movement animation. Injury sounds vary without immediately repeating the same recording, and explosions and injury sounds stop at respawn instead of following the player into the next life.</p>
      <p>I requested quieter explosions after trying them in the game. The sea and wind loops were edited for continuous playback, and indoor filtering reduces their volume and brightness. Scene changes keep one ambience system running rather than layering duplicate loops. The ending gradually fades that ambience away.</p>
      <h4>Changes from playing the game</h4>
      <ul className="rtd-revisions">
        <li><strong>The fuse was hard to pick up.</strong> Its small size made precise aiming awkward. I adjusted pickup tolerance while keeping distance and wall checks.</li>
        <li><strong>Text showed through walls.</strong> I changed how world-space text handles depth so labels stay behind solid surfaces.</li>
        <li><strong>Only part of the exit triggered the next level.</strong> I expanded the trigger to cover both open doors.</li>
        <li><strong>Some sounds arrived late.</strong> I trimmed the explosion’s quiet lead-in and aligned footsteps with the movement animation.</li>
      </ul>
      <h4>Ideas I chose not to include</h4>
      <p>Earlier ideas included a revival minigame, revival coins and a limited number of chances. I also explored step limits, enemies fighting each other, searching while being chased, and multiple worlds or endings. These were design explorations, not features of the finished version. I focused the project on the four connected levels and their changes after death.</p>
      <p>The office puzzle also became simpler during development. An earlier direction involved staff records and identity checks. The final sequence uses a fuse, power, a computer code and the C4 cabinet. Early screenshots may show different item names or placements; the current arrangement puts the timer on the parkour route and C4 in the cabinet.</p>
      <details className="rtd-early"><summary>What the development checks cover</summary><p>Focused editor checks covered puzzle progress, duplicate pickups, incorrect codes, crafting, respawning, combat state, scene transitions, sound triggers and the corridor sequence. There were also checks for hidden objects retaining collisions and interactions after the hall changed. These checks do not establish a complete standalone-build playthrough or performance benchmark.</p></details>
    </Chapter>
    <Chapter id="credits" title="Assets and credits">
      <p>All creative ideas and design concepts are my own, with AI assisting production and technical implementation. I also used third-party models, animations and recordings. Their creators, sources and uses are listed on a separate credits page.</p>
      <a className="text-link" href="#/ready-to-die/credits">View assets and credits →</a>
    </Chapter>
  </article>
}

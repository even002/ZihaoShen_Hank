import dimensions from '../mediaDimensions.json'
import { useEffect, useRef } from 'react'
import './CinematicHome.css'
const sourceMarkup = "\n<nav><a class=\"brand\" href=\"#top\">Zihao Shen</a><div><a href=\"#work\">Selected work</a><a href=\"#about\">About me</a><a class=\"contact\" href=\"https://github.com/even002\">GitHub profile</a></div></nav>\n<header class=\"hero\" id=\"top\"><img src=\"assets/portfolio/ready-to-die-level2-environment.png\" alt=\"The flooded industrial environment in Ready to Die\"><div class=\"orbit\">Game designer<br>World builder<br>Curious player</div><div class=\"hero-main\"><h1>Play changes<br>everything.</h1></div><div class=\"hero-bottom\"><p>I’m Zihao Shen. I design levels, rules and the moments that make players look again.</p><a class=\"pill\" href=\"#work\">Explore my work</a></div></header>\n<section class=\"intro\"><span class=\"label\">A little about my work</span><div><h2>A familiar place.<br>A different way through.</h2><p>I’m interested in how players learn through exploration. My work moves between level design, changing game rules, and visual effects that support the experience.</p></div></section>\n<section class=\"work\" id=\"work\"><div class=\"section-title\"><h2>Selected work</h2><span>Game design / Real-time effects</span></div><a class=\"project\" href=\"./#/ready-to-die\"><img src=\"assets/portfolio/ready-to-die-player-view.png\" alt=\"Third-person gameplay in Ready to Die\" loading=\"lazy\"><div class=\"project-copy\"><div><p>Individual project · Unity</p><h3>Ready to Die</h3><p>Death changes the way forward.</p></div><span class=\"pill\">Explore the project</span></div></a><div class=\"project-meta\"><p>A third-person game about noticing what changes after death. Explore my level layouts, puzzles and design decisions.</p><span>Game & level design</span></div><a class=\"project amber\" href=\"./#/last-amber\"><img src=\"assets/portfolio/last-amber-blade-slash-final.png\" alt=\"Red-black blade slash in Last Amber\" loading=\"lazy\"><div class=\"project-copy\"><div><p>Team project · Unreal Engine</p><h3>Last Amber</h3><p>Giving combat a visual rhythm.</p></div><span class=\"pill\">Explore the effects</span></div></a><div class=\"project-meta\"><p>Attack effects, atmosphere and iteration for a boss encounter. My contribution: VFX design and implementation.</p><span>Niagara & materials</span></div></section>\n<section class=\"experiment\"><div><span>Inside Ready to Die</span><h2>Same place.<br>New possibility.</h2><p>In specific places, dying opens a new route. Switch between the two states to see how the level changes.</p><div class=\"toggle\" role=\"group\" aria-label=\"Level state\"><button aria-pressed=\"true\" data-state=\"before\">Before death</button><button aria-pressed=\"false\" data-state=\"after\">After death</button></div><p><a href=\"./#/ready-to-die\">Read the design case study</a></p></div><figure class=\"compare\"><img id=\"state-image\" src=\"assets/portfolio/ready-to-die-platforms-before.png\" alt=\"Platforms before death\" loading=\"lazy\"><figcaption id=\"state-caption\" aria-live=\"polite\">Before death — the initial platform layout.</figcaption></figure></section>\n<section class=\"about\" id=\"about\"><h2>Behind<br>the play.</h2><div><p>I study Game Design at RMIT University. I’m interested in how a level teaches the player what to do, and how its rules change as they progress.</p><p>For Last Amber, I learned real-time effects because the team needed them. The case studies separate my own work, AI assistance, and assets made by other creators.</p><a href=\"https://github.com/even002\">Find me on GitHub</a></div></section><footer><span>Zihao Shen / Game Designer</span><span>Selected projects · 2026</span></footer>\n"
const markup = sourceMarkup.replace(/<img\b[^>]*?\bsrc="([^"]+)"/g, (tag, src) => {
 const [width, height] = dimensions[src.split('/').pop()] || []
 return `${tag}${width ? ` width="${width}" height="${height}"` : ''} decoding="async"${src.includes('level2-environment') ? ' fetchpriority="high"' : ''}`
})
export default function CinematicHome() {
 const root = useRef(null)
 useEffect(() => {
  const handleClick = (event) => {
   const button = event.target.closest('[data-state]')
   if (!button) return
   const state = button.dataset.state
   root.current.querySelectorAll('[data-state]').forEach(item => item.setAttribute('aria-pressed', String(item === button)))
   const image = root.current.querySelector('#state-image')
   image.src = `${import.meta.env.BASE_URL}assets/portfolio/ready-to-die-platforms-${state}.png`
   image.alt = `Platforms ${state} death`
   root.current.querySelector('#state-caption').textContent = state === 'before' ? 'Before death — the initial platform layout.' : 'After death — the changed platform layout opens a new route.'
  }
  const node = root.current
  node.addEventListener('click', handleClick)
  return () => node.removeEventListener('click', handleClick)
 }, [])
 return <main id="main-content" tabIndex={-1} className="new-home" ref={root} dangerouslySetInnerHTML={{ __html: markup }} />
}

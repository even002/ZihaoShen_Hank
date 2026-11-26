import PortfolioImage from './PortfolioImage'
import { useState } from 'react'
import './ProjectSpotlight.css'
const media = `${import.meta.env.BASE_URL}assets/portfolio/`
const stories = {
 rtd: { label: 'Ready to Die / World change', title: '同一个大厅，\n不同的出口。', description: '引爆炸弹后，玩家死亡并重新回到大厅。墙壁恢复完整，出口打开，原来的工作台也消失了。', steps: [
  {name:'爆炸前', file:'ready-to-die-wall-before.png', caption:'大厅变化前的开发截图。'},
  {name:'复活后', file:'ready-to-die-wall-after.png', caption:'大厅变化后的开发截图。观察墙壁与出口的变化。'}
 ]},
 amber: { label: 'Last Amber / AOE falling attack', title: 'Read the warning.\nFeel the impact.', description: 'I built the attack in stages so the warning, strike and aftermath could each be adjusted to the combat timing.', steps: [
  {name:'Targeting', file:'aoe-sequence-01-targeting-columns.png', caption:'Thin columns gather at the centre before the strike.'},
  {name:'Warning', file:'aoe-sequence-02-warning-ring.png', caption:'A ring marks the area before the main column falls.'},
  {name:'Strike', file:'aoe-sequence-03-falling-column.png', caption:'The falling column reaches the marked area.'},
  {name:'Aftermath', file:'aoe-sequence-04-ground-impact.png', caption:'Red-and-black energy spreads across the ground.'}
 ]}
}
export default function ProjectSpotlight({project}) {
 const [active,setActive] = useState(0)
 const story=stories[project]
 const step=story.steps[active]
 return <section className={`project-spotlight spotlight-${project}`} aria-label={story.label}>
  <div className="spotlight-copy"><p className="spotlight-label">{story.label}</p><h3>{story.title}</h3><p className="spotlight-description">{story.description}</p>
   <div className="spotlight-controls" role="group" aria-label="Choose a stage">{story.steps.map((item,i)=><button key={item.name} type="button" aria-pressed={active===i} onClick={()=>setActive(i)}>{item.name}</button>)}</div>
  </div>
  <figure><a href={`${media}${step.file}`} target="_blank" rel="noreferrer" aria-label={`Open image: ${step.name}`}><PortfolioImage key={step.file} src={`${media}${step.file}`} alt={step.caption} loading="lazy" /></a><figcaption aria-live="polite"><span>{step.name}</span>{step.caption}</figcaption></figure>
 </section>
}

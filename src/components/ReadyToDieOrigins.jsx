const sections = [
  {
    title: '最初的想法',
    image: { file: 'early-ideas.png', width: 1990, height: 2400, node: '1-16', alt: 'Figma早期记录：移动限制、借刀杀人、寻找物品、开始反击与复活五个想法', caption: '最初记录的五个方向。第五个“复活”里，已经有了穿越到另一个世界、最后面对死去的自己的设想。其余方向保留在这里，作为当时的探索记录。' },
    paragraphs: [
      'Ready to Die 的灵感来自短视频平台上的小游戏广告。这类游戏经常让玩家在死亡后看广告复活，广告展示的玩法有时也与实际内容不一致。我开始想：如果玩家点击“复活”之后，并没有真正活过来，而是进入了另一个世界，会怎么样？',
      '在最初的设想里，每次复活，都意味着原来世界里的自己已经死去。玩家以为自己可以不断重来，但到了最后，那些死去的“自己”会出现在面前，让玩家面对之前每一次死亡留下的后果。',
    ],
  },
  {
    title: '为什么放弃小游戏复活',
    image: { file: 'early-game-flow.png', width: 2400, height: 1384, node: '1-48', label: '早期 UE 版本 · 流程探索', alt: '早期UE版本的Game Flow，包含复活币与小游戏复活方案，不代表Unity完成版流程', caption: '这是 UE 阶段的流程设想，不是当前 Unity 完成版的流程。原稿保留了复活币和小游戏复活方案；小游戏复活后来因打断节奏而放弃。' },
    paragraphs: [
      '我最初考虑过让玩家通过小游戏获得复活机会。但在实际制作过程中，我发现它会中断整个游戏的节奏。玩家正在探索关卡、寻找线索，死亡后却要先完成另一段小游戏，才能回来继续。',
      '因此，我放弃了小游戏复活，让玩家直接回到关卡。这样，玩家的注意力可以留在当前的空间里，观察复活后发生了什么变化。',
    ],
  },
  {
    title: '让死亡打开新的道路',
    image: { file: 'tutorial-plan.png', width: 2400, height: 1681, node: '1-99', label: '早期 UE 版本 · 新手关区域图', alt: '早期UE版本新手关区域划分，不是当前Unity完成版的关卡布局', caption: '这是 UE 阶段的新手关记录，展示当时对死亡开路的探索。图中的区域、布局与按键属于旧版本；上方正文说明的是当前 Unity 完成版的玩法。' },
    paragraphs: [
      '教程里，玩家会遇到一个无法跨越的缺口。只有在这个区域死亡，复活后桥才会出现；在其他地方死亡不会开桥。再次经过同一个地方时，玩家才能发现道路变了。',
      '我想用这段经历教会玩家：遇到阻碍时，也要留意死亡前后的区别。',
    ],
  },
  {
    title: '熟悉的地方，不同的世界',
    paragraphs: [
      '我想让玩家觉得，死亡后进入了另一个世界。这里看起来还是同一个地方，但里面的东西已经不一样。',
      '办公室关进一步展开了这个想法。玩家收集材料、制作炸弹并引爆，随后死亡。等他们再次回来，大厅却恢复了完整，原本受阻的出口打开了，工作台也消失了。',
      '爆炸之后，房间反而恢复完整，这种变化是我留给玩家的提示。我不想一开始就直接解释不同世界的设定，而是让玩家通过熟悉空间中的差异，逐渐怀疑自己是否真的回到了原来的地方。',
    ],
  },
  {
    title: '最后面对那些“自己”',
    paragraphs: [
      '前面的关卡让玩家发现，死亡可以帮助自己继续前进。到了最终战，之前的死亡又以另一种方式出现：玩家面对的是其他版本的自己，Boss 的数量与累计死亡次数有关。',
      '玩家一路借助死亡打开道路，最后却要面对死亡留下的后果。我希望即使可以复活，玩家也不会觉得生命可以随意浪费。这是我想通过这个游戏表达的：珍惜生命。',
    ],
  },
]

function OriginalFigure({ image }) {
  return <figure className="rtd-origin-figure">
    <div className="rtd-origin-version">{image.label || '早期概念探索 · 五个想法原稿'}</div>
    <a href={`${import.meta.env.BASE_URL}media/rtd-origins/${image.file}`} target="_blank" rel="noreferrer" aria-label={`查看原图：${image.alt}`}>
      <img src={`${import.meta.env.BASE_URL}media/rtd-origins/${image.file}`} width={image.width} height={image.height} alt={image.alt} loading="lazy" />
    </a>
    <figcaption>{image.caption}<span className="rtd-origin-source">点击查看原图 · <a href={`https://www.figma.com/design/zJtkfp7fCV7pf9PKjkxuvn/Untitled?node-id=${image.node}`} target="_blank" rel="noreferrer">Figma 原始记录</a></span></figcaption>
  </figure>
}

export default function ReadyToDieOrigins() {
  return <section className="rtd-origins" id="rtd-origins" lang="zh-CN" aria-labelledby="rtd-origins-title">
    <header><h3 id="rtd-origins-title">想法来源与设计过程</h3><p className="rtd-version-note">游戏已在 Unity 中完成。下方保留了早期 UE 阶段的流程与区域图，用来展示设计探索；它们不是完成版的流程或地图。</p></header>
    {sections.map(({ title, paragraphs, image }) => <section className="rtd-origin-section" key={title}>
      <h4>{title}</h4>
      <div>{paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
      {image?.file === 'tutorial-plan.png' && <figure className="rtd-origin-figure rtd-tutorial-sketch">
        <div className="rtd-origin-version">Unity 完成版 · 新手关流程草图</div>
        <a href={`${import.meta.env.BASE_URL}media/rtd-origins/unity-tutorial-sketch.png`} target="_blank" rel="noreferrer" aria-label="查看新手关手绘草图原图">
          <img src={`${import.meta.env.BASE_URL}media/rtd-origins/unity-tutorial-sketch.png`} alt="手绘新手关流程：出生点与日记、跳跃平台练习、死亡后出现的桥及终点" width="2606" height="1820" loading="lazy" />
        </a>
        <figcaption>我先让玩家通过跳跃平台熟悉操作，再用指定区域死亡后出现的桥介绍道路变化。玩家重新经过这里时，需要自己发现新的通路。<span className="rtd-origin-source">根据 Unity 完成版整理的设计思路回顾草图 · 点击查看原图</span></figcaption>
      </figure>}
      {image && (image.file === 'tutorial-plan.png'
        ? <details className="rtd-original-notes"><summary>查看早期 UE 探索 · 新手关区域图</summary><OriginalFigure image={image} /></details>
        : image.file === 'early-ideas.png'
        ? <details className="rtd-original-notes"><summary>查看最初的五个想法 · Figma 原稿</summary><OriginalFigure image={image} /></details>
        : <OriginalFigure image={image} />)}
    </section>)}
  </section>
}


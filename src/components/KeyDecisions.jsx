export default function KeyDecisions({ items }) {
  return <section className="key-decisions" aria-label="Key decisions">
    <h3>Key decisions</h3>
    <ul>{items.map(([title, text]) => <li key={title}><h4>{title}</h4><p>{text}</p></li>)}</ul>
  </section>
}

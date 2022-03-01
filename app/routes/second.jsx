import { Link } from 'remix'

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to the SECOND page</h1>
      <ul>
        <li>
          <Link to="/">index</Link>
        </li>
      </ul>
    </div>
  )
}

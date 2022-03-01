import { json, Link, useLoaderData } from 'remix'
import { Component } from 'react'
import logo from '../logo.svg'
import styles from '../styles/app.css'

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

class LegacyWelcomeClass extends Component {
  render() {
    const { t } = this.props
    return <h2>Welcome to Remix</h2>
  }
}
const Welcome = LegacyWelcomeClass

function MyComponent({}) {
  return <>To get started, edit <code>src/App.js</code> and save to reload.</>
}

export default function Index() {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Welcome />
      </div>
      <div className="App-intro">
        <MyComponent />
      </div>
      <hr />
      <div>
        <Link to="/second">navigate to second page</Link>
      </div>
    </div>
  )
}

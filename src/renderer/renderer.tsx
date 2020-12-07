import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Home } from './screens/Home'

import '@public/style.css'
import '@public/all.min.css'

type NavItemProps = {
  icon: string
  label: string
}

const NavItem: React.FC<NavItemProps> = ({ icon, label }) => (
  <li>
    <i className={`fas ${icon}`}></i>
    <p>{label}</p>
  </li>
)

ReactDOM.render(
  <div className="app">
    <Home />
    <nav id="nav">
      <ul>
        <NavItem label="CPU" icon="fa-microchip" />
        <NavItem label="System Info" icon="fa-info" />
        <NavItem label="Settings" icon="fa-cog" />
      </ul>
    </nav>
  </div>,
  document.getElementById('app'),
)

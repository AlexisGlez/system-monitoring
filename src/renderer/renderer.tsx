import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Home } from './screens/Home'

import '@public/style.css'
import '@public/all.min.css'

type NavItemProps = {
  id: string
  icon: string
  label: string
  isActive: boolean
  onItemClick: React.Dispatch<React.SetStateAction<string>>
}

const NavItem: React.FC<NavItemProps> = ({ id, icon, label, isActive, onItemClick }) => (
  <li className={isActive ? 'active' : ''} onClick={() => onItemClick(id)}>
    <i className={`fas ${icon}`}></i>
    <p>{label}</p>
  </li>
)

const App: React.FC<{}> = () => {
  const [selectedTab, setSelectedTab] = React.useState<'cpu' | 'system' | 'settings'>('cpu')

  return (
    <div className="app">
      <Home selectedTab={selectedTab} />
      <nav id="nav">
        <ul>
          <NavItem
            id="cpu"
            isActive={selectedTab === 'cpu'}
            label="CPU"
            icon="fa-microchip"
            onItemClick={setSelectedTab}
          />
          <NavItem
            id="system"
            isActive={selectedTab === 'system'}
            label="System Info"
            icon="fa-info"
            onItemClick={setSelectedTab}
          />
          <NavItem
            id="settings"
            isActive={selectedTab === 'settings'}
            label="Settings"
            icon="fa-cog"
            onItemClick={setSelectedTab}
          />
        </ul>
      </nav>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))

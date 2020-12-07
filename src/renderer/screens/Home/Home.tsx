import * as React from 'react'

import { CPUStat } from './components/CPUStat'
import { Title } from './components/Title'
import { SettingsForm } from './components/SettingsForm'

import './Home.css'

type HomeProps = {
  selectedTab: 'cpu' | 'system' | 'settings'
}

export const Home: React.FC<HomeProps> = ({ selectedTab }) => {
  const [tabsVisibility, setTabsVisibility] = React.useState({
    cpu: true,
    system: false,
    settings: false,
  })

  React.useEffect(() => {
    setTabsVisibility({ cpu: false, system: false, settings: false, [selectedTab]: true })
  }, [selectedTab])

  return (
    <main>
      <div className={`content ${tabsVisibility.cpu ? 'show' : ''}`}>
        <Title title="CPU" icon="fa-microchip" />
        <div className="progress-bar">
          <div className="progress" id="cpu-progress"></div>
        </div>

        <ul>
          <CPUStat title="CPU Usage" />
          <CPUStat title="CPU Free" />
        </ul>
        <div id="cpu-model"></div>
      </div>
      <div className={`content ${tabsVisibility.system ? 'show' : ''}`}>
        <Title title="System Info" icon="fa-info" />
        <ul>
          <CPUStat title="Computer Name" />
          <CPUStat title="OS" />
          <CPUStat title="System Uptime" />
          <CPUStat title="System Memory" />
        </ul>
      </div>
      <div className={`content ${tabsVisibility.settings ? 'show' : ''}`}>
        <Title title="Settings" icon="fa-cog" />
        <div id="alert" className="hide"></div>
        <SettingsForm />
      </div>
    </main>
  )
}

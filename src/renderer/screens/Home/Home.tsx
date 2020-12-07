import * as React from 'react'

import { CPUStat } from './components/CPUStat'
import { Title } from './components/Title'
import { SettingsForm } from './components/SettingsForm'

import './Home.css'

export const Home: React.FC<{}> = () => {
  return (
    <main>
      <div className="content show">
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
      <div className="content">
        <Title title="System Info" icon="fa-info" />
        <ul>
          <CPUStat title="Computer Name" />
          <CPUStat title="OS" />
          <CPUStat title="System Uptime" />
          <CPUStat title="System Memory" />
        </ul>
      </div>
      <div className="content">
        <Title title="Settings" icon="fa-cog" />
        <div id="alert" className="hide"></div>
        <SettingsForm />
      </div>
    </main>
  )
}

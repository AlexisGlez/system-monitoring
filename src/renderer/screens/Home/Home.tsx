import * as React from 'react'
import * as osUtils from 'node-os-utils'

import { CPUStat } from './components/CPUStat'
import { Title } from './components/Title'
import { SettingsForm } from './components/SettingsForm'

import './Home.css'

type HomeProps = {
  selectedTab: 'cpu' | 'system' | 'settings'
}

function formatUptime(uptimeInSeconds: number) {
  const d = Math.floor(uptimeInSeconds / (3600 * 24))
  const h = Math.floor((uptimeInSeconds % (3600 * 24)) / 3600)
  const m = Math.floor((uptimeInSeconds % 3600) / 60)
  const s = Math.floor(uptimeInSeconds % 60)
  return `${d}d, ${h}h, ${m}m, ${s}s`
}

export const Home: React.FC<HomeProps> = ({ selectedTab }) => {
  const [tabsVisibility, setTabsVisibility] = React.useState({
    cpu: true,
    system: false,
    settings: false,
  })

  const [cpuUsage, setCpuUsage] = React.useState(0)
  const [cpuFree, setCpuFree] = React.useState(0)
  const [cpuUptime, setCpuUptime] = React.useState(0)
  const [totalMemory, setTotalMemory] = React.useState(0)

  React.useEffect(() => {
    setTabsVisibility({ cpu: false, system: false, settings: false, [selectedTab]: true })
  }, [selectedTab])

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      osUtils.cpu.usage().then(setCpuUsage).catch(console.error)
      osUtils.cpu.free().then(setCpuFree).catch(console.error)
      setCpuUptime(osUtils.os.uptime())
    }, 1500)

    osUtils.mem.info().then((info) => {
      setTotalMemory(info.totalMemMb)
    })

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <main>
      <div className={`content ${tabsVisibility.cpu ? 'show' : ''}`}>
        <Title title="CPU" icon="fa-microchip" />
        <div className="progress-bar">
          <div className="progress" id="cpu-progress" style={{ width: cpuUsage + '%' }}></div>
        </div>

        <ul>
          <CPUStat title="CPU Usage" stat={cpuUsage + '%'} />
          <CPUStat title="CPU Free" stat={cpuFree + '%'} />
        </ul>
        <div id="cpu-model">{osUtils.cpu.model()}</div>
      </div>
      <div className={`content ${tabsVisibility.system ? 'show' : ''}`}>
        <Title title="System Info" icon="fa-info" />
        <ul>
          <CPUStat title="Computer Name" stat={osUtils.os.hostname()} />
          <CPUStat title="OS" stat={`${osUtils.os.type()} ${osUtils.os.arch()}`} />
          <CPUStat title="System Uptime" stat={formatUptime(cpuUptime)} />
          <CPUStat title="System Memory" stat={totalMemory + ' MB'} />
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

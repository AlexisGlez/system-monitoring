import * as React from 'react'
import { ipcRenderer } from 'electron'

import { Input } from './components/Input'

import './SettingsForm.css'

type SettingsFormProps = {
  cpuOverloadDefaultValue: number
  alertFrequencyDefaultValue: number
  onSettingsChanged: () => void
}

export const SettingsForm: React.FC<SettingsFormProps> = ({
  alertFrequencyDefaultValue,
  cpuOverloadDefaultValue,
  onSettingsChanged,
}) => {
  const [cpuOverload, setCpuOverload] = React.useState(cpuOverloadDefaultValue)
  const [alertFrequency, setAlertFrequency] = React.useState(alertFrequencyDefaultValue)

  const onFormSubmitted = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    ipcRenderer.send('settings:set', {
      cpuOverload,
      alertFrequency,
    })

    onSettingsChanged()
  }

  return (
    <form id="settings-form" onSubmit={onFormSubmitted}>
      <Input
        id="cpu-overload"
        label="CPU Overload Warning %"
        value={cpuOverload}
        onChange={setCpuOverload}
      />
      <Input
        id="alert-frequency"
        label="Alert Frequency (In Minutes)"
        value={alertFrequency}
        onChange={setAlertFrequency}
      />
      <input type="submit" value="Save" className="btn" />
    </form>
  )
}

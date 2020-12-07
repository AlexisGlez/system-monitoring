import * as React from 'react'

import { Input } from './components/Input'

import './SettingsForm.css'

type SettingsFormProps = {}

export const SettingsForm: React.FC<SettingsFormProps> = () => {
  return (
    <form id="settings-form">
      <Input id="cpu-overload" label="CPU Overload Warning %" />
      <Input id="alert-frequency" label="Alert Frequency (In Minutes)" />
      <input type="submit" value="Save" className="btn" />
    </form>
  )
}

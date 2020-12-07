import * as React from 'react'

import './Input.css'

type InputProps = {
  id: string
  label: string
}

export const Input: React.FC<InputProps> = ({ id, label }) => {
  return (
    <div className="form-control">
      <label htmlFor={id}>{label}</label>
      <input type="number" id={id} />
    </div>
  )
}

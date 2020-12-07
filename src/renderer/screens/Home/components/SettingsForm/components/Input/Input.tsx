import * as React from 'react'

import './Input.css'

type InputProps = {
  id: string
  label: string
  value: number
  onChange: React.Dispatch<React.SetStateAction<number>>
}

export const Input: React.FC<InputProps> = ({ id, label, value, onChange }) => {
  return (
    <div className="form-control">
      <label htmlFor={id}>{label}</label>
      <input
        type="number"
        id={id}
        value={value}
        onChange={(e) => {
          const parsedValue = parseInt(e.target.value)

          if (Number.isNaN(parsedValue) || parsedValue <= 0) {
            return
          }

          onChange(parsedValue)
        }}
      />
    </div>
  )
}

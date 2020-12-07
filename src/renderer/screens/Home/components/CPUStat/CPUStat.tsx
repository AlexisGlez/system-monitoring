import * as React from 'react'

type CPUStatProps = {
  title: string
  stat?: string
}

export const CPUStat: React.FC<CPUStatProps> = ({ title, stat }) => {
  return (
    <li>
      <strong>{title}: </strong>
      <span>{stat}</span>
    </li>
  )
}

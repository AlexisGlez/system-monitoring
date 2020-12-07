import * as React from 'react'

type TitleProps = {
  title: string
  icon: string
}

export const Title: React.FC<TitleProps> = ({ title, icon }) => {
  return (
    <h1>
      <i className={`fas ${icon}`}></i> {title}
    </h1>
  )
}

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Home } from './screens/Home'

import '@public/all.min.css'

ReactDOM.render(
  <div className="app">
    <Home />
  </div>,
  document.getElementById('app'),
)

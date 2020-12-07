import { BrowserWindow, nativeImage } from 'electron'
import * as path from 'path'
import * as url from 'url'

import { isProd } from '@main/utils'

export class MainWindow extends BrowserWindow {
  constructor() {
    super({
      title: 'System Monitoring',
      height: 500,
      width: isProd ? 355 : 800,
      icon: nativeImage.createFromPath(`${__dirname}/public/icons/icon.png`),
      resizable: !isProd,
      show: false,
      opacity: 0.9,
      webPreferences: {
        nodeIntegration: true,
        devTools: !isProd,
      },
    })

    // load the index.html of the app.
    this.loadURL(
      url.format({
        pathname: path.join(__dirname, './index.html'),
        protocol: 'file:',
        slashes: true,
      }),
    )

    if (!isProd) {
      this.webContents.openDevTools()
    }
  }
}

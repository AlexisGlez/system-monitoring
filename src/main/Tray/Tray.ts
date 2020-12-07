import { app, Menu, Tray, BrowserWindow } from 'electron'
import * as path from 'path'

import '@public/icons/tray_icon.png'

export class AppTray extends Tray {
  private window: BrowserWindow

  constructor(window: BrowserWindow) {
    super(path.join(__dirname, 'public/icons', 'tray_icon.png'))

    this.setToolTip('System Monitoring')

    this.window = window

    this.on('click', this.onClick)
    this.on('right-click', this.onRightClick)
  }

  onClick = () => {
    if (this.window.isVisible()) {
      this.window.hide()
    } else {
      this.window.show()
    }
  }

  onRightClick = () => {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Quit',
        click: () => {
          ;(app as any).isQuitting = true
          app.quit()
        },
      },
    ])

    this.setContextMenu(contextMenu)
  }
}

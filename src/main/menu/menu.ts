import { BrowserWindow } from 'electron'

import { isProd, isMacOS } from '../utils'

export function createAppMenu(
  mainWindow: BrowserWindow,
): Array<Electron.MenuItemConstructorOptions> {
  const menu: Array<Electron.MenuItemConstructorOptions> = [
    ...((isMacOS ? [{ role: 'appMenu' }] : []) as Array<Electron.MenuItemConstructorOptions>),
    {
      role: 'fileMenu',
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Navigation',
          click: () => mainWindow.webContents.send('nav:toggle'),
        },
      ],
    },
  ]

  if (!isProd) {
    menu.push({
      label: 'Developer',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { type: 'separator' },
        { role: 'toggleDevTools' },
      ],
    })
  }

  return menu
}

import { isProd } from '../utils'

export function createAppMenu(): Array<Electron.MenuItemConstructorOptions> {
  const menu: Array<Electron.MenuItemConstructorOptions> = [
    {
      role: 'fileMenu',
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

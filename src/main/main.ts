import { app, BrowserWindow, Menu, ipcMain } from 'electron'

import { isMacOS } from './utils'
import { createAppMenu } from './menu'
import { MainWindow } from './windows/Main'
import { AppTray } from './Tray'
import { Store } from './Store'

const store = new Store({
  configName: 'user-settings',
  defaults: {
    settings: {
      cpuOverload: 80,
      alertFrequency: 5,
    },
  },
})

let mainWindow: Electron.BrowserWindow | null
let tray: AppTray | null

function createMainWindow(): void {
  mainWindow = new MainWindow()

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createMainWindow()

  if (!mainWindow) {
    return
  }

  mainWindow.webContents.on('dom-ready', () => {
    mainWindow!.webContents.send('settings:get', store.get('settings'))
  })

  const mainMenu = Menu.buildFromTemplate(createAppMenu(mainWindow))

  Menu.setApplicationMenu(mainMenu)

  mainWindow.on('close', (e) => {
    if (!(app as any).isQuitting) {
      e.preventDefault()
      mainWindow!.hide()
    }

    return true
  })

  tray = new AppTray(mainWindow)
})

ipcMain.on('settings:set', (_, value) => {
  store.set('settings', value)

  if (!mainWindow) {
    return
  }

  mainWindow.webContents.send('settings:get', store.get('settings'))
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (!isMacOS) {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow == null || BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
  }
})

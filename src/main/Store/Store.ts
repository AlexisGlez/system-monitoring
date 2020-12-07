import * as electron from 'electron'
import * as path from 'path'
import * as fs from 'fs'

export class Store {
  private path: string
  private data: Record<string, any>

  constructor(options: { configName: string; defaults: Record<string, any> }) {
    const userDataPath = (electron.app || electron.remote.app).getPath('userData')

    this.path = path.join(userDataPath, options.configName + '.json')
    this.data = parseDataFile(this.path, options.defaults)
  }

  get = (key: string) => {
    return this.data[key]
  }

  set = (key: string, val: any) => {
    this.data[key] = val
    fs.writeFileSync(this.path, JSON.stringify(this.data))
  }
}

function parseDataFile(filePath: string, defaults: Record<string, any>) {
  try {
    return JSON.parse(fs.readFileSync(filePath).toString())
  } catch (err) {
    return defaults
  }
}

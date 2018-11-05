// Modules to control application life and create native browser window
const electron = require('electron')
const { app, BrowserWindow } = electron
const electronIsDev = require('electron-is-dev')
const devtoolsInstallerModule = require('electron-devtools-installer')

const devtoolsInstaller = devtoolsInstallerModule.default
const { REACT_DEVELOPER_TOOLS } = devtoolsInstallerModule

const SAFE_TRANSPARENCY_DELAY = 100

if (process.platform === 'linux') {
  // app.commandLine.appendSwitch('enable-transparent-visuals')
  // app.commandLine.appendSwitch('disable-gpu')
}

const createWindow = async () => {
  // workaround: https://github.com/electron/electron/issues/2170#issuecomment-361549395
  await new Promise(resolve => setTimeout(resolve, SAFE_TRANSPARENCY_DELAY))

  const { width, height, x, y } = electron.screen.getPrimaryDisplay().workArea

  const win = new BrowserWindow({
    width,
    height,
    x,
    y,
    frame: false,
    transparent: true,
    maximizable: false,
    minimizable: false,
    fullscreenable: false,
    resizable: false
  })

  electronIsDev
    ? win.loadURL('http://localhost:3000') // dev server ran by react-scripts
    : win.loadFile('index.html') // production bundle

  if (electronIsDev) {
    await devtoolsInstaller(REACT_DEVELOPER_TOOLS)
    win.webContents.openDevTools({ mode: 'detach' })
  }

  // win.on('closed', function () {})

  return win
}

app.on('ready', createWindow)

app.on('window-all-closed', app.quit)

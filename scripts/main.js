const {app, BrowserWindow, Menu, MenuItem} = require('electron')
const path = require('path')
const url = require('url')

let win

function createWindow () {

  win = new BrowserWindow({width: 375, height: 390})

  win.loadURL(url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true
  }))

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
  Menu.setApplicationMenu(mainMenu)

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

const start = new MenuItem({
   label: 'Start'
})

const control_speed = new MenuItem({
   label: 'Control Speed'
})

const reset_count = new MenuItem({
   label: 'Reset Count'
})

const quit = new MenuItem({
   label: 'Quit'
})

const mainMenuTemplate = [
   { label: 'Main',
     submenu: [
       start,
       control_speed,
       reset_count,
       quit
     ] }
]

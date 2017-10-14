const {app, BrowserWindow, Menu, MenuItem} = require('electron')
const path = require('path')
const url = require('url')

let win

const createWindow = () => {

  win = new BrowserWindow({width: 375, height: 390})

  win.loadURL(url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true
  }))

  setMenuTemplate()

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

const activation = new MenuItem({
   label: 'Stop',
   click() {
      let label = mainMenu.items[0].submenu.items[0].label
      let send_msg = label == 'Start' ? true : false
      activation.label = label == 'Start' ? 'Stop' : 'Start'
      setMenuTemplate()
      win.webContents.send('item:activate', send_msg)
   }
})

const control_speed = new MenuItem({
   label: 'Control Speed',
   click(){
      win.webContents.send('item:speed', 10)
   }
})

const reset_count = new MenuItem({
   label: 'Reset Count',
   click(){
      win.webContents.send('item:reset')
   }
})

const quit = new MenuItem({
   label: 'Quit',
   click(){
      app.quit()
   }
})

const mainMenuTemplate = [
   { label: 'Main',
     submenu: [
       activation,
       control_speed,
       reset_count,
       quit,
       {
          label: 'Toggle DevTools',
          click(item, focusedWindow){
             focusedWindow.toggleDevTools();
          }
      }
     ] }
]

let mainMenu
const setMenuTemplate = () => {
   mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
   Menu.setApplicationMenu(mainMenu)
}

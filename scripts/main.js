const {app, BrowserWindow, Menu, MenuItem, ipcMain} = require('electron')
const path = require('path')
const url = require('url')

let main_win
let form_win

// Set ENV
process.env.NODE_ENV = 'development'

const createMainWindow = () => {

  main_win = new BrowserWindow({ width: 360,
                                 height: 400,
                                 resizable: false })

  main_win.loadURL(url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true
  }))

  setMenuTemplate()

  main_win.on('closed', () => {
    main_win = null
    app.quit()
  })
}

app.on('ready', createMainWindow)

app.on('activate', () => {
  if (main_win === null) {
    createMainWindow()
  }
})

const createFormWindow = () => {
   form_win = new BrowserWindow({ width: 240,
                                  height: 140,
                                  title: 'Speed Controller',
                                  resizable: false })

   form_win.loadURL(url.format({
     pathname: path.join(__dirname, '../speed_controller.html'),
     protocol: 'file:',
     slashes: true
   }))

   form_win.setMenu(null)

   form_win.on('closed', () => {
      form_win = null
   })

   ipcMain.on('item:speed', (e, speed) => {
      speed = speed * 7
      main_win.webContents.send('item:speed', speed)
   })
}

const activation = new MenuItem({
   label: 'Stop',
   accelerator: 'Ctrl+X',
   click() {
      let label = mainMenu.items[0].submenu.items[0].label
      let send_msg = label == 'Start' ? true : false
      activation.label = label == 'Start' ? 'Stop' : 'Start'
      setMenuTemplate()
      main_win.webContents.send('item:activate', send_msg)
   }
})

const control_speed = new MenuItem({
   label: 'Control Speed',
   accelerator: 'Ctrl+C',
   click(){
      createFormWindow()
   }
})

const reset_count = new MenuItem({
   label: 'Reset Count',
   accelerator: 'Ctrl+Z',
   click(){
      main_win.webContents.send('item:reset')
   }
})

const quit = new MenuItem({
   label: 'Quit',
   accelerator: 'Escape',
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
       quit
     ] }
]

if(process.platform == 'darwin'){
   mainMenuTemplate.unshift({})
}

if(process.env.NODE_ENV != 'production'){
   const dev_tool =  {
       label: 'Google Console',
       accelerator: 'Ctrl+Alt+I',
       click(item, focusedWindow){
         focusedWindow.toggleDevTools();
      }
   }

   const reload = {
      accelerator: 'F5',
      role: 'reload'
   }

   const dev_menus = {
      label: 'DevTools',
      submenu: [
         dev_tool,
         reload
      ]
   }
   mainMenuTemplate.push(dev_menus)
}

let mainMenu
const setMenuTemplate = () => {
   mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
   Menu.setApplicationMenu(mainMenu)
}

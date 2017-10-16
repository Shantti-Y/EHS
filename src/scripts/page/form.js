const methods = require('./methods.js')
const { ipcRenderer } = window.require('electron')

let status = methods.status

window.addEventListener('load', () => {
   let input = document.getElementById('speed-form')
   input.value = Math.round(status.interval / 7)
   const btn = document.getElementById('impliment')

   btn.addEventListener('click', (e) =>{
      e.preventDefault()
      ipcRenderer.send('item:speed', input.value)
   })
})

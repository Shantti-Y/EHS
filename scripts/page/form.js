const { ipcRenderer } = window.require('electron')
const jsonfile = window.require('jsonfile')

const file = './src/status.json'
let status = jsonfile.readFileSync(file)

window.addEventListener('load', () => {
   let input = document.getElementById('speed-form')
   input.value = status.interval / 7
   const btn = document.getElementById('impliment')

   btn.addEventListener('click', (e) =>{
      e.preventDefault()
      const speed = input.value
      ipcRenderer.send('item:speed', speed)
   })
})

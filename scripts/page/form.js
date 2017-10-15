const { ipcRenderer } = window.require('electron')

window.addEventListener('load', () => {
   const input = document.getElementById('speed-form')
   const btn = document.getElementById('impliment')

   btn.addEventListener('click', (e) =>{
      e.preventDefault()
      const speed = input.value
      ipcRenderer.send('item:speed', speed)
   })
})

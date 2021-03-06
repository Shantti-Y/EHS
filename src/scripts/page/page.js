const methods = require('./methods.js')
const {Pointer, Unit, MeterBar} = require('./class.js')
const { ipcRenderer } = window.require('electron')

let status = methods.status

window.addEventListener('load', () => {
   // Initial objects on gas meter
   let pointer = new Pointer(document.getElementById('pointer'), -10)
   const meter_bar = new MeterBar(document.getElementById('meter-bar'))

   // Initializing units
   let units = new Array()
   let unit_elements = document.getElementsByClassName('unit')

   for(let i = 0; i < 5; i++){
      // element property in Unit class gets span tag inside li.unit
      let digit = i + 1
      let unit_element = unit_elements[unit_elements.length - digit].children[0]
      if(i > 0){
         let position = -1 * (units[i - 1].number * 3) - 1
         unit_element.style.top = position + 'px'
      }
      units[i] = new Unit(unit_element, digit, status.counts[i])
      units[i].insertNumber()
   }

   const isApproachedTo10 = (key) => {
      let unit = units[key]

      // While the pointer tag goes to the edge of its movement range,
      // each unit goes up to the beyond its flame.
      // Their speed are calculated by the following formula.
      let calc = Math.floor(meter_bar.width() / unit.height()) * (10 ** unit.digit)
      if(pointer_distance % calc == 0){
         let unit_position = methods.returnToBeginning(unit.element.offsetTop, unit.top(), unit.bottom(), 'minus')
         if(unit_position == unit.bottom()){
            unit.number += 1
            unit.insertNumber()
            methods.updateCountStatus(units, key)
         }
         unit.element.style.top = unit_position + 'px'
         key += 1
         if(key == units.length){
            return true
         }
         isApproachedTo10(key)
      }
   }

   // main function
   let pointer_distance = 0
   const moveItems = () => {
      pointer_distance += 1
      pointer.moveToRight(meter_bar.left(), meter_bar.right())
      isApproachedTo10(0)
   }

   let interval = status.interval
   let controlInterval = setInterval(moveItems, interval)
   let activated = true
   // events from main process
   ipcRenderer.on('item:activate', (e, item) => {
      if(item == true){
         controlInterval = setInterval(moveItems, interval)
         activated = true
      }else{
         clearInterval(controlInterval)
         activated = false
      }
   })

   ipcRenderer.on('item:speed', (e, speed) => {
      interval = Math.round(speed * 7)
      methods.updateIntervalStatus(interval)
      clearInterval(controlInterval)
      if(activated == true){
         controlInterval = setInterval(moveItems, interval)
      }
   })

   ipcRenderer.on('item:reset', (e)  => {
      for(let key in units){
         let unit = units[key]
         unit.number = 0
         unit.insertNumber()
         unit.element.style.top = '5px'
      }
      pointer_distance = 0
      pointer.position = -10
      pointer.element.style.left = '-10px'
   })
})

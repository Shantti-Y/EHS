const methods = require('./methods.js')

const classes = require('./class.js')
const Pointer = classes.Pointer
const Unit = classes.Unit
const MeterBar = classes.MeterBar

window.addEventListener('load', () => {

   // Initial properties
   let pointer = new Pointer(document.getElementById('pointer'), 0)
   const meter_bar = new MeterBar(document.getElementById('meter-bar'))

   // Initializing units
   let units = new Array()
   let unit_elements = document.getElementsByClassName('unit')

   for(let i = 0; i < 5; i++){
      // element property in Unit class gets span tag inside li.unit
      let digit = i + 1
      let unit_element = unit_elements[unit_elements.length - digit].children[0]
      units[i] = new Unit(unit_element, digit, 0)
   }

   const isApproachedTo10 = (key) => {
      let unit = units[key]

      // While the pointer tag goes to the edge of its movement range,
      // each unit goes up to the beyond its flame.
      // Their speed are calculated by the following formula.
      let calc = Math.floor(meter_bar.dimension().width / unit.dimension().height) * (10 ** unit.digit)

      if(pointer_distance % calc == 0){
         let unit_position = methods.returnToBeginning(unit.element.offsetTop, unit.dimension().top, unit.dimension().bottom, 'minus')
         if(unit_position == unit.dimension().bottom){
            unit.number += 1
            unit.insertNumber()
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

   let intervalController = setInterval(() => {
      pointer_distance += 1
      pointer.moveToRight(meter_bar.dimension().left, meter_bar.dimension().right)
      isApproachedTo10(0)
   }, 0.001)
})

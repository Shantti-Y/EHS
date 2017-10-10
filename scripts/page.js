
window.addEventListener('load', () => {

   class Unit {
      constructor(digit, element, number){
         this.digit = digit
         this.element = element
         this.number = number
      }

      insertNumber (){
         if(this.number == 10){
            this.number = 0
         }
         if(this.number == 9){
            this.element.innerHTML = this.number + '<br>' + 0
         }else{
            this.element.innerHTML = this.number + '<br>' + (this.number + 1)
         }
      }
   }

   // Initial properties
   let pointer = document.getElementById('pointer')
   const meter_bar = document.getElementById('meter-bar')
   const EDGE_LEFT = -10
   const EDGE_RIGHT = meter_bar.getBoundingClientRect().width
   let x = 0

   let units = new Array()
   let unit_elements = document.getElementsByClassName('unit')

   const UNIT_BOTTOM = 5
   const UNIT_TOP = (-1 * unit_elements[0].getBoundingClientRect().height) + 18

   for(let i = 0; i < 5; i++){
      // element property in Unit class gets span tag inside li.unit
      let digit = i + 1
      let unit_element = unit_elements[unit_elements.length - digit].children[0]
      units[i] = new Unit(digit, unit_element, 0)
   }

   let y = 0

   const returnToBeginning = (position, limit, beginning, unit) => {
      if(position == limit){
         position = beginning
      }else{
         position = unit == 'plus' ? position += 1 : position -= 1
      }
      return position
   }

   const UNIT_HEIGHT = unit_elements[0].getBoundingClientRect().height
   const METER_WIDTH = meter_bar.getBoundingClientRect().width + 10

   const isApproachedTo10 = (key) => {
      let unit = units[key]
      let calc = Math.floor(METER_WIDTH / UNIT_HEIGHT) * (10 ** unit.digit)
      if(y % calc == 0){
         let unit_position = returnToBeginning(unit.element.offsetTop, UNIT_TOP, UNIT_BOTTOM, 'minus')
         if(unit_position == UNIT_BOTTOM){
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

   const moveUnit = () => {
      isApproachedTo10(0)
   }

   const movePointer = () => {
      y += 1
      x = returnToBeginning(x, EDGE_RIGHT, EDGE_LEFT, 'plus')
      pointer.style.left = x + 'px'
      moveUnit()
   }

   let intervalController = setInterval(() => {
      movePointer()
   }, 0.25)
})

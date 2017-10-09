
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
         this.element.innerHTML = this.number
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
   const UNIT_BOTTOM = unit_elements[0].getBoundingClientRect().height - 6
   const UNIT_TOP = -1 * (UNIT_BOTTOM - 6)

   for(let i = 0; i < 5; i++){
      // element property in Unit class gets span tag inside li.unit
      let digit = i + 1
      let unit_element = unit_elements[unit_elements.length - digit].children[0]
      units[i] = new Unit(digit, unit_element, 0)
      console.log(units[i].element.offsetTop)
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

   let unit_position = 0
   const moveUnit = () => {
      for(let key in units){
         let unit = units[key]
         if(y % (10 ** unit.digit) == 0){
            unit_position = returnToBeginning(unit.element.offsetTop, UNIT_TOP, UNIT_BOTTOM, 'minus')
            if(unit_position == UNIT_BOTTOM){
               unit.number += 1
               unit.insertNumber()
            }
            unit.element.style.top = unit_position + 'px'
         }
      }
   }

   const movePointer = () => {
      y += 1
      x = returnToBeginning(x, EDGE_RIGHT, EDGE_LEFT, 'plus')
      pointer.style.left = x + 'px'
      moveUnit()
   }

   setInterval(() => {
         movePointer()
   }, 2)
})

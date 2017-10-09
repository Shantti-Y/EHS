
window.addEventListener('load', () => {

   class Unit {
      constructor(digit, element){
         this.digit = digit
         this.element = element
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
   const UNIT_BOTTOM = unit_elements[0].getBoundingClientRect().height + 6
   const UNIT_TOP = -1 * (UNIT_BOTTOM + 6)

   for(let i = 0; i < 5; i++){
      // element property in Unit class gets span tag inside li.unit
      let digit = i + 1
      let unit_element = unit_elements[unit_elements.length - digit].children[0]
      units[i] = new Unit(digit, unit_element)
      console.log(units[i].element.offsetTop)
   }

   let y = 0
   const moveUnit = () => {
      for(let key in units){
         let unit = units[key]
         if(y % (5 ** unit.digit) == 0){
            let unit_position = unit.element.offsetTop - 1
            if(unit_position == UNIT_TOP){
               unit_position = UNIT_BOTTOM
            }
            unit.element.style.top = unit_position + 'px'
         }

      }
   }

   const movePointer = () => {
      if(x == EDGE_RIGHT){
         x = EDGE_LEFT
      }else{
         x += 1
      }
      y += 1
      pointer.style.left = x + 'px'
      moveUnit()
   }

   setInterval(() => {
         movePointer()
   }, 5)


   // 5桁のメーターをいじる

})

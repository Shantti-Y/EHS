
window.addEventListener('load', () => {

   class Unit {
      constructor(element, digit, number){
         this.element = element
         this.digit = digit
         this.number = number
      }

      dimension(){
         return {
            width:   this.element.parentElement.getBoundingClientRect().width,
            height:  this.element.parentElement.getBoundingClientRect().height,
            top:     (-1 * (this.element.parentElement.getBoundingClientRect().height)) + 18,
            bottom:  5
         }
      }

      insertNumber (){
         let next_number = this.number + 1
         if(this.number == 10){
            this.number = 0
            next_number = 1
         }else if(this.number == 9){
            next_number = 0
         }
         this.element.innerHTML = this.number + '<br>' + next_number
      }
   }

   class Pointer {
      constructor(element, position){
         this.element = element
         this.position = position
      }

      dimension(){
         return {
            width:   this.element.getBoundingClientRect().height,
            height:  this.element.getBoundingClientRect().width
         }
      }

      moveToRight(start_point, end_point){
         this.position = returnToBeginning(this.position, end_point, start_point, 'plus')
         this.element.style.left = this.position + 'px'
      }
   }

   class MeterBar {
      constructor(element){
         this.element = element
      }

      dimension(){
         return {
            width:   this.element.getBoundingClientRect().width + 10,
            left:    -10,
            right:   this.element.getBoundingClientRect().width
         }
      }
   }

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

   // going to be in module file
   const returnToBeginning = (position, limit, beginning, unit) => {
      if(position == limit){
         position = beginning
      }else{
         position = unit == 'plus' ? position += 1 : position -= 1
      }
      return position
   }

   const isApproachedTo10 = (key) => {
      let unit = units[key]

      // While the pointer tag goes to the edge of its movement range,
      // each unit goes up to the beyond its flame.
      // Their speed are calculated by the following formula.
      let calc = Math.floor(meter_bar.dimension().width / unit.dimension().height) * (10 ** unit.digit)

      if(y % calc == 0){
         let unit_position = returnToBeginning(unit.element.offsetTop, unit.dimension().top, unit.dimension().bottom, 'minus')
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

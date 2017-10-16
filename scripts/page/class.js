const methods = require('./methods.js')

const Unit = class Unit {
   constructor(element, digit, number){
      this.element = element
      this.digit = digit
      this.number = number
   }

   // Unit object's dimansional property
   width(){ return this.element.parentElement.getBoundingClientRect().width }
   height(){ return this.element.parentElement.getBoundingClientRect().height }
   // Unit object's positional property
   top(){ return (-1 * (this.element.parentElement.getBoundingClientRect().height)) + 2 }
   bottom(){ return -1 }

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

const Pointer = class Pointer {
   constructor(element, position){
      this.element = element
      this.position = position
   }

   // Pointer object's dimansional property
   width(){ return this.element.getBoundingClientRect().width }
   height(){ return this.element.getBoundingClientRect().height }

   moveToRight(start_point, end_point){
      this.position = methods.returnToBeginning(this.position, end_point, start_point, 'plus')
      this.element.style.left = this.position + 'px'
   }
}

const MeterBar = class MeterBar {
   constructor(element){
      this.element = element
   }

   // MeterBar object's dimansional property
   width(){ return this.element.getBoundingClientRect().width + 10 }
   left(){ return -10 }
   right(){ return this.element.getBoundingClientRect().width }
}

module.exports = { Unit, Pointer, MeterBar }

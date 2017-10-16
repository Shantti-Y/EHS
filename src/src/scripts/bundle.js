(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./methods.js":3}],2:[function(require,module,exports){
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

},{"./methods.js":3}],3:[function(require,module,exports){
const jsonfile = window.require('jsonfile')

const file = './src/src/status.json'
let status = jsonfile.readFileSync(file)

const returnToBeginning = (position, limit, beginning, unit) => {
   if(position == limit){
      position = beginning
   }else{
      position = unit == 'plus' ? position += 1 : position -= 1
   }
   return position
}

const updateIntervalStatus = (interval) => {
   status.interval = interval
   jsonfile.writeFileSync(file, status)
}

const updateCountStatus = (units, key) => {
   status.counts[key] = units[key].number
   jsonfile.writeFileSync(file, status)
}

module.exports = { status, returnToBeginning, updateIntervalStatus, updateCountStatus }

},{}],4:[function(require,module,exports){
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

},{"./class.js":1,"./methods.js":3}]},{},[4,2]);

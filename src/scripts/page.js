'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.addEventListener('load', function () {
   var Unit = function () {
      function Unit(element, digit, number) {
         _classCallCheck(this, Unit);

         this.element = element;
         this.digit = digit;
         this.number = number;
      }

      _createClass(Unit, [{
         key: 'dimension',
         value: function dimension() {
            return {
               width: this.element.parentElement.getBoundingClientRect().width,
               height: this.element.parentElement.getBoundingClientRect().height,
               top: -1 * this.element.parentElement.getBoundingClientRect().height + 18,
               bottom: 5
            };
         }
      }, {
         key: 'insertNumber',
         value: function insertNumber() {
            var next_number = this.number + 1;
            if (this.number == 10) {
               this.number = 0;
               next_number = 1;
            } else if (this.number == 9) {
               next_number = 0;
            }
            this.element.innerHTML = this.number + '<br>' + next_number;
         }
      }]);

      return Unit;
   }();

   var Pointer = function () {
      function Pointer(element, position) {
         _classCallCheck(this, Pointer);

         this.element = element;
         this.position = position;
      }

      _createClass(Pointer, [{
         key: 'dimension',
         value: function dimension() {
            return {
               width: this.element.getBoundingClientRect().height,
               height: this.element.getBoundingClientRect().width
            };
         }
      }, {
         key: 'moveToRight',
         value: function moveToRight(start_point, end_point) {
            this.position = returnToBeginning(this.position, end_point, start_point, 'plus');
            this.element.style.left = this.position + 'px';
         }
      }]);

      return Pointer;
   }();

   var MeterBar = function () {
      function MeterBar(element) {
         _classCallCheck(this, MeterBar);

         this.element = element;
      }

      _createClass(MeterBar, [{
         key: 'dimension',
         value: function dimension() {
            return {
               width: this.element.getBoundingClientRect().width + 10,
               left: -10,
               right: this.element.getBoundingClientRect().width
            };
         }
      }]);

      return MeterBar;
   }();

   // Initial properties


   var pointer = new Pointer(document.getElementById('pointer'), 0);
   var meter_bar = new MeterBar(document.getElementById('meter-bar'));

   // Initializing units
   var units = new Array();
   var unit_elements = document.getElementsByClassName('unit');

   for (var i = 0; i < 5; i++) {
      // element property in Unit class gets span tag inside li.unit
      var digit = i + 1;
      var unit_element = unit_elements[unit_elements.length - digit].children[0];
      units[i] = new Unit(unit_element, digit, 0);
   }

   // going to be in module file
   var returnToBeginning = function returnToBeginning(position, limit, beginning, unit) {
      if (position == limit) {
         position = beginning;
      } else {
         position = unit == 'plus' ? position += 1 : position -= 1;
      }
      return position;
   };

   var isApproachedTo10 = function isApproachedTo10(key) {
      var unit = units[key];

      // While the pointer tag goes to the edge of its movement range,
      // each unit goes up to the beyond its flame.
      // Their speed are calculated by the following formula.
      var calc = Math.floor(meter_bar.dimension().width / unit.dimension().height) * 10 ** unit.digit;

      if (y % calc == 0) {
         var unit_position = returnToBeginning(unit.element.offsetTop, unit.dimension().top, unit.dimension().bottom, 'minus');
         if (unit_position == unit.dimension().bottom) {
            unit.number += 1;
            unit.insertNumber();
         }
         unit.element.style.top = unit_position + 'px';
         key += 1;
         if (key == units.length) {
            return true;
         }
         isApproachedTo10(key);
      }
   };

   // main function
   var pointer_distance = 0;

   var intervalController = setInterval(function () {
      pointer_distance += 1;
      pointer.moveToRight(meter_bar.dimension().left, meter_bar.dimension().right);
      isApproachedTo10(0);
   }, 0.001);
});

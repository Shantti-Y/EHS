'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.addEventListener('load', function () {
   var Unit = function () {
      function Unit(digit, element, number) {
         _classCallCheck(this, Unit);

         this.digit = digit;
         this.element = element;
         this.number = number;
      }

      _createClass(Unit, [{
         key: 'insertNumber',
         value: function insertNumber() {
            if (this.number == 10) {
               this.number = 0;
            }
            if (this.number == 9) {
               this.element.innerHTML = this.number + '<br>' + 0;
            } else {
               this.element.innerHTML = this.number + '<br>' + (this.number + 1);
            }
         }
      }]);

      return Unit;
   }();

   // Initial properties


   var pointer = document.getElementById('pointer');
   var meter_bar = document.getElementById('meter-bar');
   var EDGE_LEFT = -10;
   var EDGE_RIGHT = meter_bar.getBoundingClientRect().width;
   var x = 0;

   var units = new Array();
   var unit_elements = document.getElementsByClassName('unit');

   var UNIT_BOTTOM = 5;
   var UNIT_TOP = -1 * unit_elements[0].getBoundingClientRect().height + 18;

   for (var i = 0; i < 5; i++) {
      // element property in Unit class gets span tag inside li.unit
      var digit = i + 1;
      var unit_element = unit_elements[unit_elements.length - digit].children[0];
      units[i] = new Unit(digit, unit_element, 0);
   }

   var y = 0;

   var returnToBeginning = function returnToBeginning(position, limit, beginning, unit) {
      if (position == limit) {
         position = beginning;
      } else {
         position = unit == 'plus' ? position += 1 : position -= 1;
      }
      return position;
   };

   var UNIT_HEIGHT = unit_elements[0].getBoundingClientRect().height;
   var METER_WIDTH = meter_bar.getBoundingClientRect().width + 10;

   var isApproachedTo10 = function isApproachedTo10(key) {
      var unit = units[key];
      var calc = Math.floor(METER_WIDTH / UNIT_HEIGHT) * 10 ** unit.digit;
      if (y % calc == 0) {
         var unit_position = returnToBeginning(unit.element.offsetTop, UNIT_TOP, UNIT_BOTTOM, 'minus');
         if (unit_position == UNIT_BOTTOM) {
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

   var moveUnit = function moveUnit() {
      isApproachedTo10(0);
   };

   var movePointer = function movePointer() {
      y += 1;
      x = returnToBeginning(x, EDGE_RIGHT, EDGE_LEFT, 'plus');
      pointer.style.left = x + 'px';
      moveUnit();
   };

   var intervalController = setInterval(function () {
      movePointer();
   }, 0.25);
});

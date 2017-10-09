'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.addEventListener('load', function () {
   var Unit = function Unit(digit, element) {
      _classCallCheck(this, Unit);

      this.digit = digit;
      this.element = element;
   };

   // Initial properties


   var pointer = document.getElementById('pointer');
   var meter_bar = document.getElementById('meter-bar');
   var EDGE_LEFT = -10;
   var EDGE_RIGHT = meter_bar.getBoundingClientRect().width;
   var x = 0;

   var units = new Array();
   var unit_elements = document.getElementsByClassName('unit');
   var UNIT_BOTTOM = unit_elements[0].getBoundingClientRect().height + 6;
   var UNIT_TOP = -1 * (UNIT_BOTTOM + 6);

   for (var i = 0; i < 5; i++) {
      // element property in Unit class gets span tag inside li.unit
      var digit = i + 1;
      var unit_element = unit_elements[unit_elements.length - digit].children[0];
      units[i] = new Unit(digit, unit_element);
      console.log(units[i].element.offsetTop);
   }

   var y = 0;
   var moveUnit = function moveUnit() {
      for (var key in units) {
         var unit = units[key];
         if (y % 5 ** unit.digit == 0) {
            var unit_position = unit.element.offsetTop - 1;
            if (unit_position == UNIT_TOP) {
               unit_position = UNIT_BOTTOM;
            }
            unit.element.style.top = unit_position + 'px';
         }
      }
   };

   var movePointer = function movePointer() {
      if (x == EDGE_RIGHT) {
         x = EDGE_LEFT;
      } else {
         x += 1;
      }
      y += 1;
      pointer.style.left = x + 'px';
      moveUnit();
   };

   setInterval(function () {
      movePointer();
   }, 5);

   // 5桁のメーターをいじる
});

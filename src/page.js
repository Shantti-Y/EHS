'use strict';

window.addEventListener('load', function () {

   // Initial properties
   var pointer = document.getElementById('pointer');
   var meter_bar = document.getElementById('meter-bar');
   var EDGE_LEFT = -10;
   var EDGE_RIGHT = meter_bar.getBoundingClientRect().width;
   var x = 0;

   var movePointerToRight = function movePointerToRight() {
      x += 1;
      pointer.style.left = x + 'px';
   };

   setInterval(function () {
      if (x == EDGE_RIGHT) {
         x = EDGE_LEFT;
      } else {
         movePointerToRight();
      }
   }, 5);
});

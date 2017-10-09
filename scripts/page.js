
window.addEventListener('load', () => {

   // Initial properties
   let pointer = document.getElementById('pointer')
   const meter_bar = document.getElementById('meter-bar')
   const EDGE_LEFT = -10
   const EDGE_RIGHT = meter_bar.getBoundingClientRect().width
   let x = 0

   const movePointerToRight = () => {
      x += 1
      pointer.style.left = x + 'px'
   }

   setInterval(() => {
      if(x == EDGE_RIGHT){
         x = EDGE_LEFT
      }else{
         movePointerToRight()
      }
   }, 5)

})

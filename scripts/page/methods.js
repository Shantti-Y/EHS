const returnToBeginning = (position, limit, beginning, unit) => {
   if(position == limit){
      position = beginning
   }else{
      position = unit == 'plus' ? position += 1 : position -= 1
   }
   return position
}

module.exports = { returnToBeginning }

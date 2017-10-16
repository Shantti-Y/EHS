const jsonfile = window.require('jsonfile')

const file = './src/status.json'
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

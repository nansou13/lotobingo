export const create90array = (length = 90) => Array.from({length}, (_, i) => i + 1)
export const getRandomFromRange = (min, max) => Math.floor(Math.random()*(max-min+1)+min);
export const getDizaineArray = () => Array.from({length:9}, (_, i) => i).reduce((acc, current) => ({...acc, [current]: []}), {})
export const takeNremoveElmtFromArray = (array) => {
  if(array.length === 1){
    return {index: 0, value: array[0], newArray: []} 
  }else{
    const rand = Math.random()*array.length;
    const indx = Math.floor(rand);
    return {index: indx, value: array[indx], newArray: array.filter(e => e !== array[indx])} 
  }
}
export const convertArrayToArrayDizaine = (arrayValues) => {
  return arrayValues.reduce((acc, value) => {
    const dizaine = value < 10 ? 0 : Math.floor(value/10)
      const dizaineIndx = dizaine === 9 ? 8 : dizaine
      acc[dizaineIndx].push(value)
      return acc;
  }, getDizaineArray())
}

export const convertArrayDizaineToArray = (arrayDizaine, idsHidden) => {
  return Object.values(arrayDizaine).reduce((acc, current, id) => ( idsHidden.includes(id) ? acc : [...acc, ...current]), [])
}



export const getCartonValues = (valuesSelected, fullArray) => {
    const dizaineArray = convertArrayToArrayDizaine(valuesSelected)
    if(valuesSelected.length<15){
      const {value, newArray} = takeNremoveElmtFromArray(fullArray)
      //check si deja plus de 3 element dans les dizaines
      const dizaine = value < 10 ? 0 : Math.floor(value/10)
      const dizaineIndx = dizaine === 9 ? 8 : dizaine
      if(dizaineArray[dizaineIndx].length<3){
        return getCartonValues([...valuesSelected, value], newArray)
      }else{
        return getCartonValues(valuesSelected, fullArray)
      }
    }else{
      return valuesSelected
    }
  }

  export const getLineValues = (values, arrayValues, nb = 5) => {
    const dizaineArray = convertArrayToArrayDizaine(values)
    if(values.length<nb){
      const {value, newArray} = takeNremoveElmtFromArray(arrayValues)
      const dizaine = value < 10 ? 0 : Math.floor(value/10)
      const dizaineIndx = dizaine === 9 ? 8 : dizaine
      
      if(dizaineArray[dizaineIndx].length===0){
        return getLineValues([...values, value], newArray, nb)
      }else{
        return getLineValues(values, arrayValues, nb)
      }
    }else{
      return values
    }
  }

  export const formatLineValues = (values) => {
    let valuesG = [...values]
    const finalArray = []
    for (let i = 3; i > 0; i--) {
      let cartonDizaineObject = convertArrayToArrayDizaine(valuesG)
      const lineArray = []
      
      const idHidden = []
    for (let j = 0; j <=8 ; j++) {
        if(cartonDizaineObject[j].length === i ){
          const {value, newArray} = takeNremoveElmtFromArray(cartonDizaineObject[j])
          cartonDizaineObject = {...cartonDizaineObject, [j]:newArray}
          lineArray.push(value)
          idHidden.push(j)
        }
        
      }
    const filteredValuesInArray = convertArrayDizaineToArray(cartonDizaineObject, idHidden)
    const dizaineArray = getLineValues(lineArray, filteredValuesInArray)
    finalArray.push(convertArrayToArrayDizaine(dizaineArray))
    valuesG = valuesG.filter((e) => !dizaineArray.includes(e))
    }
  
  return finalArray;
  }

export const getAllCartonNumber = () => {
  const cartonNumber = [];
  const dizaineArray = getDizaineArray();
  const fullNumberArray = create90array();
    //pour etre sur d'avoir chaque dizaine
    const firstNumerRandom = [
      getRandomFromRange(1,9),
      getRandomFromRange(10,19),
      getRandomFromRange(20,29),
      getRandomFromRange(30,39),
      getRandomFromRange(40,49),
      getRandomFromRange(50,59),
      getRandomFromRange(60,69),
      getRandomFromRange(70,79),
      getRandomFromRange(80,90),
    ]

    firstNumerRandom.map((val, index) => {
      cartonNumber.push(val);
      dizaineArray[index].push(val)
    })
    
    const cartonNumerList = getCartonValues(firstNumerRandom, fullNumberArray.filter(e => !firstNumerRandom.includes(e)))
    const cartonFormattedValues = formatLineValues(cartonNumerList)
    return cartonFormattedValues
} 
import { SCNumber, SCNumberCol, SCNumberCols, SCCurrentNumber } from './style'
import {create90array} from '../../Utils/function'

function chunkArray(myArray, chunk_size){
  var results = [];
  
  while (myArray.length) {
      results.push(myArray.splice(0, chunk_size));
  }
  
  return results;
}

// import './App.css';
const Numbers = ({values, current}) => {
  const numberList = chunkArray(create90array(), 10)
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <SCNumberCols>
      {
        numberList && numberList.map(line => (
          <SCNumberCol>
            {
              line && line.map(number => (
                <SCNumber selected={values.includes(number)}>{number}</SCNumber>
              ))
            }
          </SCNumberCol>
        ))
      }
      </SCNumberCols>
      <SCCurrentNumber>{current}</SCCurrentNumber>
      </div>
  );
}

export default Numbers;

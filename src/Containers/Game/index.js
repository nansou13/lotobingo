import { useState, useEffect } from 'react'
import { sendMessage, refreshCurrentNumber } from '../../socket';
import Carton from '../../Components/Carton'
import Numbers from '../../Components/Numbers'

const Game = () => {
  const [currentNumber, setCurrentNumber] = useState(false)
  const [alreadyTaken, setAlreadyTaken] = useState([])

  const myCarton = JSON.parse(localStorage.getItem('lb-mycarton')) || []
  
const onRefreshNumber = ({value, taken}) => {
  setCurrentNumber(value)
  setAlreadyTaken(taken)
}

  useEffect(() => {
    refreshCurrentNumber(onRefreshNumber); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className="Game">
      <h2 onClick={()=> sendMessage('StartGame')}>Start....</h2>
      <Numbers values={alreadyTaken} current={currentNumber}/>
      
      <div>
        {
            myCarton && myCarton.map((carton, i) => <Carton numbers={carton}/>)
        }
      </div>
    </div>
  );
}

export default Game;


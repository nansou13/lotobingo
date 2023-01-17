import {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom"
import { getAllCartonNumber } from '../../Utils/function'
import Carton from '../../Components/Carton'
import { updateUserList, sendMessage, startingGame } from '../../socket';
const Lobby = ({user}) => {

    const history = useHistory()

    const [userList, setUserList] = useState([])
    const [myCarton, setMyCarton] = useState(JSON.parse(localStorage.getItem('lb-mycarton')) || [])

    const OnStartingGame = () => {
      history.push("/game")
    }
    const OnUpdateUserList = (players) => {
        console.log(players)
        setUserList(players)
    }

    const addOrUpdateCarton = (index = false) => {
      const cartonNumber = getAllCartonNumber()
      console.log({cartonNumber})
      if(index === false) {
        setMyCarton([...myCarton, cartonNumber])
      } else {
        const newArray = [...myCarton]
        newArray[index] = cartonNumber
        setMyCarton(newArray)
      }
      console.log(myCarton)
    }

    const removeMyCarton = (index) => {
      setMyCarton(myCarton.filter((v, i) => i !== index))
    }
    useEffect(() => {
        updateUserList(OnUpdateUserList); // Nouveau vote
        startingGame(OnStartingGame); // Nouveau vote
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    useEffect(() => {
      localStorage.setItem('lb-mycarton', JSON.stringify(myCarton))
      sendMessage('AddUpdateUserCarton', {cartons : myCarton})
    }, [myCarton]);
  return (
    <div className="Lobby">
      <h1>Bonjour, {user.name}</h1>
      <h2 onClick={()=> sendMessage('StartGame')}>Start....</h2>
      <h2>Mon/mes cartons</h2>
        <div onClick={()=> addOrUpdateCarton(false)}>Ajouter un carton</div>
        <div>
          {
            myCarton && myCarton.map((carton, i) => <div><Carton numbers={carton}/><span onClick={() => addOrUpdateCarton(i)}>Update</span><span onClick={() => removeMyCarton(i)}>Remove</span></div>)
          }
        </div>
      <div>
          <h3>Participant</h3>
          <div>
              {userList && userList.map(({name}) => (<div>{name}{name === user.name && '*'}</div>))}
          </div>
      </div>
      
    </div>
  );
}

export default Lobby;


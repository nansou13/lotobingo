import {useState, useEffect} from 'react'
import { sendMessage, userAdded } from '../../socket';
const Register = ({setRegistered}) => {
    const [name, setName] = useState(false)
    const onSubmit = () => {
      sendMessage('addUser', {name})
        //call server node et on reception le retour pour sauvegarder tout dans setRegistered
    }

    const OnValidate = (values) => {
      console.log('validated::', values)
      setRegistered(values)
    }

    useEffect(() => {
      userAdded(OnValidate); // Nouveau vote
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
  return (
    <div>
        Your name : <input type="text" value={name || ''} onChange={({target : {value}}) => setName(value)}/>
        <input type="submit" value="Valider" onClick={onSubmit}/>
    </div>
  );
}

export default Register;


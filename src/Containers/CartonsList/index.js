import Carton from '../../Components/Carton'
// import CartonDavid from '../../Components/CartonDavid'
// import { sendMessage } from './socket';
const CartonList = () => {

  return (
    <div className="App">
      <h1>Mon carton</h1>
      <div style={{

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'

      }}>

      <Carton/>
      {/* <CartonDavid/> */}
      </div>
      
    </div>
  );
}

export default CartonList;


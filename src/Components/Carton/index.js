import { SCCartonLine, SCCarton } from './style'
import NumberContent from './NumberContent'

// import './App.css';
const Carton = ({numbers}) => {
  return (
      <SCCarton>
      {
        numbers && numbers.map(line => (
          <SCCartonLine>
            {
              line && Object.values(line).map(number => (
                <NumberContent value={number[0]}/>
              ))
            }
          </SCCartonLine>
        ))
      }
      </SCCarton>
  );
}

export default Carton;

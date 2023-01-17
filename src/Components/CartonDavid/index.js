import { SCCartonLine, SCCarton } from './style'
import NumberContent from './NumberContent'

// import './App.css';


const david = () => {
  const rand = (max) => Math.floor(Math.random() * max);

const card = [
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
];

card.forEach ((e, i) => {
        let count = 0;
        while (count < 5) {
          const c = rand (9);
        if (card[i][c] == 0) {
            card[i][c] = -1;
          count ++;
        }
        }
  });
    
    for (var j = 0; j < 9; j ++) {
        const skip = [];
      for (var i = 0; i < 3; i ++) {
        if (card[i][j] == -1) {
           let c = rand(9) + 1;
          while (skip.includes(c))
                c = rand(9) + 1;           
          
          skip.push (c);
          card[i][j] = 10 * j + c;
        }
      }
    }
  console.log(card);
return card
  }




const CartonDavid = () => {
const carton = david()
  return (
      <SCCarton>
      {
        carton && carton.map(line => (
          <SCCartonLine>
            {
              line && line.map(number => (
                <NumberContent value={number}/>
              ))
            }
          </SCCartonLine>
        ))
      }
      </SCCarton>
  );
}

export default CartonDavid;

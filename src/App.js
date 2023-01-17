import {useState} from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Lobby from './Containers/Lobby'
import Register from './Containers/Register'
import CartonList from './Containers/CartonsList'
import Game from './Containers/Game'
// import { sendMessage } from './socket';
const App = () => {
  const [isConnected, setIsConnected] = useState(false)
  console.log('isConnected', isConnected, isConnected?'true': 'false')
  return (
    <Router>
    <div className="App">
        <Switch>
          <Route exact path="/carton">
            <CartonList />
          </Route>
          <Route exact path="/">
            {isConnected ? <Redirect to="/mycarton" /> : <Redirect to="/register" /> }
          </Route>
          <Route exact path="/lobby">
            <Lobby user={isConnected} />
          </Route>
          <Route exact path="/game">
            <Game />
          </Route>
          <Route exact path="/register">
            {isConnected ? <Redirect to="/lobby" /> : <Register setRegistered={setIsConnected} />} 
          </Route>
          {/* <Route path="/:id/admin">
            <>
              <Admin />
              <Board isAdmin />
            </>
          </Route>
          <Route path="/:id">
            <>
              <Board />
            </>
          </Route> */}
        </Switch>
      </div>
  </Router>
  );
}

export default App;

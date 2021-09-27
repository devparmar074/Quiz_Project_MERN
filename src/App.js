//import logo from './logo.svg';
import './App.css';
import { useState} from "react";
import Homepage from './Homepage/Homepage';
import Login from './Login/Login';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Register from './Register/Register';


function App() {

  const[ user, setLoginUser] = useState({})
  return (
    <div align="center">
      <Router>
        <Switch>
          <Route exact path="/">
            {
              user && user._id ? <Homepage setLoginUser = {setLoginUser} /> : <Login setLoginUser={setLoginUser} />
               
            }
            
          </Route>
          <Route exact path="/Login"><Login setLoginUser={setLoginUser} /></Route>
          <Route exact path="/Register"><Register /></Route>
          <Route exact path="/Home"><Homepage /></Route>

        </Switch>
      </Router>
      {/* <Homepage/>
      {/* <Login/> */}
      {/* <Register/> */} 

    </div>
  );
}

export default App;

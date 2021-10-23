//import logo from './logo.svg';
import './App.css';
import { useState} from "react";
//import Homepage from './Homepage/Homepage';
import Login from './Login/Login';
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Register from './Register/Register';
import QuestionCategory from './pages/QuestionCategory';
import Questions from './pages/Questions';

function App() {

  const[ user, setLoginUser] = useState({})
  return (
    <div align="center" >

      <Container>
      <Router>
        <Switch>
          <Route exact path="/">
            {
              user && user._id ? <QuestionCategory setLoginUser = {setLoginUser} /> : <Login setLoginUser={setLoginUser} />
               
            }
            
          </Route>
          <Route exact path="/Login"><Login setLoginUser={setLoginUser} /></Route>
          <Route exact path="/Register"><Register /></Route>
          {/* <Route exact path="/Home"><Homepage /></Route> */}

          <Route path='/question'  component={props => <QuestionCategory {...props} setLoginUser={setLoginUser} />} xyz={"hello"} setLoginUser={setLoginUser} exact></Route>
          {/* <Route path='/q/:cat/:dif/:no' component={Questions} exact></Route> */}


          <Route path='/q/:cat/:dif/:no' component={Questions} setLoginUser={setLoginUser} exact></Route>


        </Switch>
      </Router>
      </Container>
      {/* Only for testing purposes. */}
      {/* <Homepage/>
      {/* <Login/> */}
      {/* <Register/> */} 

    </div>
  );
}

export default App;

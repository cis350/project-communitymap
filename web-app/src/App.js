// import logo from './logo.svg';
import './App.css';
import { Outlet, useNavigate } from "react-router-dom";
import { React, useState } from 'react';
import {
  getUser
} from './modules/api.js'

import {
  initLocalStorage,
  getCommunityMember,
} from './modules/storage';


function App({ navigation }) {
  const [username, setUsername] = useState("username");
  const [password, setPassword] = useState("password");
  const [errorMessage, setErrorMessage] = useState('');
  let navigate = useNavigate(); 

  //move to the home page with a log in
  const handleLogin = (member) =>{ 
    let path = `/home`; 
    navigate(path, {
      itemId: 86,
      otherParam: 'anything you want here',
    });
  }

  async function handleStart() {
    try {
      setErrorMessage('');
      //gets the message from local storage

      // const member = getCommunityMember(username, password); 
      const array = await getUser(username); 
      const member = array[0]; 
      console.log(member);
      if(member.password !== password) {
        throw new Error('incorrect password or username');
      }
      console.log(username);
      localStorage.setItem('currentUser', username); 
      handleLogin(member); 
    } catch(e) {
      console.log(e.message);
      setErrorMessage(e.message); 
    }
  }

  const handleSignup = () =>{ 
    initLocalStorage(); 
    let path = `/signup`; 
    navigate(path);
  }

  return (
    <div className="App">
      <div>
        {/* <nav className="navBar"
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
          }}
        >
          <Link to="/home" state={{ from: "occupation" }}>Home</Link> |{" "}
          <Link to="/events">Events</Link> |{" "}
          <Link to="/community">Community</Link> |{" "}
          <Link to="/map">Map</Link> |{" "}
          <Link to="/account">Account</Link>
        </nav> */}
        <Outlet />
      </div>
      <div className='center'>
        <h2>Welcome!</h2>
        <form >
          <div>
            <input
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </form>
        <div>
          {errorMessage && (<p className="error"> {errorMessage} </p>)}
          <button type="logIn" onClick={handleStart}>Log In</button>
          <button className='signup' type="logIn" onClick={handleSignup}>Signup</button>
        </div>
      </div>
    </div>
  );
}

export default App;

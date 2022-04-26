import { Link, useNavigate } from "react-router-dom";
import { React, useState } from 'react';
import '../App.css'
import {
  addCommunityMember,
} from '../modules/storage';

export default function Signup() {
  const [username, setUsername] = useState("username");
  const [phone, setPhone] = useState("phone number");
  const [password, setPassword] = useState("password");
  const [re_password, setRePassword] = useState("re-enter password");
  const [email, setEmail] = useState("email");
  const [errorMessage, setErrorMessage] = useState('');

  let navigate = useNavigate(); 
  const handleLogin = () =>{ 
    let path = `/`; 
    navigate(path);
  }

  function handleStart() {
    try {
      setErrorMessage(''); 
      const communityMember = {
        username:username, 
        password:password, 
        re_password:re_password,
        phone:phone, 
        email:email,
      };
      addCommunityMember(communityMember); 
    } catch(e) {
      console.log(e.message);
      setErrorMessage(e.message); 
    }
  }
  
  return (
    <main style={{ padding: "1rem 0" }}>
      <nav className="navBar"
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/home">Home</Link> |{" "}
        <Link to="/signup">Signup</Link> |{" "}
        <Link to="/events">Events</Link> |{" "}
        <Link to="/community">Community</Link> |{" "}
        <Link to="/map">Map</Link>
        
      </nav>
      <div className='center'>
        <h2>Signup!</h2>
        <form>
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
          <div>
            <input
              type="password" 
              value={re_password}
              onChange={(e) => setRePassword(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </form>
        <div>
          {errorMessage && (<p className="error"> {errorMessage} </p>)}
          <button type="logIn" onClick={handleStart}>Signup</button>
          <button className='signup' type="logIn" onClick={handleLogin}>Login</button>
        </div> 
      </div>
    </main>
  );
}
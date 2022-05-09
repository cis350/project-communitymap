import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import {
  deleteUser,
  updateUserPassword,
  updateUserEmail, 
  getUser
} from '../modules/api.js'


import '../App.css'


export default function AccountInfo() {
  const [name, setName] = useState(localStorage.getItem('currentUser'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [re_password, setre_Password] = useState('');

  const phone = useState(localStorage.getItem('phone'));
  
  let navigate = useNavigate(); 
  const handleLogin = () =>{ 
    let path = `/`; 
    navigate(path);
  }

  async function handleDelete() {
    //TO DO 
    //1. Delete the account from the backend
    const status = await deleteUser(name);
    console.log(status); 
    handleLogin();
    console.log('Account to be deleted')
  }

  async function updatePassword() {
    //TO DO 
    //1. Make sure passwords match
    if(password === re_password && password !== '') {
      //Post
      await updateUserPassword(name, password);
      console.log("update the Password")
    }
    //2. Send password to backend
    
  }

  async function updateEmail(e) {
    // TO DO
    // 1. Send new email to backend
    await updateUserEmail(name, email)
    console.log('push new email to backend'); 
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
        <Link to="/events">Events</Link> |{" "}
        <Link to="/community">Community</Link> |{" "}
        <Link to="/map">Map</Link>
      </nav>
      <div className='center'>
        <h2>Welcome {name}!</h2>
        <div> 
          <div>Phone Number: {phone}</div>
          <div>
            <form>
              <div>
              <label>Email: </label><input
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </form>
            <button onClick={updateEmail}>Change Email</button>
            <form>
              <div>
              <label>Password: </label><input
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
              <label>Re-Enter Password: </label><input
                  type="password" 
                  value={re_password}
                  onChange={(e) => setre_Password(e.target.value)}
                />
              </div>
            </form>
            <button onClick={updatePassword}>Change Password</button>

          </div>
          <button onClick={handleDelete}>Delete Account</button>
        </div>
      </div>
    </main>
  );
}
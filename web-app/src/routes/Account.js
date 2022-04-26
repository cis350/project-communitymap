import { Link } from "react-router-dom";
import React, { useState } from 'react';

import '../App.css'


export default function AccountInfo() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('email@gmail.com');
  const [password, setPassword] = useState('');
  const [re_password, setre_Password] = useState('');
  // if user signed in
  let testUser = 'userName'; 
  let phone = 'phone'; 

  function handleDelete() {
    //TO DO 
    //1. Delete the account from the backend
    console.log('Account to be deleted')
  }

  function updatePassword() {
    //TO DO 
    //1. Make sure passwords match
    //2. Send password to backend
    console.log("update the Password")
  }

  function updateEmail(e) {
    // TO DO
    // 1. Send new email to backend
    console.log('push new email to backend'); 
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Form submitted, ${name}`);    
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
        <h2>Welcome {testUser}!</h2>
        <div> 
          <div>Email: {email}</div>
          <div>Phone Number: {3036190189}</div>
          <div>
            <form>
              <div>
                <input
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </form>
            <button onClick={updateEmail}>Change Email</button>


            <form>
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
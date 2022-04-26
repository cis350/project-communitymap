import { Link } from "react-router-dom";
import {useRef} from "react"
import '../App.css'
import {joinChat} from '../modules/api.js'

export default function Community() {
  let username = useRef(''); 
  async function authenticate(e) {
    e.preventDefault(); 
    console.log(username.current); 
    const token = await joinChat(username.current); 
    //store token inside session storage
    sessionStorage.setItem('token', token); 

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
        <Link to="/map">Map</Link> |{" "}
        <Link to="/account">Account</Link>
      </nav>
      <h2>Community</h2>
      <div>
        <label>Enter your username</label>
        <input type="text" onChange={(e) => username.current = e.target.value}/> 
        <button type="button" onClick={(e) => authenticate(e)}>Join the Chat </button>
      </div>
    </main>
  );
}
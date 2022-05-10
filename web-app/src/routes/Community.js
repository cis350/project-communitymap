import { Link } from "react-router-dom";
import {useRef, useEffect, useState} from "react"
import '../App.css'
import {
  joinChat, 
  verifySession,
  getUsers,
  sendMessage,
  getMessages, 
} from '../modules/api.js'

export default function Community() {
  let username = useRef(localStorage.getItem('currentUser')); 
  let chatUsers = useRef([]); 
  const [numUsers, setNumUsers] = useState(0);
  const [messages, setMessages] = useState([]);

  // fetch the list of connected users inside useEffect
  useEffect(() =>{
    async function fetchUsers(){
      chatUsers.current = await getUsers();
      // update the state 
      setNumUsers(chatUsers.current.length);
      console.log('users', chatUsers.current);
    }
    async function fetchMessages() {
      const oldMessages = messages; 
      const mesgs = await getMessages(); 
      if(oldMessages.length !== mesgs.length) {
        console.log(oldMessages);
        console.log(mesgs);
        alert("you have recieved a new message");
      }
      setMessages(mesgs); 
    }

    // we want to fetch the users frequently (5 s)
    //we will use server polling with setInterval
    setTimeout(() => {
      fetchUsers()
      fetchMessages();
    }, 5000);
    //fetchUsers();
  },[numUsers, messages]);



  async function authenticate(e) {
    e.preventDefault(); 
    console.log(username.current); 
    if(sessionStorage.getItem('token') === null) {
      const token = await joinChat(username.current); 
      //store token inside session storage
      sessionStorage.setItem('token', token); 
    } else {
      const token = sessionStorage.getItem('token'); 
      const code = await verifySession(token); 
      console.log(code);
      if(code === 200) {
        console.log('session valid');
      }
      if(code === 302) {
        console.log('session expired'); 
      }
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
        <Link to="/events">Events</Link> |{" "}
        <Link to="/community">Community</Link> |{" "}
        <Link to="/map">Map</Link> |{" "}
        <Link to="/account">Account</Link>
      </nav>
      <h2>Community</h2>
      <div>
        <button type="button" onClick={(e) => authenticate(e)}>Join the Chat</button>
        <hr />
        <ConnectedUsers users={chatUsers.current}/>
        <MessagesCommponent user={username.current} messages={messages}/>
      </div>
    </main>
  );
}

function ConnectedUsers(props) {
  return(
    <div>
      <h2>Connected Users</h2>
      <div>
        <ul>{props.users.map(user => <li key={user}>{user}</li>)}</ul>
      </div>
    </div>
  );
}

function MessagesCommponent(props) {
  let reciever = useRef('all'); 
  let content = useRef(''); 
  const sendMsg = async(e) => {
    e.preventDefault(); 
    await sendMessage(props.user, reciever.current, content.current)
  };

  return(
    <div>
      <div>
        <h2>Previous Messages</h2>
        <div className="scroll">{props.messages.map( msg => <p>{msg.from}: {msg.content}</p>)}</div>
        <hr/>
      </div>
      <h2>New Messages</h2>
      <textarea cols="15" rows={5} onChange={(e) => content.current = e.target.value}/>
      <button type='button' onClick={(e) => sendMsg(e)}> Send </button>
    </div>
  );
}
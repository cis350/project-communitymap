import { Link } from "react-router-dom";
import {useRef, useEffect, useState} from "react"
import '../App.css'
import {
  getMyEvents,
  getEventsList,
  signup,
  addEvent,
  deleteEvent
} from '../modules/api.js'

export default function Events() {
  //title, date, location, description, imageURL, creator, time
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [time, setTime] = useState("");
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const creator = localStorage.getItem("currentUser");


  let liveEvents = useRef({data: []}); 
  let userEvents = useRef({data: []}); 
  const [numEvents, setNumEvents] = useState(0);
  const [numUserEvents, setNumUserEvents] = useState(0);
  
  useEffect(() =>{
    async function fetchEvents(){
      liveEvents.current = await getEventsList();
      // update the state 
      setNumEvents(liveEvents.current.length);
      console.log('liveEvents', liveEvents.current);
    }

    async function fetchUserEvents(){
      userEvents.current = await getMyEvents(localStorage.getItem('currentUser'));
      // update the state 
      setNumUserEvents(userEvents.current.length);
      console.log('userEvents', userEvents.current);
      console.log("user", localStorage.getItem("currentUser"));
    }

    // we want to fetch the users frequently (5 s)
    //we will use server polling with setInterval
    setTimeout(() => {
      fetchEvents();
      fetchUserEvents();
    }, 5000);
    //fetchUsers();
  },[numEvents, numUserEvents]);

  async function createEvent(e) {
    let status = await addEvent(name, date, location, description, imageURL, creator, time, long, lat);
    console.log('Join Community event'); 
    console.log(status); 
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
      <h2>Events</h2>
      <div className="flex-container">
        <div className="flex-child">
          <h2>My Events</h2>
          <div className="event-element-div">
            <MyEvents events={userEvents.current}/>
          </div>
        </div>
        <div className="flex-child">
          <div className="event-element-div">
            <EventsList events={liveEvents.current}/>
          </div>
        </div> 
      </div>
      <div>
        <h2>Create an Event</h2>
        <form>
          <div>
            <label>Event Name: </label><input
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Date: </label><input
              type="text" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label>Location: </label><input
              type="text" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <label>Description: </label><input
              type="text" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Image: </label><input
              type="text" 
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
          </div>
          <div>
            <label>Time: </label><input
              type="text" 
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div>
            <label>Longitude: </label><input
              type="text" 
              value={long}
              onChange={(e) => setLong(e.target.value)}
            />
          </div>
          <div>
            <label>Latitude: </label><input
              type="text" 
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            />
          </div>
        </form>
        <button type='button' onClick={(e) => createEvent(e)}> Create Event </button>
      </div>
    </main>
  );
}

function MyEvents(props) {
  async function eventDelete(event) {
    console.log("delete event", event.name);
    console.log(localStorage.getItem("currentUser"));
    let status = await deleteEvent(event.name);
    console.log(status);
    
  }
  return(
    <div>
      <p>See Created Events Below. Click Event to Delete</p>
      <div className="scroll">
        <ul>{props.events.data.map(event => <li key={event.name}><button type="button" onClick={(e) => eventDelete(event)}>{event.name}</button></li>)}</ul>
      </div>
    </div>
  );
}

function EventsList(props) {
  async function joinCommunityEvent(event) {
    console.log(event.name);
    console.log(localStorage.getItem('currentUser'));
    let status = await signup(localStorage.getItem('currentUser'), event.name);
    console.log(status); 
  }
  return(
    <div>
      <h2>Upcoming Events</h2>
      <p>Click Event to Sign Up</p>
      <div className="scroll">
        <ul>{props.events.data.map(event => <li key={event.name}><button type="button" onClick={(e) => joinCommunityEvent(event)}>{event.name}</button></li>)}</ul>
      </div>
    </div>
  );
}
import { Link, Outlet} from "react-router-dom";
import '../App.css'

export default function Events() {
    return (
      <main style={{ padding: "1rem 0" }}>
        <nav class="navBar"
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
        <h2>Events</h2>
        <div class="flex-container">

            <div class="flex-child">
                <h2>My Events</h2>
                <div class="scrollable-events-div">
                  <div class="event-element-div">
                    <p>List of events</p>
                  </div>
                
                </div>
                <p>My Community</p>
                <p>ENTER COMMUNITY</p>
            </div>
            
            <div class="flex-child">
                <h2>Upcoming Events</h2>
                <div class="scrollable-events-div">
                  <p>List of events</p>
                  <p>List of events</p>
                  <p>List of events</p>
                  <p>List of events</p>
                  <p>List of events</p>
                  <p>List of events</p>
                  <p>List of events</p>
                  <p>List of events</p>
                  <p>List of events</p>
                  <p>List of events</p>
                  <p>List of events</p>
                  <p>List of events</p>
                  <p>List of events</p>
                  <p>List of events</p>
                  <p>List of events</p>
                  <p>List of events</p>
                  <p>List of events</p>
                  <p>List of events</p>
                  <p>List of events</p>
                  <p>List of events</p>
                  <p>List of events</p>
                  <p>List of events</p>
                  <p>List of events</p>
                  <p>List of events</p>
                  <p>List of events</p>

                </div>
            </div>
            
        </div>
      </main>
    );
  }
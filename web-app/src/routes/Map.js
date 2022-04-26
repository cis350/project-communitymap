import { Link, Outlet} from "react-router-dom";
import '../App.css'
import { googleMapLoader } from "google-map-react";

export default function Map() {
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
        <h2>Map</h2>
        {/* input zipcode / have from user to load map */}
        {/* <div>
          <iframe
            width="600"
            height="450"
            style="border:0"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB_L2hlVtZrgal7H8RQKzMzhPZDB8AJj2A&q=Clark+Park,Philadelphia+PA">
          </iframe>
        </div> */}
        
        <p>Scroll around the map to explore points of interest near you!</p>
        <div id="map" style={{width: "320px", height: "480px"}}> 
        <iframe width="600" height="450" loading="lazy" allowfullscreen
src="https://www.google.com/maps/embed/v1/view?zoom=15&center=39.9495,-75.1719&key=AIzaSyB_L2hlVtZrgal7H8RQKzMzhPZDB8AJj2A"></iframe>
        </div>
        <div>
          {/* <input id="address" type="textbox" value="Phildelphia, PA"/>
          <input type="button" value="Encode" onclick="codeAddress()"/> */}
        </div>
      </main>
    );
  }
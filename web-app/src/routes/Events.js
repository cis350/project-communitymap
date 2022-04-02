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
      </main>
    );
  }
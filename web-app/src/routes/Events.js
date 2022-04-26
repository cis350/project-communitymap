import { Link } from "react-router-dom";
import '../App.css'

export default function Events() {
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
      </main>
    );
  }
import { Link } from "react-router-dom";
import '../App.css'

export default function Home({ communityMember }) {
  // if user signed in
  function handleAccountPage() {
    console.log(communityMember);
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
        <button type="logIn" onClick={handleAccountPage}> hello </button>
      </nav>
      <h2>Welcome back User!</h2>   
      <div className="flex-container">
          <div className="flex-child">
              <h2>Your Upcoming Events</h2>
          </div>
          
          <div className="flex-child">
              <h2>Google Map</h2>
          </div>
          
      </div>
    </main>
  );

  // if user not signed in 
  }
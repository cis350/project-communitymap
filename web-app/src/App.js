import logo from './logo.svg';
import './App.css';
import { Link, Outlet} from "react-router-dom";

function App() {
  function handleOnChange() {

  }

  function handleStart() {

  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>Hello</p>
      </header> */}
      <div>
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
        <Outlet />
      </div>
      <div className='center'>
        <h2>Welcome!</h2>
        <div>
          <input type="text" onChange={handleOnChange} data-testid="username-input" value="username"/>
        </div>
        <div>
          <input type="text" onChange={handleOnChange} data-testid="username-input" value="password"/>
        </div>
        <div>
          <button type="logIn" onClick={handleStart}>Log In</button>
        </div>
        <p className='signup'> Signup </p>
      </div>
    </div>
  );
}

export default App;

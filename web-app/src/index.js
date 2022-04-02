import React from 'react';
import ReactDOM from 'react-dom';
import { render } from "react-dom";
import SimpleMap from './SimpleMap';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Map from './routes/Map'
import Community from './routes/Community'
import Home from './routes/Home'
import Events from './routes/Events'
//import './styles.css';
const locations = require('./users.json');

// function App() {
//   return (
//     <div className="App">
//       <SimpleMap locations={locations} />
//       <p>Hello</p>
//     </div>
//   );
// }

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="community" element={<Community />} />
      <Route path="map" element={<Map />} />
      <Route path="home" element={<Home />} />
      <Route path="events" element={<Events />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);

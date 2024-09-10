import { useState, useEffect } from 'react';
import Splash from "./Splash";
import Image from "./Image";
import Key from "./Key";
import Stopwatch from './Stopwatch';
import Universe113 from '../assets/images/Universe113.jpg';
import Universe113Small from '../assets/images/Universe113_small.jpg';
import predator from '../assets/images/predator.png';
import bender from '../assets/images/bender.png';
import geralt from '../assets/images/geralt.png';
import waldo from '../assets/images/waldo.png';

function App() {
  const [shownScreen, setShownScreen] = useState("splash");
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [map, setMap] = useState({
    image: Universe113,
    thumbnail: Universe113Small,
    items: [
      {
        name: "Bender",
        coordinates: { x: 91.1, y: 70.5 },
        image: bender,
        found: false,
      },
      {
        name: "Geralt",
        coordinates: { x: 34.6, y: 37.8 },
        image: geralt,
        found: false,
      },
      {
        name: "Predator",
        coordinates: { x: 60.1, y: 85.2 },
        image: predator,
        found: false,
      },
      {
        name: "Waldo",
        coordinates: { x: 15.2, y: 63.8 },
        image: waldo,
        found: false,
      },
    ]
  })

  useEffect(() => {
    if (map.items.filter(item => !item.found).length < 1) {
      setIsRunning(!isRunning);
    }
  }, [map.items])

  return (
    <>
      <div className="splashScreen" style={{ display: shownScreen === "splash" ? "flex" : "none"}}>
        <Splash shownScreen={shownScreen} setShownScreen={setShownScreen} setIsRunning={setIsRunning} map={map} />
      </div>
      <div className="mapContainer" style={{ display: shownScreen === "map" ? "flex" : "none"}}>
        <Image map={map} setMap={setMap} />
      </div>
      <div className="keyContainer" style={{ display: shownScreen === "map" ? "flex" : "none"}}>
      <Stopwatch time={time} setTime={setTime} isRunning={isRunning} setIsRunning={setIsRunning} shownScreen={shownScreen} />
        <Key map={map} />
      </div>
    </>
  )
}

export default App
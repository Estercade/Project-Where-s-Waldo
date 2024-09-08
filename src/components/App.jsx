import { useState } from 'react';
import Image from "./Image";
import Key from "./Key";
import Universe113 from '../assets/images/Universe113.jpg';

function App() {
  const [items, setItems] = useState(
    [
      {
        name: "Predator",
        coordinates: { x: 60.1, y: 85.2 },
        found: false,
      },
      {
        name: "Waldo",
        coordinates: { x: 15.2, y: 63.8 },
        found: false,
      },
      {
        name: "Bender",
        coordinates: { x: 91.1, y: 70.5 },
        found: false,
      },
      {
        name: "Geralt",
        coordinates: { x: 34.6, y: 37.8 },
        found: false,
      }
    ]
  )

  return (
    <>
      <main>
        <Image image={Universe113} items={items} setItems={setItems} />
        <Key items={items} />
      </main>
    </>
  )
}

export default App

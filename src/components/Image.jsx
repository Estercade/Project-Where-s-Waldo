import { useState, useLayoutEffect, useRef } from 'react';

export default function Image({ map, setMap }) {
  const [dropdownShown, setDropdownShown] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [dropdownCirclePosition, setDropdownCirclePosition] = useState({ x: 0, y: 0 });
  const [dropdownMenuPosition, setDropdownMenuPosition] = useState({ x: 0, y: 0 });
  const dropdownRef = useRef();
  const imageRef = useRef();
  const dropdownCircleRadius = 15;

  function handleImageClick(e) {
    setCursorPosition({ x: (e.pageX * 100 / e.target.clientWidth), y: (e.pageY * 100 / e.target.clientHeight) });
    setDropdownCirclePosition({ x: e.pageX - (dropdownCircleRadius * 2), y: e.pageY - (dropdownCircleRadius * 2) });
    setDropdownMenuPosition({ x: e.pageX, y: e.pageY });
    setDropdownShown(!dropdownShown);
  }

  // adjust position of dropdownMenu depending on position of cursor on screen
  useLayoutEffect(() => {
    const imageDimensions = imageRef.current.getBoundingClientRect();
    const dropdownDimensions = dropdownRef.current.getBoundingClientRect();
    let newX;
    let newY;
    // if dropdownMenuPosition.x would render dropdownMenu off-screen on the x-axis
    // render it to the left of the cursor
    if ((dropdownMenuPosition.x + dropdownDimensions.width + dropdownCircleRadius) > imageDimensions.width) {
      newX = dropdownMenuPosition.x - dropdownDimensions.width - dropdownCircleRadius;
      // otherwise render to the right of the cursor
    } else {
      newX = dropdownMenuPosition.x + dropdownCircleRadius;
    };
    // if dropdownMenuPosition.y would render dropdownMenu off-screen on the y-axis
    // render it above the cursor
    if ((dropdownMenuPosition.y + dropdownDimensions.height + dropdownCircleRadius) > imageDimensions.height) {
      newY = dropdownMenuPosition.y - dropdownDimensions.height - dropdownCircleRadius;
      // otherwise render to below the cursor
    } else {
      newY = dropdownMenuPosition.y + dropdownCircleRadius;
    };
    setDropdownMenuPosition({ x: newX, y: newY });
  }, [dropdownShown])

  function handleDropdownSelect(e) {
    let selected;
    // render only items that have not yet been found
    for (let item of map.items) {
      if (item.name === e.currentTarget.innerText) {
        selected = item;
      }
    }
    // calculate the relative coordinates of the cursor position in relation to the image
    const xRatio = (selected.coordinates.x / cursorPosition.x);
    const yRatio = (selected.coordinates.y / cursorPosition.y);
    // if the relative coordinates of the cursor position are within a certain threshold 
    // of the recorded coordinates, mark it as selected
    if ((xRatio < 1.05 && xRatio > 0.95) && (yRatio < 1.05 && yRatio > 0.95)) {
      const newMap = map.items.filter(item => {
        if (item === selected) {
          item.found = true;
          return item;
        } else {
          return item;
        }
      });
      setMap({ ...map, items: newMap });
    };
    setDropdownShown(!dropdownShown);
  }

  function toggleDropdown() {
    setDropdownShown(!dropdownShown);
  }

  return (
    <>
      <img
        src={map.image}
        alt=""
        ref={imageRef}
        onClick={handleImageClick} />
      <div className="dropdownContainer" onClick={toggleDropdown} style={{ display: dropdownShown === true ? "block" : "none"}}>
        <svg className="dropdownCircle" height={dropdownCircleRadius * 4} width={dropdownCircleRadius * 4} style={{ position: "absolute", left: dropdownCirclePosition.x, top: dropdownCirclePosition.y }}>
          <circle
            r={dropdownCircleRadius}
            cx={dropdownCircleRadius * 2}
            cy={dropdownCircleRadius * 2}
            stroke="#39FF14"
            strokeWidth="2"
            strokeDasharray="6"
            fill="black"
            fillOpacity="0.4" />
        </svg>
        <ul className="dropdownMenu" ref={dropdownRef} style={{ position: "absolute", left: dropdownMenuPosition.x, top: dropdownMenuPosition.y }}>
          {map.items.map(item => {
            if (item.found === false) {
              return <li key={item.name} className="dropdownMenuItem">
                <button className="dropdownMenuItemButton" onClick={handleDropdownSelect}>
                  <img src={item.image} alt={item.name + " icon"} className="dropdownMenuItemImage" />
                  <strong>{item.name}</strong>
                </button>
              </li>
            }
          })}
        </ul>
      </div>
    </>
  )
}
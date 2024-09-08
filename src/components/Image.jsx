import { useState, useLayoutEffect, useRef } from 'react';

export default function Image({ image, items, setItems }) {
  const [dropdownShown, setDropdownShown] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [dropdownCirclePosition, setDropdownCirclePosition] = useState({ x: 0, y: 0 });
  const [dropdownMenuPosition, setDropdownMenuPosition] = useState({ x: 0, y: 0 });
  const dropdownRef = useRef();
  const imageRef = useRef();
  const dropdownCircleRadius = 15;

  function handleImageClick(e) {
    const dimensions = dropdownRef.current.getBoundingClientRect();
    setDropdownMenuPosition({ x: e.pageX, y: e.pageY });
    setCursorPosition({ x: (e.pageX * 100 / e.target.clientWidth), y: (e.pageY * 100 / e.target.clientHeight) });
    setDropdownCirclePosition({ x: e.pageX - (dropdownCircleRadius * 2), y: e.pageY - (dropdownCircleRadius * 2) });
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
    if ((dropdownMenuPosition.x + dropdownDimensions.width) > imageDimensions.width) {
      newX = dropdownMenuPosition.x - dropdownDimensions.width - dropdownCircleRadius;
      // otherwise render to the right of the cursor
    } else {
      newX = dropdownMenuPosition.x + dropdownCircleRadius;
    };
    // if dropdownMenuPosition.y would render dropdownMenu off-screen on the y-axis
    // render it above the cursor
    if ((dropdownMenuPosition.y + dropdownDimensions.height) > imageDimensions.height) {
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
    for (let item of items) {
      if (item.name === e.target.innerText) {
        selected = item;
      }
    }
    // calculate the relative coordinates of the cursor position in relation to the image
    const xRatio = (selected.coordinates.x / cursorPosition.x);
    const yRatio = (selected.coordinates.y / cursorPosition.y);
    // if the relative coordinates of the cursor position are within a certain threshold 
    // of the recorded coordinates, mark it as selected
    if ((xRatio < 1.05 && xRatio > 0.95) && (yRatio < 1.05 && yRatio > 0.95)) {
      setItems(items.filter(item => {
        if (item === selected) {
          item.found = true;
        } else {
          return item;
        }
      }));
    };
    setDropdownShown(!dropdownShown);
  }

  function toggleDropdown() {
    setDropdownShown(!dropdownShown);
  }

  return (
    <>
      <img
        src={image}
        alt=""
        ref={imageRef}
        onClick={handleImageClick} />
      <div className="dropdownContainer" onClick={toggleDropdown} hidden={dropdownShown}>
        <svg className="dropdownCircle" height={dropdownCircleRadius * 3} width={dropdownCircleRadius * 3} style={{ position: "absolute", left: dropdownCirclePosition.x, top: dropdownCirclePosition.y }}>
          <circle
            r={dropdownCircleRadius}
            cx={dropdownCircleRadius * 2}
            cy={dropdownCircleRadius * 2}
            stroke="black"
            strokeWidth="2"
            strokeDasharray="6"
            fill="black"
            fillOpacity="0.4" />
        </svg>
        <ul className="dropdownMenu" ref={dropdownRef} style={{ position: "absolute", left: dropdownMenuPosition.x, top: dropdownMenuPosition.y }}>
          {items.map(item => {
            if (item.found === false) {
              return <li key={item.name}>
                <button className="dropdownItem" onClick={handleDropdownSelect}>
                  {item.name}
                </button>
              </li>
            }
          })}
        </ul>
      </div>
    </>
  )
}
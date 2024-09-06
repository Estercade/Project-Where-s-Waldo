import { useState } from 'react';
import circle from "../assets/images/circle-outline.svg"

export default function Image({ image, items, setItems }) {
  const [dropdownShown, setDropdownShown] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [dropdownCirclePosition, setDropdownCirclePosition] = useState({ x: 0, y: 0 })
  const [dropdownMenuPosition, setDropdownMenuPosition] = useState({ x: 0, y: 0 });

  let dropdownCircleRadius = "15";

  function handleImageClick(e) {
    setDropdownShown(!dropdownShown);
    let newX;
    if (e.pageX > (e.view.innerWidth * 0.85)) {
      newX = e.pageX - 80;
    } else {
      newX = e.pageX + 20;
    }
    let newY;
    if (e.pageY > (e.view.innerHeight * 0.85)) {
      newY = e.pageY - 80;
    } else {
      newY = e.pageY + 20;
    }
    setCursorPosition({ x: (e.pageX * 100 / e.target.clientWidth), y: (e.pageY * 100 / e.target.clientHeight) });
    setDropdownCirclePosition({ x: e.pageX - (dropdownCircleRadius * 2), y: e.pageY - (dropdownCircleRadius * 2) });
    setDropdownMenuPosition({ x: newX, y: newY });
  }

  function handleDropdownSelect(e) {
    let selected;
    for (let item of items) {
      if (item.name === e.target.innerText) {
        selected = item;
      }
    }
    const xRatio = (selected.coordinates.x / cursorPosition.x);
    const yRatio = (selected.coordinates.y / cursorPosition.y);
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

  function toggleDropdown(e) {
    setDropdownShown(!dropdownShown);
  }

  return (
    <>
      <div className="imageContainer">
        <img
          src={image}
          alt=""
          onClick={handleImageClick} />
      </div>
      <div className="dropdownMenu" onClick={toggleDropdown} hidden={dropdownShown}>
        <svg className="dropdownCircle" height={dropdownCircleRadius * 4} width={dropdownCircleRadius * 4} style={{ position: "absolute", left: dropdownCirclePosition.x, top: dropdownCirclePosition.y }}>
          <circle
            r={dropdownCircleRadius}
            cx={dropdownCircleRadius * 2}
            cy={dropdownCircleRadius * 2}
            stroke="black"
            strokeWidth="2"
            stroke-dasharray="6"
            fill="black"
            fill-opacity="0.4" />
        </svg>
        <ul className="dropdownMenu" style={{ position: "absolute", left: dropdownMenuPosition.x, top: dropdownMenuPosition.y }}>
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
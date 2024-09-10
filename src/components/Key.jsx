export default function Key({ map, shownScreen, setShownScreen }) {
  return (
    <div className="key">
      {map.items.map(item => {
        return <div key={item.name + "key"} className={item.found ? "keyItemContainer selected" : "keyItemContainer"}>
          <p className="keyItemName">{item.name}</p>
          <img src={item.image} alt={item.name + " icon"} className="keyItemImage" />
        </div>
      })}
    </div>
  );
}
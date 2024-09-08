export default function Key({ items }) {
  return (
    <div className="sidebar">
      {items.map(item => {
        return <div key={item.name + "sidebar"}>{item.name}</div>
      })}
    </div>
  );
}
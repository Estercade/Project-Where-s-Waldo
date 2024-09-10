export default function Splash({ shownScreen, setShownScreen, setIsRunning, map }) {
  function handlePlayButton() {
    setShownScreen("map");
    setIsRunning(true);
  }

  return (
    <div className="splashContainer" style={{ display: shownScreen === "splash" ? "flex" : "none"}}>
      <img src={map.thumbnail} className="splashThumbnail"></img>
      <h2>HOW TO PLAY</h2>
      <p>Find all the hidden characters in the shortest amount of time to get the highest score!</p>
      <button className="splashPlayButton" onClick={handlePlayButton}><strong>PLAY</strong></button>
    </div>
  )
}
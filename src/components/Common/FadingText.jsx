import "./FadingText.css"; // Import CSS file for styling

function FadingText({ maxHeight, children }) {
  const fadingStyle = {
    maxHeight: maxHeight,
    overflow: "hidden",
    position: "relative",
  };

  const gradientStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "80px", // Adjust this height as needed for your fading effect
    background:
      "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
  };

  return (
    <div className="fading-text font-light" style={fadingStyle}>
      {children}
      <div style={gradientStyle}></div>
    </div>
  );
}

export default FadingText;

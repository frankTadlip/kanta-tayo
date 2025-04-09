import { useEffect, useState } from "react";
import "../assets/styles/SplashScreen.scss"; // Importing the specific styles for SplashScreen
import coolGif from "../assets/images/cool.gif"; // Importing the gif image

const SplashScreen = () => {
  const [fadeOut, setFadeOut] = useState(false);
  useEffect(() => {
    // Simulate loading for 1-2 seconds
    setTimeout(() => {
      setFadeOut(true); // Enable fade-in effect
    }, 6000); // 2 seconds
  }, []);

  return (
    <div className={`splash-screen ${fadeOut ? "fade-out" : ""}`}>
      <div className="splash-content">
        <img
          src={coolGif}
          alt="Loading"
          className="loading-image" // Add class for styling
        />
      </div>
    </div>
  );
};

export default SplashScreen;

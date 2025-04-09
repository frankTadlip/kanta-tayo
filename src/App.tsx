import { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import LoginPage from "./components/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling the toasts
import "./assets/styles/styles.scss"; // Import the Sass file here

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      // Simulate splash screen for 2 seconds
      setIsLoading(false);
    }, 6000); // 5 seconds loading
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <div className="app-container">
      {isLoading ? <SplashScreen /> : <LoginPage />}
      <ToastContainer />
    </div>
  );
};

export default App;

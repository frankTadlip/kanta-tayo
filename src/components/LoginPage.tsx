import { useState, useEffect } from "react";
import { Button, Divider } from "@mui/material";
import { Google, Facebook } from "@mui/icons-material"; // Google/Facebook icons
import { useNavigate } from "react-router-dom";

import GuestLoginModal from "../components/GuestLoginModal"; // Import the GuestLoginModal component
import User from "../classes/User"; // Import the User class
import damulag from "../assets/images/damulag.gif"; // Importing the gif image

import "../assets/styles/LoginPage.scss"; // Import the specific styles for LoginPage

const LoginPage = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false); // To manage modal visibility

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/home"); // Redirect to home page if already logged in
    }
  }, [navigate]);

  const handleGuestLogin = () => {
    setOpenModal(true); // Open the modal
  };

  const handleModalClose = () => {
    setOpenModal(false); // Close the modal
  };

  const handleSubmitGuestInfo = (user: User) => {
    // Handle the user info after guest login
    console.log("Guest user info:", user);
    // Save user data to localStorage
    localStorage.setItem("user", JSON.stringify(user));
    // Proceed to home page (for now, just console log or redirect to home screen)
    navigate("/home");
  };

  return (
    <main className="login-page fade-in">
      <div className="login-container">
        <div className="logo-container">
          <img src={damulag} alt="Logo" className="logo" />
        </div>
        <h4 className="login-title">
          Dahil wala kang Budget,
          <span className="subtitle"> kaya ka na punta dito! </span>{" "}
        </h4>

        {/* Guest Login Button */}
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={handleGuestLogin}
        >
          Guest Login
        </Button>

        <Divider sx={{ my: 2 }}>OR</Divider>

        {/* Google Sign In Button */}
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Google />}
          fullWidth
          disabled // Disabled initially
        >
          Sign in with Google
        </Button>

        <Divider sx={{ my: 1 }}></Divider>

        {/* Facebook Sign In Button */}
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Facebook />}
          fullWidth
          disabled // Disabled initially
        >
          Sign in with Facebook
        </Button>

        {/* Modal for Guest Login Details */}
        <GuestLoginModal
          open={openModal}
          onClose={handleModalClose}
          onSubmit={handleSubmitGuestInfo}
        />
      </div>
    </main>
  );
};

export default LoginPage;

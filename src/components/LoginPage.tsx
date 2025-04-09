import { useState } from "react";
import { Button, Divider } from "@mui/material";
import { Google, Facebook } from "@mui/icons-material"; // Google/Facebook icons
import GuestLoginModal from "../components/GuestLoginModal"; // Import the GuestLoginModal component
import User from "../classes/User"; // Import the User class

import "../assets/styles/LoginPage.scss"; // Import the specific styles for LoginPage

const LoginPage = () => {
  const [openModal, setOpenModal] = useState(false); // To manage modal visibility

  const handleGuestLogin = () => {
    setOpenModal(true); // Open the modal
  };

  const handleModalClose = () => {
    setOpenModal(false); // Close the modal
  };

  const handleSubmitGuestInfo = (user: User) => {
    // Handle the user info after guest login
    console.log("Guest user info:", user);
    // Proceed to home page (for now, just console log or redirect to home screen)
    window.location.href = "/home"; // Replace with your routing logic
  };

  return (
    <main className="login-page fade-in">
      <div className="login-container">
        <h2>Welcome to KantaTayo</h2>

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
          variant="contained"
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
          variant="contained"
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

import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import User from "../classes/User"; // Import the User class
import { toast } from "react-toastify"; // Import the toast function from react-toastify
import "../assets/styles/GuestLoginModal.scss";

interface GuestLoginModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (user: User) => void;
}

const GuestLoginModal: React.FC<GuestLoginModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [userInfo, setUserInfo] = useState<{
    firstName: string;
    lastName: string;
    nickname: string;
    birthday: Date | null; // Allow Date or null
    gender: string;
  }>({
    firstName: "",
    lastName: "",
    nickname: "",
    birthday: null, // Null initially for Date
    gender: "",
  });

  // Reset the form state to initial values
  const resetForm = () => {
    setUserInfo({
      firstName: "",
      lastName: "",
      nickname: "",
      birthday: null,
      gender: "",
    });
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = () => {
    if (
      userInfo.firstName &&
      userInfo.lastName &&
      userInfo.nickname &&
      userInfo.gender
    ) {
      // Create an instance of User and pass it to the parent
      const user = new User(
        userInfo.firstName,
        userInfo.lastName,
        userInfo.nickname,
        userInfo.gender
      );
      onSubmit(user); // Pass the User object
      onClose(); // Close the dialog
      resetForm(); // Clear the form data
    } else {
      toast.error("Please fill all the required fields!");
    }
  };

  const handleCancel = () => {
    onClose(); // Close the dialog
    resetForm(); // Clear the form data
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="guest-login-dialog"
      aria-describedby="dialog-to-fill-guest-login-info"
      onClose={(_event, reason) => {
        if (reason !== "backdropClick") {
          onClose();
        }
      }} // Prevent closing on backdrop click
    >
      <DialogTitle>Enter Your Details</DialogTitle>
      <DialogContent>
        <TextField
          error={!userInfo.firstName}
          helperText={userInfo.firstName ? "" : "This field is required!"}
          label="First Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="firstName"
          value={userInfo.firstName}
          onChange={(e) =>
            handleInputChange(e as { target: { name: string; value: string } })
          }
        />
        <TextField
          error={!userInfo.lastName}
          helperText={userInfo.lastName ? "" : "This field is required!"}
          label="Last Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="lastName"
          value={userInfo.lastName}
          onChange={(e) =>
            handleInputChange(e as { target: { name: string; value: string } })
          }
        />
        <TextField
          error={!userInfo.nickname}
          helperText={userInfo.nickname ? "" : "This field is required!"}
          label="Nickname"
          variant="outlined"
          fullWidth
          margin="normal"
          name="nickname"
          value={userInfo.nickname}
          onChange={handleInputChange}
        />

        {/* Select dropdown for Gender */}
        <FormControl fullWidth margin="normal" error={!userInfo.gender}>
          <InputLabel>Gender</InputLabel>
          <Select
            label="Gender"
            name="gender"
            value={userInfo.gender}
            onChange={handleInputChange}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
          <FormHelperText>
            {!userInfo.gender ? "This field is required!" : ""}
          </FormHelperText>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button color="success" onClick={handleSubmit}>
          Save
        </Button>
        <Button color="error" onClick={handleCancel}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GuestLoginModal;

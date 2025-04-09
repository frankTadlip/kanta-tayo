import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import User from "../../classes/User"; // Import the User class

const HomePage = () => {
  const [rooms, setRooms] = useState<string[]>([]); // Store available rooms in state
  const [openDialog, setOpenDialog] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [password, setPassword] = useState("");
  const [selectedUser, setselectedUser] = useState<User>(); // Store selected user in state
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
    } else {
      setselectedUser(JSON.parse(user));
    }
  }, [navigate]);

  const handleCreateRoom = () => {
    if (roomName && password) {
      setRooms([...rooms, roomName]); // Add new room to the list
      setOpenDialog(false); // Close the dialog
    } else {
      alert("Room name and password are required");
    }
  };

  const handleJoinRoom = (room: string) => {
    const enteredPassword = prompt("Enter room password:");
    if (enteredPassword === password) {
      alert(`Joined room: ${room}`);
      // Redirect to room or update UI accordingly
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <div>
      <h1>
        {selectedUser
          ? `Welcome ${selectedUser.firstName} "${selectedUser.nickname}" ${selectedUser.lastName}`
          : "Guest"}
      </h1>
      <Button variant="contained" onClick={() => setOpenDialog(true)}>
        Create Room
      </Button>

      <List>
        {rooms.map((room, index) => (
          <ListItem
            component="button"
            key={index}
            onClick={() => handleJoinRoom(room)}
          >
            <ListItemText primary={room} />
          </ListItem>
        ))}
      </List>

      <Dialog
        aria-labelledby="create-room-dialog"
        aria-describedby="create-room-info"
        open={openDialog}
        onClose={(_event, reason) => {
          if (reason !== "backdropClick") {
            setOpenDialog(false);
          }
        }}
      >
        <DialogTitle>Create a Room</DialogTitle>
        <DialogContent>
          <TextField
            label="Room Name"
            value={roomName}
            error={!roomName}
            helperText={roomName ? "" : "This field is required!"}
            onChange={(e) => setRoomName(e.target.value)}
            margin="normal"
            required
            fullWidth
          />
          <TextField
            label="Password"
            value={password}
            error={!password}
            helperText={password ? "" : "This field is required!"}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            fullWidth
            type="password"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateRoom} color="success">
            Create Room
          </Button>
          <Button onClick={() => setOpenDialog(false)} color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HomePage;

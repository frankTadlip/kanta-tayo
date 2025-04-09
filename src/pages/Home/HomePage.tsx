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

const HomePage = () => {
  const [rooms, setRooms] = useState<string[]>([]); // Store available rooms in state
  const [openDialog, setOpenDialog] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
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
      <h1>Home Page</h1>
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

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create a Room</DialogTitle>
        <DialogContent>
          <TextField
            label="Room Name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            type="password"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateRoom} color="primary">
            Create Room
          </Button>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HomePage;


import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const Rooms = [
  "DayCare",
  "Demo Room",
  "Kindergarten",
  "Nursery",
  "Primary",
  "All rooms",
];
// HERE
export default function CreateEvent({
  open,
  onClose,
  onSubmit,
  editDate,
  setEditDate,
  editEvent,
}) {
  const theme = useTheme();
  const [rooms, setRooms] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(editDate ? dayjs(editDate) : dayjs());
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs());
  const [description, setDescription] = useState("");

  // Effect to populate fields if editing an event
  useEffect(() => {
    if (editEvent) {
      setTitle(editEvent.title);
      setRooms(editEvent.rooms || []); // Set the selected rooms
      setDate(dayjs(editEvent.date)); // Ensure date is a dayjs object
      setStartTime(dayjs(editEvent.startTime)); // Ensure startTime is a dayjs object
      setEndTime(dayjs(editEvent.endTime)); // Ensure endTime is a dayjs object
      setDescription(editEvent.description);
    } else {
      // Reset form if not editing
      resetForm();
    }
  }, [editEvent]);
  // const handleChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setRoom(typeof value === "string" ? value.split(",") : value);
  // };




  const handleCreateEvent = () => {
    const newEvent = {
      title,
      date,
      rooms, 
      startTime,
      endTime,
      description,
    };
    onSubmit(newEvent); 
    onClose();
    resetForm();
  };

  const handleRoomChange = (event) => {
    const {
      target: { value },
    } = event;
    setRooms(typeof value === 'string' ? value.split(',') : value);
  };

  const resetForm = () => {
    setTitle("");
    setRooms([]);
    setDate(null);
    setStartTime(null);
    setEndTime(null);
    setDescription("");
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
      <DialogTitle
          sx={{
            fontSize: "24px",
            font: "Poppins",
            fontWeight: "bold",
            marginLeft: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Create New Event
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            sx={{ position: "flex-end", right: 6, top: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "100%" } }}
            noValidate
            autoComplete="off"
          >
            <Stack spacing={0.5}>
              <TextField
                id="outlined-search"
                label="Title"
                value={title}
                style={{ width: 400 }}
                onChange={(e) => setTitle(e.target.value)}
              />

              <div>
                <FormControl fullWidth sx={{ m: 1, width: 400 }}>
                  <InputLabel id="rooms-label">Rooms</InputLabel>
                  <Select
                    labelId="rooms-label"
                    multiple
                    value={rooms}
                    onChange={handleRoomChange}
                    input={<OutlinedInput label="Rooms" />}
                  >
                    {['DayCare', 'Demo Room', 'Kindergarten','Nursery', 'Primary', 'All rooms'].map((room) => ( 
                      <MenuItem key={room} value={room}>
                        {room}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <div style={{ width: 400, marginTop: -10 }}>
                    <DatePicker
                      label="Date"
                      value={date || dayjs()} 
                      onChange={(newValue) => {
                        if (newValue && newValue.isValid()) {
                          setDate(newValue);
                        }
                      }}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </div>
                </DemoContainer>
              </LocalizationProvider>

              
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker"]}>
                  <div style={{ width: 191.9, marginTop: -10 }}>
                    <TimePicker
                      label="Start Time"
                      fullWidth
                      value={startTime || dayjs()} is null
                      onChange={(newValue) => {
                        if (newValue && newValue.isValid()) {
                          setStartTime(newValue);
                        }
                      }}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </div>
                  <div style={{ width: 191.9, marginTop: -10 }}>
                    <TimePicker
                      label="End Time"
                      fullWidth
                      value={endTime || dayjs()} 
                      onChange={(newValue) => {
                        if (newValue && newValue.isValid()) {
                          setEndTime(newValue);
                        }
                      }}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </div>
                </DemoContainer>
              </LocalizationProvider>

              <div>
                <TextField
                  id="outlined-search"
                  label="Description (Optional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                  multiline
                  rows={3}
                  style={{ width: 400 }}
                />
              </div>
            </Stack>
          </Box>
        </DialogContent>

        <Box
          sx={{
            backgroundColor: "#E9E8EA",
          }}
        >
          <DialogActions>
            <Button
              onClick={onClose}
              sx={{
                color: "#48454e",
                fontWeight: "bold",
                backgroundColor: "transparent",
                marginBottom: "15px",
                marginTop: "10px",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateEvent}
              variant="contained"
              sx={{
                borderRadius: "20px",
                marginBottom: "15px",
                marginRight: "24px",
                marginTop: "10px",
                borderColor: "#1FB892",
                color: "#fef7ff",
                fontSize: "15px",
                fontWeight: "bold",
                backgroundColor: "#1FB892",
                alignItems: "center",
                "&:hover": {
                  borderColor: "#1FB892",
                  backgroundColor: "white",
                  color: "#1FB892",
                },
              }}
            >
              Create
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

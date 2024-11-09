import React, { useState } from "react";
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
}) {
  const theme = useTheme();
  const [Room, setRoom] = React.useState(["All rooms"]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(editDate ? dayjs(editDate) : dayjs());
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs());
  const [description, setDescription] = useState("");

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setRoom(typeof value === "string" ? value.split(",") : value);
  };

  const handleCreateEvent = () => {
    const newEvent = {
      title,
      date,
      Room,
      startTime,
      endTime,
      description,
    };
    onSubmit(newEvent); // Call the function passed from the parent component
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setRoom(["All rooms"]);
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
          }}
        >
          Create New Event
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
                <FormControl sx={{ m: 1, width: 400 }}>
                  <InputLabel id="demo-multiple-name-label">Rooms</InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={Room}
                    onChange={handleChange}
                    input={<OutlinedInput label="Rooms" />}
                    MenuProps={MenuProps}
                  >
                    {Rooms.map((room) => (
                      <MenuItem
                        key={room}
                        value={room}
                        style={getStyles(room, Room, theme)}
                      >
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
                      value={date || dayjs()} // Default to dayjs() if date is null
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
                      value={startTime || dayjs()} // Default to dayjs() if startTime is null
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
                      value={endTime || dayjs()} // Default to dayjs() if endTime is null
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

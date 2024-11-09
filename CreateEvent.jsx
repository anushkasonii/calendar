import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import AddIcon from "@mui/icons-material/Add";
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

const Rooms = [
  "DayCare",
  "Demo Room",
  "Kindergarten",
  "Nursery",
  "Primary",
  "xxx",
  "xxx",
  "All rooms",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function CreateEvent({ open, onClose }) {
  const theme = useTheme();
  const [Room, setRoom] = React.useState(["All rooms"]);


 
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setRoom(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      

      {/* CREATE NEW EVENT */}
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
          {/* NEWEVENT.JSX */}
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "100%" } }}
            noValidate
            autoComplete="off"
          >
            <Stack spacing={0.5}>
              {/* TITLE */}
              <div>
                <TextField
                  id="outlined-search"
                  label="Title"
                  type="text"
                  style={{ width: 400 }}
                />
              </div>

              {/* ROOM */}
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

              {/* DATE */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <div style={{ width: 400, marginTop: -10 }}>
                    <DatePicker label="Date" fullWidth />
                  </div>
                </DemoContainer>
              </LocalizationProvider>

              {/* START TIME & END TIME */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker"]}>
                  <div style={{ width: 191.9, marginTop: -10 }}>
                    <TimePicker label="Start Time" fullWidth />
                  </div>
                  <div style={{ width: 191.9, marginTop: -10 }}>
                    <TimePicker label="End Time" fullWidth />
                  </div>
                </DemoContainer>
              </LocalizationProvider>


              {/* DESCRIPTION */}
              <div>
                <TextField
                  id="outlined-search"
                  label="Description (Optional)"
                  type="text"
                  fullWidth
                  multiline
                  rows={3}
                  style={{ width: 400 }}
                />
              </div>
            </Stack>
          </Box>
        </DialogContent>

        {/* CREATE AND CANCEL */}
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
              onClick={onClose}
              variant="contained"
              sx={{
                color: "#fdf7ff",
                fontWeight: "bold",
                backgroundColor: "#53389E",
                marginBottom: "15px",
                marginRight: "24px",
                marginTop: "10px",
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

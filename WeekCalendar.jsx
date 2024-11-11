import React, { useState } from "react";
import {Grid, Box,Typography,Button,Select,MenuItem,IconButton,Modal,TextField,} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import AddIcon from "@mui/icons-material/Add";
import CreateEvent from "./CreateEvent";
import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";


const WeekCalendar = () => {
  const getMonday = (date) => {
    const currentDate = new Date(date);
    const dayOfWeek = currentDate.getDay();
    const diff = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
    currentDate.setDate(currentDate.getDate() + diff);
    return currentDate;
  };

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");

  const [room, setRoom] = React.useState("");
  const handleChange = (event) => {
    setRoom(event.target.value);
  };

  const [selectedWeek, setSelectedWeek] = useState(getMonday(new Date()));
  const [selectedDate, setSelectedDate] = useState(null);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventDetails, setEventDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  // Add this line below other state hooks
  const [editDate, setEditDate] = useState(new Date());

  const handleOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);       
    setEventDetails(null);      
    setIsEditing(false);        
  };
  

  const addEvent = (newEvent) => {
    console.log("Event added: ", newEvent);
    const eventWithId = { ...newEvent, id: events.length + 1 }; // Adds a unique id
    setEvents((prevEvents) => [...prevEvents, eventWithId]);
    handleClose();
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(selectedWeek);
    newDate.setDate(selectedWeek.getDate() + (direction === "next" ? 7 : -7));
    setSelectedWeek(newDate);
  };

  const handleEventClick = (event) => {
    setEventDetails({
      ...event,
      date: new Date(event.date), // Ensure date is a Date object
    });
    setIsEditing(false);
  };

  const handleDeleteEvent = () => {
    const confirmed = window.confirm("Are you sure you want to delete this event?");
    if (confirmed) {
      setEvents(events.filter((event) => event.id !== eventDetails.id)); // Use the event ID to delete the correct event
      setEventDetails(null); // Close the modal after deletion
    }
  };
  

  const handleSaveChanges = () => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventDetails.id ? { ...eventDetails } : event
      )
    );
    setEventDetails(null);
    setIsEditing(false);
  };

  const handleEditEvent = () => {
    setTitle(eventDetails.title);
    setDate(eventDetails.date);
    setRoom(eventDetails.room);
    setStartTime(eventDetails.startTime);
    setEndTime(eventDetails.endTime);
    setDescription(eventDetails.description);
    setEditDate(new Date(eventDetails.date));
    setIsEditing(true); // Enable editing mode
  };

  const formatDay = (dayIndex) => {
    const date = new Date(selectedWeek);
    date.setDate(date.getDate() + dayIndex);
    return {
      day: date.toLocaleString("en-US", { weekday: "short" }),
      date: date.getDate(),
      events: events.filter(
        (event) => new Date(event.date).toDateString() === date.toDateString()
      ),
    };
  };

  const isCurrentDay = (dayIndex) => {
    const date = new Date(selectedWeek);
    date.setDate(date.getDate() + dayIndex);
    return date.toDateString() === new Date().toDateString();
  };

  const formatTimeRange = (startTime, endTime) => {
    const formatTime = (date) => {
      const options = { hour: "numeric", hour12: true };
      return new Date(date)
        .toLocaleTimeString([], options)
        .replace(":00", "")
        .toLowerCase();
    };
    return `${formatTime(startTime)} - ${formatTime(endTime)}`;
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* New Event Button */}
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}
      >
        <Button
          variant="outlined"
          sx={{
            borderColor: "#1FB892",
            color: "#1FB892",
            fontSize: "17px",
            backgroundColor: "white",
            alignItems: "center",
            borderRadius: "20px",
            paddingX: 2.5,
            "&:hover": {
              borderColor: "#1FB892",
              backgroundColor: "#1FB892",
              color: "white",
            },
          }}
          onClick={handleOpen}
          startIcon={<AddIcon />}
        >
          New Event
          
        </Button>
      </Box>

      {/* Month and Year Display */}
      <Typography variant="h3" sx={{ marginBottom: 2, marginTop: -8 }}>
        {selectedDate
          ? selectedDate.toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })
          : selectedWeek.toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })}
      </Typography>

      {/* Controls Row */}
      <Grid
        container
        spacing={2}
        alignItems="center"
        sx={{ display: "flex", gap: 2, mt: 2, ml: 0 }}
      >
        <Button sx={{ border: "2px solid #958DA8", padding: 0 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <IconButton
              onClick={() => setOpenCalendar(true)}
              sx={{ position: "relative" }}
            >
              <CalendarTodayIcon sx={{ fontSize: "25px", color: "#807892" }} />
            </IconButton>
            <Modal open={openCalendar} onClose={() => setOpenCalendar(false)}>
              <Box
                sx={{
                  width: 320,
                  margin: "100px auto",
                  backgroundColor: "#f8f1fb",
                  padding: 2,
                  borderRadius: 1,
                }}
              >
                <DateCalendar
                  value={selectedDate}
                  onChange={(newValue) => {
                    setSelectedDate(newValue);
                    setSelectedWeek(getMonday(newValue || new Date()));
                    setOpenCalendar(false);
                  }}
                />
              </Box>
            </Modal>
          </LocalizationProvider>
        </Button>

        <Button
          sx={{
            color: "#807892",
            border: "2px solid #958DA8",
            backgroundColor: "transparent",
            fontSize: "17px",
            fontWeight: "bold",
          }}
          onClick={() => {
            const today = new Date();
            setSelectedDate(today);
            setSelectedWeek(getMonday(today));
          }}
        >
          Today
        </Button>

        <IconButton onClick={() => navigateWeek("prev")}>
          <ChevronLeftIcon
            sx={{ fontSize: "35px", color: "#807892", fontWeight: "bold" }}
          />
        </IconButton>

        <IconButton onClick={() => navigateWeek("next")}>
          <ChevronRightIcon
            sx={{ fontSize: "35px", color: "#807892", fontWeight: "bold" }}
          />
        </IconButton>

        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Room</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={room}
              sx={{ minWidth: 200, width: 300, height: 50 }}
              label="room"
              onChange={handleChange}
            >
              <MenuItem value={10}>DayCare</MenuItem>
              <MenuItem value={20}>Demo Room</MenuItem>
              <MenuItem value={30}>Kindergarten</MenuItem>
              <MenuItem value={40}>Nursery</MenuItem>
              <MenuItem value={50}>Primary</MenuItem>
              <MenuItem value={60}>All rooms</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>

      <Grid container spacing={2} sx={{ marginTop: 3 }}>
        {[...Array(7)].map((_, dayIndex) => {
          const { day, date, events } = formatDay(dayIndex);
          const isCurrent = isCurrentDay(dayIndex);
          return (
            <Grid item xs={12} sm={1.7} key={dayIndex}>
              <Box sx={{ backgroundColor: isCurrent ? "#f8f1fb" : "white" }}>
                <Box
                  sx={{
                    marginTop: 7,
                    minHeight: 20,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: 3,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: isCurrent ? "#53389E" : "#938F99",
                    }}
                  >
                    {day}
                  </Typography>

                  <Typography
                    variant="h4"
                    sx={{
                      color: isCurrent ? "#53389E" : "black",
                    }}
                  >
                    {date}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    border: "1px solid #ece6f0",
                    minHeight: 320,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {events.map((event, index) => (
                    <Box
                      key={index}
                      onClick={() => handleEventClick(event)}
                      sx={{
                        border: "1px solid #ece6f0",
                        boxShadow: "0px 4px 9px rgba(0, 0, 0, 0.1)",
                        margin: 2,
                        marginLeft: 2,
                        marginRight: 2,
                        paddingBottom: 1,
                        marginBottom: 0,
                        width: "85%",
                        borderRadius: 1,
                        cursor: "pointer",
                        backgroundColor: "white",
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "#EBEBEB",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "17px",
                            fontWeight: "bold",
                            marginLeft: "5px",
                            color: "#615b71",
                          }}
                        >
                          {event.title}
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: "16px",
                            marginLeft: "5px",
                            color: "#615b71",
                            paddingBottom: "8px",
                          }}
                        >
                          {formatTimeRange(event.startTime, event.endTime)}
                        </Typography>
                      </Box>

                      <Typography
                        sx={{
                          fontSize: "15px",
                          marginLeft: "5px",
                          color: "#8E8A94",
                          marginTop: "5px",
                        }}
                      >
                        {event.description}
                      </Typography>
                    </Box>
                  ))}
                  <Button
                    color="#ded8e1 "
                    width="50"
                    variant="outlined"
                    sx={{
                      marginTop: 3,
                      color: "#ded8e1",
                      width: 150,
                      backgroundColor: isCurrent ? "white" : "white",
                    }}
                    onClick={handleOpen}
                  >
                    <AddIcon
                      sx={{
                        color: "#958DA8",
                      }}
                    />
                  </Button>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <Modal
        open={!!eventDetails}
        onClose={handleClose}
        aria-labelledby="event-modal-title"
        aria-describedby="event-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Stack spacing={2}>
          <Typography variant="h6" component="h2" 
          sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems:  'center' }}>
            Event Details
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              sx={{ position: "relative", right: 0, top: 0 }}
            >
              <CloseIcon />
            </IconButton>
          </Typography>

            <TextField
              fullWidth
              label="Title"
              value={eventDetails?.title || ""}
              disabled={!isEditing}
              onChange={(e) =>
                setEventDetails((prev) => ({ ...prev, title: e.target.value }))
              }
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="room-select-label">Room</InputLabel>
              <Select
                labelId="room-select-label"
                id="room-select"
                value={eventDetails?.room || ""}
                disabled={!isEditing}
                onChange={(e) =>
                  setEventDetails((prev) => ({ ...prev, room: e.target.value }))
                }
              >
                <MenuItem value="DayCare">DayCare</MenuItem>
                <MenuItem value="Demo Room">Demo Room</MenuItem>
                <MenuItem value="Kindergarten">Kindergarten</MenuItem>
                <MenuItem value="Nursery">Nursery</MenuItem>
                <MenuItem value="Primary">Primary</MenuItem>
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                value={eventDetails?.date ? new dayjs(eventDetails.date) : new dayjs()} // Ensure it's a dayjs object
                onChange={(newValue) => {
                  if (newValue) {
                    setEventDetails((prev) => ({ ...prev, date: newValue })); // Store the dayjs object
                  }
                }}
                renderInput={(params) => <TextField {...params} />}
                disabled={!isEditing}
              />
            </LocalizationProvider>

            <TextField
              fullWidth
              label="Start Time"
              value={eventDetails?.startTime || ""}
              disabled={!isEditing}
              onChange={(e) =>
                setEventDetails((prev) => ({
                  ...prev,
                  startTime: e.target.value,
                }))
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="End Time"
              value={eventDetails?.endTime || ""}
              disabled={!isEditing}
              onChange={(e) =>
                setEventDetails((prev) => ({
                  ...prev,
                  endTime: e.target.value,
                }))
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              value={eventDetails?.description || ""}
              disabled={!isEditing}
              onChange={(e) =>
                setEventDetails((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              sx={{ mb: 2 }}
            />

            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "flex-end", mt: 2 }}
            >
              <Button
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
                onClick={isEditing ? handleSaveChanges : handleEditEvent}
              >
                {isEditing ? "Save" : "Edit"}
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDeleteEvent}
              >
                Delete
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>

      <CreateEvent
        open={dialogOpen}
        onClose={handleClose}
        onSubmit={addEvent}
        editDate={editDate} // Pass editDate prop
        setEditDate={setEditDate} // Pass setEditDate prop
      />
    </Box>
  );
};

export default WeekCalendar;
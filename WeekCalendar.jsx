import React, { useState } from 'react';
import { Grid, Box, Typography, Button, Select, MenuItem, IconButton, Modal } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import AddIcon from "@mui/icons-material/Add";
import CreateEvent from './CreateEvent';

const WeekCalendar = () => {
  const getMonday = (date) => {
    const currentDate = new Date(date);
    const dayOfWeek = currentDate.getDay();
    const diff = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
    currentDate.setDate(currentDate.getDate() + diff);
    return currentDate;
  };

  const [room, setRoom] = React.useState('');
  const handleChange = (event) => {
    setRoom(event.target.value);
  };

  const [selectedWeek, setSelectedWeek] = useState(getMonday(new Date()));
  const [selectedDate, setSelectedDate] = useState(null);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(selectedWeek);
    newDate.setDate(selectedWeek.getDate() + (direction === 'next' ? 7 : -7));
    setSelectedWeek(newDate);
  };

  const formatDay = (dayIndex) => {
    const date = new Date(selectedWeek);
    date.setDate(date.getDate() + dayIndex);
    return {
      day: date.toLocaleString('en-US', { weekday: 'short' }),
      date: date.getDate(),
    };
  };

  const isCurrentDay = (dayIndex) => {
    const date = new Date(selectedWeek);
    date.setDate(date.getDate() + dayIndex);
    return date.toDateString() === new Date().toDateString();
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* New Event Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
        <Button
          variant="outlined"
          sx={{
            borderColor:'#1FB892',
                color: '#1FB892',
                fontSize:'17px',
                backgroundColor:'white',
                alignItems:'center',
                borderRadius:'20px',
                paddingX: 2.5,
                
                '&:hover': {
                    borderColor: '#1FB892',
                    backgroundColor: '#1FB892', 
                    color:'white',
                  },
          }}
          onClick={handleOpen}
          startIcon={<AddIcon />}
        >
          New Event
        </Button>
      </Box>

      {/* Month and Year Display */}
      <Typography variant="h3" sx={{ marginBottom: 2 , marginTop: -8}}>
        {selectedDate
          ? selectedDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })
          : selectedWeek.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
      </Typography>

      {/* Controls Row */}
      <Grid container spacing={2} alignItems="center" sx={{ display: 'flex', gap: 2, mt: 2, ml: 0 }}>
        <Button sx={{ border: "2px solid #958DA8", padding: 0 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <IconButton onClick={() => setOpenCalendar(true)}>
              <CalendarTodayIcon sx={{ fontSize: '25px', color: '#807892' }} />
            </IconButton>
            <Modal open={openCalendar} onClose={() => setOpenCalendar(false)}>
              <Box sx={{ width: 320, margin: '100px auto', backgroundColor: '#f8f1fb', padding: 2, borderRadius: 1 }}>
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
            fontWeight: "bold"
          }}
          onClick={() => setSelectedDate(new Date())}>
          Today
        </Button>

        <IconButton onClick={() => navigateWeek('prev')}>
          <ChevronLeftIcon sx={{ fontSize: '35px', color: "#807892", fontWeight: "bold" }} />
        </IconButton>

        <IconButton onClick={() => navigateWeek('next')}>
          <ChevronRightIcon sx={{ fontSize: '35px', color: "#807892", fontWeight: "bold" }} />
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
          const { day, date } = formatDay(dayIndex);
          const isCurrent = isCurrentDay(dayIndex);
          return (
            <Grid item xs={12} sm={1.7} key={dayIndex}>
              <Box sx={{ backgroundColor: isCurrent ? '#f8f1fb' : 'white' }}>
                <Box
                  sx={{
                    marginTop: 7,
                    minHeight: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: 3
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: isCurrent ? '#53389E' : '#938F99',
                    }}
                  >
                    {day}
                  </Typography>

                  <Typography
                    variant="h4"
                    sx={{
                      color: isCurrent ? '#53389E' : 'black',
                    }}
                  >
                    {date}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    border: '1px solid #ece6f0',
                    minHeight: 320,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Button
                    color="#ded8e1"
                    width="50"
                    variant="outlined"
                    sx={{
                      marginTop: 3,
                      color: "#ded8e1",
                      width: 150,
                      backgroundColor: isCurrent ? 'white' : 'white',
                    }}
                    onClick={handleOpen}
                  >
                    <AddIcon
                      sx={{
                        color: '#958DA8'
                      }} />
                  </Button>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <CreateEvent open={dialogOpen} onClose={handleClose} />
    </Box>
  );
};

export default WeekCalendar;
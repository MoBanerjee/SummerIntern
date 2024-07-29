import React, { useState, useEffect } from 'react';
import { Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import APIManager from '../APIManager/APIManager'

const Logbook = () => {
  const [actorSearchTerm, setActorSearchTerm] = useState('');
  const [eventSearchTerm, setEventSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [sampleData, setSampleData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const itemsPerPage = 5;

  useEffect(() => {
    const getLogs = async () => {
      try {
        const response = 
        APIManager.getLogs({})
        const temp = response.data.rows.map(row => ({
          timestamp: row.time_of_action.slice(0, 10) + " " + row.time_of_action.slice(11, 23),
          event: row.action,
          actor: row.actor
        }));
        console.log('Fetched data:', temp);
        setSampleData(temp);
        setFilteredData(temp);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };
    getLogs();
  }, []);

  useEffect(() => {
    filterData();
  }, [actorSearchTerm, eventSearchTerm, startDate, endDate]);

  const handleActorSearch = (event) => {
    setActorSearchTerm(event.target.value.toLowerCase());
  };

  const handleEventSearch = (event) => {
    setEventSearchTerm(event.target.value.toLowerCase());
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDate && date > endDate) {
      setEndDate(date);
    }
  };

  const handleEndDateChange = (date) => {
    if (!startDate || date >= startDate) {
      setEndDate(date);
    }
  };

  const filterData = () => {
    try {
      console.log('Filtering data with terms:', {
        actorSearchTerm,
        eventSearchTerm,
        startDate,
        endDate
      });

      let filtered = sampleData.filter(log => {
        const actorMatch = log.actor ? log.actor.toLowerCase().includes(actorSearchTerm) : false;
        const eventMatch = log.event ? log.event.toLowerCase().includes(eventSearchTerm) : false;
        return actorMatch && eventMatch;
      });

      console.log('Filtered by actor and event:', filtered);

      if (startDate && endDate) {
        filtered = filtered.filter(log => {
          const logDate = new Date(log.timestamp);
          return logDate >= startDate && logDate <= endDate;
        });
        console.log('Filtered by date:', filtered);
      }
      setFilteredData(filtered);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error filtering data:', error);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box m={2}>
        <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
          <TextField
            variant="outlined"
            placeholder="Search by actor..."
            value={actorSearchTerm}
            onChange={handleActorSearch}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mr: 2 }}
          />
          <TextField
            variant="outlined"
            placeholder="Search by event..."
            value={eventSearchTerm}
            onChange={handleEventSearch}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mr: 2 }}
          />
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={handleStartDateChange}
            renderInput={(params) => <TextField {...params} variant="outlined" sx={{ mr: 2 }} />}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={handleEndDateChange}
            minDate={startDate}
            renderInput={(params) => <TextField {...params} variant="outlined" />}
          />
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Timestamp</TableCell>
                <TableCell>Event</TableCell>
                <TableCell>Actor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((log, index) => (
                <TableRow key={index}>
                  <TableCell>{log.timestamp}</TableCell>
                  <TableCell>{log.event}</TableCell>
                  <TableCell>{log.actor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={2} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(filteredData.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default Logbook;

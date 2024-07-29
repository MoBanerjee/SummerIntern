import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Heatmap from '../components/report/Heatmap';
import Donut from '../components/report/Donut';
import axios from 'axios';
import APIManager from '../APIManager/APIManager'

const generateYearMonthCombinations = () => {
  const currentDate = new Date();
  const combinations = [];

  const monthsBack = 3;
  const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - monthsBack, 1);
  const startDate = new Date(currentDate.getFullYear() - 1, 0, 1); 

  for (let date = startDate; date <= endDate; date.setMonth(date.getMonth() + 1)) {
    const year = date.getFullYear();
    const monthStr = (date.getMonth() + 1).toString().padStart(2, '0');
    combinations.push(`${year}${monthStr}`);
  }

  return combinations;
};

const generateAllPossibleCombinations = () => {
  const yearMonths = generateYearMonthCombinations();

  const allPossibleCombinations = {};
  for (let i = 1; i <= 16; i++) {
    const buid = `B${i}`;
    allPossibleCombinations[buid] = yearMonths;
  }

  return allPossibleCombinations;
};

const fetchDeniedForms = async () => {
  try {
    const response =
    APIManager.fetchDeniedForms({})
    if (response.status === 200) {
      const deniedForms = response.data.rows;
      let rows = [];
      deniedForms.forEach((current) => {
        const buid = current.buid;
        const year = current.ym.slice(0, 4);
        const monthIndex = current.ym.slice(4, 6);
        const month = months[parseInt(monthIndex, 10) - 1];
        const status = current.status.slice(-1);

        rows.push(createData(buslist[buid], year, month, status));
      });
      return rows;
    }
  } catch (error) {
    console.error('Error fetching forms: ', error);
  }
};

const fetchUnsubmittedForms = async () => {
  try {
    const response = 
APIManager.fetchMissedForms({})
    if (response.status === 200) {
      const submittedForms = response.data.rows;
      const submittedCombinations = submittedForms.map((form) => ({
        buid: form.buid,
        ym: form.ym,
      }));

      const allPossibleCombinations = generateAllPossibleCombinations();
      const allCombinations = [];
      for (const buid in allPossibleCombinations) {
        allPossibleCombinations[buid].forEach((ym) => {
          allCombinations.push({ buid, ym });
        });
      }

      const unsubmittedCombinations = allCombinations.filter((combination) => {
        return !submittedCombinations.some(
          (submitted) => submitted.buid === combination.buid && submitted.ym === combination.ym
        );
      });

      let rows = [];
      unsubmittedCombinations.forEach((current) => {
        const buid = current.buid;
        const year = current.ym.slice(0, 4);
        const monthIndex = current.ym.slice(4, 6);
        const month = months[parseInt(monthIndex, 10) - 1];

        rows.push(createData(buslist[buid], year, month));
      });

      return rows;
    }
  } catch (error) {
    console.error('Error fetching forms: ', error);
    return [];
  }
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '1rem',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const buslist = {
  B1: "SNE",
  B2: "SOGA",
  B3: "SPMI",
  B4: "SSSI",
  B5: "SNHI",
  B6: "SNS",
  B7: "SFB",
  B8: "SSMB",
  B9: "SAM",
  B10: "TBY",
  B11: "AY",
  B12: "PY",
  B13: "SMS",
  B14: "PTS",
  B15: "PTK",
  B16: "EJA",
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function createData(BU, Year, Month, Level) {
  return { BU, Year, Month, Level };
}

export default function CustomizedTables(props) {
  const currentYear = new Date().getFullYear();
  const defaultBU = "SNE";
  const defaultYear = currentYear.toString();

  const [rows, setRows] = useState([]);
  const [missed, setMissedRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [selectedBU, setSelectedBU] = useState(defaultBU);
  const [selectedYear, setSelectedYear] = useState(defaultYear);

  const [selectedMissedBU, setSelectedMissedBU] = useState(defaultBU);
  const [selectedMissedYear, setSelectedMissedYear] = useState(defaultYear);

  useEffect(() => {
    const getDeniedForms = async () => {
      const forms = await fetchDeniedForms();
      setRows(forms);
    };

    getDeniedForms();
  }, []);

  useEffect(() => {
    const getMissedForms = async () => {
      const forms = await fetchUnsubmittedForms();
      setMissedRows(forms);
    };

    getMissedForms();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      setRowsPerPage((prev) => prev + 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBUChange = (event) => {
    setSelectedBU(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleMissedBUChange = (event) => {
    setSelectedMissedBU(event.target.value);
  };

  const handleMissedYearChange = (event) => {
    setSelectedMissedYear(event.target.value);
  };

  const filteredRows = rows.filter((row) => {
    return (
      (!selectedBU || row.BU === selectedBU) &&
      (!selectedYear || row.Year === selectedYear)
    );
  });

  const filteredMissedRows = missed.filter((row) => {
    return (
      (!selectedMissedBU || row.BU === selectedMissedBU) &&
      (!selectedMissedYear || row.Year === selectedMissedYear)
    );
  });

  const years = [currentYear, currentYear - 1];

  return (
    <Box id={props.id} sx={{ padding: 2, backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Typography variant="h2" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#2a3eb1', marginBottom: 4 }}>
        Summary Report
      </Typography>
      <Grid container spacing={4} sx={{ marginBottom: 4}}>
        <Grid item xs={12} >
          <Card variant="outlined" sx={{ justifyContent: 'left', alignItems: 'left', display:'flex' ,borderRadius: '16px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'}}>
          <CardContent sx={{  justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Heatmap sx={{justifyContent: 'right', alignItems: 'right'}}/>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} >
          <Card variant="outlined" sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
              <Donut />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card variant="outlined" sx={{ marginY: 4, padding: 3, border: 'none', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#2a3eb1', marginBottom: 2 }}>
            Denied Forms
          </Typography>
          <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth>
                <InputLabel id="bu-select-label">Select BU</InputLabel>
                <Select
                  labelId="bu-select-label"
                  id="bu-select"
                  value={selectedBU}
                  label="Select BU"
                  onChange={handleBUChange}
                >
                  {Object.values(buslist).map((bu, index) => (
                    <MenuItem key={index} value={bu}>
                      {bu}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth>
                <InputLabel id="year-select-label">Select Year</InputLabel>
                <Select
                  labelId="year-select-label"
                  id="year-select"
                  value={selectedYear}
                  label="Select Year"
                  onChange={handleYearChange}
                >
                  {years.map((year, index) => (
                    <MenuItem key={index} value={year.toString()}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>BU</StyledTableCell>
                  <StyledTableCell align="right">Year</StyledTableCell>
                  <StyledTableCell align="right">Month</StyledTableCell>
                  <StyledTableCell align="right">Level</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows.slice(0, rowsPerPage).map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {row.BU}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.Year}</StyledTableCell>
                    <StyledTableCell align="right">{row.Month}</StyledTableCell>
                    <StyledTableCell align="right">{row.Level}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ marginY: 4, padding: 3, border: 'none', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#2a3eb1', marginBottom: 2 }}>
            Missed Forms
          </Typography>
          <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 2 }}>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth>
                <InputLabel id="missed-bu-select-label">Select BU</InputLabel>
                <Select
                  labelId="missed-bu-select-label"
                  id="missed-bu-select"
                  value={selectedMissedBU}
                  label="Select BU"
                  onChange={handleMissedBUChange}
                >
                  {Object.values(buslist).map((bu, index) => (
                    <MenuItem key={index} value={bu}>
                      {bu}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth>
                <InputLabel id="missed-year-select-label">Select Year</InputLabel>
                <Select
                  labelId="missed-year-select-label"
                  id="missed-year-select"
                  value={selectedMissedYear}
                  label="Select Year"
                  onChange={handleMissedYearChange}
                >
                  {years.map((year, index) => (
                    <MenuItem key={index} value={year.toString()}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>BU</StyledTableCell>
                  <StyledTableCell align="right">Year</StyledTableCell>
                  <StyledTableCell align="right">Month</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredMissedRows.slice(0, rowsPerPage).map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {row.BU}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.Year}</StyledTableCell>
                    <StyledTableCell align="right">{row.Month}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}

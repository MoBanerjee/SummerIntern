import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';  
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import APIManager from '../APIManager/APIManager'

function createData(RequestID, BU, Year, Month, Reason) {
  return { RequestID, BU, Year, Month, Reason };
}

const buDictionary = {
  "B1": "SNE",
  "B2": "SOGA",
  "B3": "SPMI",
  "B4": "SSSI",
  "B5": "SNHI",
  "B6": "SNS",
  "B7": "SFB",
  "B8": "SSMB",
  "B9": "SAM",
  "B10": "TBY",
  "B11": "AY",
  "B12": "PY",
  "B13": "SMS",
  "B14": "PTS",
  "B15": "PTK",
  "B16": "EJA"
};

const months = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December"
};
const reverseBuDictionary = Object.entries(buDictionary).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {});

const reverseMonths = Object.entries(months).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {});
export default function BasicTable() {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      let results = 
      APIManager.reviewReq({})
      let temp = results.data.rows;
      let rowTemp = [];
      temp.forEach(element => {
        rowTemp.push(createData(element.rqid, buDictionary[element.bu], element.ym.slice(0, 4), months[element.ym.slice(4, 6)], element.reason));
      });

      setRows(rowTemp);
    }
    fetchData();
  }, []);

  const handleAccept = async (id,y,m,b) => {
    const res= 
    APIManager.acceptReq({
      rqid: id,
      ym:String(y)+String(reverseMonths[m]),
      bu:reverseBuDictionary[b]
    })
   
    setRows((prevRows) => prevRows.filter((row) => row.RequestID !== id));
    toast.success("Request accepted successfully");
  };

  const handleDeny = async (id) => {
    try{const res= 
    APIManager.denyReq({rqid: id})
    setRows((prevRows) => prevRows.filter((row) => row.RequestID !== id));
    toast.success("Request denied successfully");}catch(error){
      console.log(error)
    }
  };

  return (
    <>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Request ID</TableCell>
              <TableCell align="right">BU</TableCell>
              <TableCell align="right">Year</TableCell>
              <TableCell align="right">Month</TableCell>
              <TableCell align="right">Reason</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.RequestID}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.RequestID}
                </TableCell>
                <TableCell align="right">{row.BU}</TableCell>
                <TableCell align="right">{row.Year}</TableCell>
                <TableCell align="right">{row.Month}</TableCell>
                <TableCell align="right">{row.Reason}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary" sx={{ marginRight: "10px" }} onClick={() => handleAccept(row.RequestID,row.Year,row.Month,row.BU)}>Accept</Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDeny(row.RequestID)}>Deny</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

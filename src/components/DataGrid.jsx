import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; 
import ArrowCircleRightTwoToneIcon from '@mui/icons-material/ArrowCircleRightTwoTone';
const getStatusStyle = (status) => {
    switch (status) {
        case 'Submitted':
       
            return { backgroundColor: '#c8e6c9' }; 
        case 'Draft':
            return { backgroundColor: '#fff9c4' }; 
        case 'Yet to Start':
        case 'Yet To Start':
          case 'Yet to be Approved':
            
            return { backgroundColor: '#ffcdd2' }; 
        case 'Approved by Level 1':
          return { backgroundColor: '#73fa92' }; 
          case 'Received by Level 2':
            return { backgroundColor: '#069147' }; 
            case 'Denied by Level 1':
              return { backgroundColor: '#f07179' };
              case 'Denied by Level 2':
                return { backgroundColor: '#c20612' };
                case 'Submitted- Yet to be Approved':
                  return { backgroundColor: '#f2d830' };
        default:
            return {};
    }
};

const DataGrid = ({ data }) => {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: 'auto' }}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Month</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={getStatusStyle(row.status)}
            >
              <TableCell component="th" scope="row">{row.month}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>
                {row.status === 'Submitted' ? (
                  <IconButton color="success" disabled="true">
                    <CheckCircleIcon />
                  </IconButton>
                ) : row.status === 'Yet to Start' || row.status === 'Yet To Start' || row.status === 'Yet to be Approved' || row.status === 'Denied by Level 1' ||  row.status === 'Denied by Level 2' ? (
                  <IconButton color="error" onClick={() => row.openform(row.mth)} href=""> 
                    <ArrowCircleRightTwoToneIcon  />
                  </IconButton>
                ) : row.status === 'Draft' ||  row.status === 'Submitted- Yet to be Approved' ? (
                  <IconButton color="warning" onClick={() => row.openform(row.mth)} >
                    <ArrowCircleRightTwoToneIcon  />
                  </IconButton>
                ) : row.status === 'Approved by Level 1' ||  row.status === 'Received by Level 2' ? (
                  <IconButton color="success" onClick={() => row.openform(row.mth)} >
                    <ArrowCircleRightTwoToneIcon  />
                  </IconButton>
                ): null}
              </TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataGrid;

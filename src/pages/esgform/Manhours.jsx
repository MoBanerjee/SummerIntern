import React ,{useState,useEffect}from 'react';
import { Box,Switch } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { ManHrs } from "../../data/Entities";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";


const Manhours = ({editable}) => {
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [edits, setEdits] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    const l=JSON.parse(localStorage.getItem("manhours"));
    const enhancedData = ManHrs.map(row => ({
      ...row,
      number: l,
      isApplicable: l==='N/A'  ?false:true,
    }));

    setData(enhancedData);

    
  }, []);
  
  const handleApplicabilityChange = (id, isApplicable) => {
    const newData = data.map(row => {
      if (row.id === id) {
        return { ...row, isApplicable };
      }
      return row;
    });
   
    if(!isApplicable) newData[id-1].number='N/A';
    else newData[id-1].number=''
    let temp=!isApplicable?'N/A':"";
 localStorage.setItem("manhours",JSON.stringify(temp))
 window.dispatchEvent(new Event('storageUpdated'));
    setData(newData);
  };


  const handleEditCommit = React.useCallback(
    (params) => {
      const { id, field, value } = params;
      const newEdits = edits.filter((edit) => !(edit.id === id && edit.field === field));
      newEdits.push({ id, field, value });
      newEdits.forEach((edit) => {
        switch (edit.id) {
          case 1: localStorage.setItem("manhours",JSON.stringify(edit.value))
          window.dispatchEvent(new Event('storageUpdated'));
          break;

        }
      });
    
      setEdits(newEdits);
    },
    [edits]
  );


  const columns = [
    { field: "id", headerName: "S.no", flex: 0.5 },
    { field: "entity", headerName: "Entity",flex:0.5 },
    { field: "number", headerName: "Number", type: 'number', flex: 0.5, editable: (params) => !params.row.isApplicable },
    { field: "unit", headerName: "Unit", flex: 0.5 },
    {
        field: "applicability",
        headerName: "Applicability",
        renderCell: (params) => (
          <Switch
            checked={params.row.isApplicable}
            onChange={(event) => handleApplicabilityChange(params.id, event.target.checked)}
            disabled={!editable}
          />
        )
      },
  ];

  return (
    <>
     
      <Box m="20px">
        <Header title="Manhours"  />
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            m: 2 ,
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-row": {
              border: "1px solid blue",
            },

            '& .MuiDataGrid-cell:hover': {
              color: 'black',
            },
            "& .MuiDataGrid-cell": {
              borderLeft: "1px solid blue",
              borderRight: "1px solid blue",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[600],
              borderBottom: "60px",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[600],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .row--fillo": {
              backgroundColor: "#e0ffe0", 
            },
            "& .row--empty": {
              backgroundColor: "#ffe0e0", 
            },
            "& .row--na": {
              backgroundColor: "#EEDC5B", 
            }
          }}
        >
          <DataGrid
            rows={data}
            columns={columns}
            isCellEditable={(params) =>editable? params.row.isApplicable:false}
            onCellEditCommit={handleEditCommit}
            getRowClassName={(params) => {
              let res='';
              if(params.row.number === null || params.row.number === '')res='row--empty';
              else if(params.row.number === 'N/A')res='row--na';
              else res='row--fillo'
              return res;
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Manhours;

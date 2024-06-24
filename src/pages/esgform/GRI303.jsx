import React,{useState,useEffect} from 'react';
import { Box, Button,Switch } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { tokens } from "../../theme";
import { GRI303 } from "../../data/Entities";
import Header from "../../components/Header";
import { useTheme, styled } from "@mui/material/styles";

const Gri3 = ({editable}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [edits, setEdits] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    let l=JSON.parse(localStorage.getItem("gri3"));
    if(l!=null)
    l=Object.entries(JSON.parse(localStorage.getItem("gri3")));
    const enhancedData = GRI303.map(row => ({
      ...row,
      amount: l===null?row.amount:l[row.id][1],
      isApplicable: !(row.id===3 || row.id===4 || (l===null?true:l[row.id][1]==='N/A') )
    }));
    setData(enhancedData);
  }, []);

  useEffect(() => {
    let l=JSON.parse(localStorage.getItem("gri3"));
    if(l!=null)
    l=Object.entries(JSON.parse(localStorage.getItem("gri3")));
    const enhancedData = GRI303.map(row => ({
      ...row,
      amount: l===null?row.amount:l[row.id][1],
      isApplicable: !(row.id===3 || row.id===4 || (l===null?true:l[row.id][1]==='N/A') )
    }));
    setData(enhancedData);
  }, [data]);
  const handleApplicabilityChange = (id, isApplicable) => {
    const newData = data.map(row => {
      if (row.id === id) {
        return { ...row, isApplicable };
      }
      return row;
    });
   
    if(!isApplicable) newData[id-1].amount='N/A';
    else newData[id-1].amount=''
    let temp=JSON.parse(localStorage.getItem("gri3"))
    switch(id){
      case 1: temp.surfacewater=!isApplicable?'N/A':"";
      break;
      case 2: temp.groundwater=!isApplicable?'N/A':"";
      break;
      case 5: temp.thirdpartywaterpotable=!isApplicable?'N/A':"";
      break;
      case 6: temp.thirdpartywaternewaterordesal=!isApplicable?'N/A':"";
      break;
    }
 localStorage.setItem("gri3",JSON.stringify(temp))
 window.dispatchEvent(new Event('storageUpdated'));
    setData(newData);
  };
  
  const handleEditCommit = React.useCallback(
    (params) => {
      const { id, field, value } = params;
      const newEdits = edits.filter((edit) => !(edit.id === id && edit.field === field));
      newEdits.push({ id, field, value });

      let temp = JSON.parse(localStorage.getItem('gri3'));
      newEdits.forEach((edit) => {
        switch (edit.id) {
          case 1: temp.surfacewater=edit.value;
          break;
          case 2: temp.groundwater=edit.value;
          break;
          case 5: temp.thirdpartywaterpotable=edit.value;
          break;
          case 6: temp.thirdpartywaternewaterordesal=edit.value;
          break;
        }
      });
      localStorage.setItem('gri3', JSON.stringify(temp));
      window.dispatchEvent(new Event('storageUpdated'));
      
    },
    [edits]
  );
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: 1,
  });

  const columns = [
    { field: "id", headerName: "S.no", flex: 0.5 },
    { field: "entity", headerName: "Entity", flex: 0.5 },
    { field: "amount", headerName: "Quantity", type: 'number', flex: 0.5,editable: (params) => !params.row.isApplicable},
    { field: "unit", headerName: "Unit", flex: 0.5 },
    {
      field: "upload",
      headerName: "Attachment",
      flex: 1,
      renderCell: (params) => (
        <Button
          component="label"
          variant="contained"
          size="small"

          startIcon={<CloudUploadIcon />}
          disabled={params.row.id === 3 || params.row.id === 4 || !params.row.isApplicable || !editable} 
        >
          Upload Attachment
          <VisuallyHiddenInput type="file" />
        </Button>
      ),
    },
    {
      field: "applicability",
      headerName: "Applicability",
      renderCell: (params) => (
        <Switch
          checked={params.row.isApplicable}
          onChange={(event) => handleApplicabilityChange(params.id, event.target.checked)}
          disabled={editable?params.row.id === 3 || params.row.id === 4:!editable} 
        />
      )
    },
  ];

  return (
    <Box m="20px">
      <Header title="GRI 303" subtitle="WATER & EFFLUENTS 2018" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          m: 2,
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
          isCellEditable={(params) => editable?!(params.row.id === 3 || params.row.id === 4) & params.row.isApplicable:false}
          onCellEditCommit={handleEditCommit}
          getRowClassName={(params) => {
            let res='';
            if(params.row.amount === null || params.row.amount === '')res='row--empty';
            else if(params.row.amount === 'N/A')res='row--na';
            else res='row--fillo'
            return res;
          }}
        />
      </Box>
    </Box>
  );
};

export default Gri3;

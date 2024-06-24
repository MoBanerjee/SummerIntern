import React,{useState,useEffect} from 'react';

import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { GRI301 } from "../../data/Entities";
import { styled } from '@mui/material/styles';
import { Box ,Button,Switch,IconButton, Tooltip,tooltipClasses  } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Header from "../../components/Header";
import { useTheme } from "@mui/material";


function Gri1 ({editable}){
  const [tooltipText, setTooltipText] = useState('');

  useEffect(() => {
    const storedText = localStorage.getItem('remark');
    if (storedText) {
      setTooltipText(storedText);
    }
  }, []);
  const [open, setOpen] = React.useState(true);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 500,
      fontSize: theme.typography.pxToRem(23),
      border: '1px solid #dadde9',
    },
  }));
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [edits, setEdits] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    let l=JSON.parse(localStorage.getItem("gri1"));
    if(l!=null)
    l=Object.entries(JSON.parse(localStorage.getItem("gri1")));
    const enhancedData = GRI301.map(row => ({
      ...row,

      amount:l===null?"" :l[row.id][1],
      isApplicable:l===null?true : l[row.id][1]==='N/A'  ?false:true,
    }));

    setData(enhancedData);

    
  }, []);
  useEffect(() => {
    let l=JSON.parse(localStorage.getItem("gri1"));
    if(l!=null)
    l=Object.entries(JSON.parse(localStorage.getItem("gri1")));
    const enhancedData = GRI301.map(row => ({
      ...row,

      amount:l===null?"" :l[row.id][1],
      isApplicable:l===null?true : l[row.id][1]==='N/A'  ?false:true,
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
    
    let temp=JSON.parse(localStorage.getItem("gri1"))
    console.log("b4 na: ",JSON.parse(localStorage.getItem("gri1")))
    switch(id){
      case 1: temp.rawsteel=!isApplicable?'N/A':"";
      break;
      case 2: temp.steelpipes=!isApplicable?'N/A':"";
      break;
      case 3: temp.othersteel=!isApplicable?'N/A':"";
      break;
      case 4: temp.steelshots=!isApplicable?'N/A':"";
      break;
      case 5: temp.steelgrit=!isApplicable?'N/A':"";
      break;
      case 6: temp.coppergrit=!isApplicable?'N/A':"";
      break;
      case 7: temp.weldingconsumables=!isApplicable?'N/A':"";
      break;
      case 8: temp.paint=!isApplicable?'N/A':"";
      break;
      case 9: temp.thinner=!isApplicable?'N/A':"";
      break;
    }
    
    console.log("na: ",temp);
 localStorage.setItem("gri1",JSON.stringify(temp))
 console.log("aft na: ",JSON.parse(localStorage.getItem("gri1")))

 window.dispatchEvent(new Event('storageUpdated'));
    setData(newData);
    
  };

  const handleEditCommit = React.useCallback(
    (params) => {
      const { id, field, value } = params;
    
      const newEdits = edits.filter((edit) => !(edit.id === id && edit.field === field));
      newEdits.push({ id, field, value });

      let temp = JSON.parse(localStorage.getItem('gri1'));

      newEdits.forEach((edit) => {
        switch (edit.id) {
          case 1:
            temp.rawsteel = edit.value;
            
            break;
          case 2:
            temp.steelpipes = edit.value;
            
            break;
          case 3:
            temp.othersteel = edit.value;
   
            break;
          case 4:
            temp.steelshots = edit.value;
           
            break;
          case 5:
            temp.steelgrit = edit.value;
            
            break;
          case 6:
            temp.coppergrit = edit.value;
            
            break;
          case 7:
            temp.weldingconsumables = edit.value;
           
            break;
          case 8:
            temp.paint = edit.value;
        
            break;
          case 9:
            temp.thinner = edit.value;
  
            break;
          default:
            break;
        }
      });
    
   
      localStorage.setItem('gri1', JSON.stringify(temp));
      window.dispatchEvent(new Event('storageUpdated'));
      
    },
    [edits]
  );
  
  const columns = [
    { field: "id", headerName: "S.no", flex: 0.5 },
    { field: "entity", headerName: "Entity", flex: 0.5 },
    { field: "amount", headerName: "Quantity", type: 'number', flex: 0.5, editable: (params) => !params.row.isApplicable },
    { field: "unit", headerName: "Unit", flex: 0.5 },
    {
      field: "upload",
      headerName: "Attachment",
      flex: 1,
      renderCell: (params) => (
<Button
  component="label"
  role={undefined}
  variant="contained"
  tabIndex={-1}
  disabled={!params.row.isApplicable || !editable}
  startIcon={<CloudUploadIcon />}
  size="small"
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
          disabled={!editable}
          onChange={(event) => handleApplicabilityChange(params.id, event.target.checked)}
        />
      )
    },
  ];
  

  return (
    <>
     
      <Box m="20px">
        <Header title="GRI 301" subtitle="MATERIALS 2016"/>

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
            isCellEditable={(params) => editable?params.row.isApplicable: false}
            showCellRightBorder
            showColumnRightBorder
            disableExtendRowFullWidth
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
      
    </>
  );
};

export default Gri1;

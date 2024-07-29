import React,{useState,useEffect,useContext} from 'react';
import { Box, Button,Switch } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { tokens } from "../../theme";
import { GRI303 } from "../../data/Entities";
import Header from "../../components/ui/Header";
import { useTheme, styled } from "@mui/material/styles";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Gri3Context from '../../context/Gri3Context'
import Grip3Context from '../../context/Grip3Context'



const Gri3 = ({editable}) => {
  const {gri3,setgri3}=useContext(Gri3Context);
const {grip3,setgrip3}=useContext(Grip3Context);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [edits, setEdits] = useState([]);
  const [data, setData] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const[holder,setHold] =useState([])

  const [prev,setPrev]=useState(grip3);
  const curr =React.useRef("");
  const [open, setOpen] = React.useState(false);
  const tempBool=React.useRef(false);
  const newD=React.useRef("");
  const comUpdate = React.useRef("");


  const handleClickOpen = () => {

    setOpen(true);
  };

  const handleCloseEdit = () => {
    
      tempBool.current=false;

    setOpen(false);

    comUpdate.current=""


  };
  const handleCloseConfirm = () => {
tempBool.current=false;
setgri3(curr.current)
window.dispatchEvent(new Event('storageUpdated'));
setData(newD.current);

    setOpen(false);

  };

  const fluxAnalysis=()=>{
    if(comUpdate.current=="")return;
  
    if(prev[comUpdate.current]===curr.current[comUpdate.current] || curr.current[comUpdate.current]==null || curr.current[comUpdate.current]==""){
      
      setgri3(curr.current)
  window.dispatchEvent(new Event('storageUpdated'));
  if(prev[comUpdate.current]=='N/A' || curr.current[comUpdate.current]=="N/A")
  setData(newD.current);
    }
    else{
      if(prev[comUpdate.current]!='N/A' && curr.current[comUpdate.current]!="N/A"){
        const diff=Math.round((curr.current[comUpdate.current]-prev[comUpdate.current])*100/prev[comUpdate.current])
        if(Math.abs(diff)<10){
          
          setgri3(curr.current)
          window.dispatchEvent(new Event('storageUpdated'));
         
          return;
        }
        else{
          let compare="higher"
          if(diff<0)compare='lesser';
          const absdiff=Math.abs(diff);
          setHold([prev[comUpdate.current],curr.current[comUpdate.current],absdiff,compare]);
        }
      }
      else setHold([prev[comUpdate.current],curr.current[comUpdate.current]]);
      tempBool.current=true;
      handleClickOpen()
    }
  
  }
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setSelectedFiles(files);
      files.forEach(file => saveFile(file));
    }
  };

  const saveFile = (file) => {
    const fileURL = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = fileURL;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(fileURL);
  };
  useEffect(() => {
    let l=gri3;
    if(l!=null)
    l=Object.entries(gri3);
    const enhancedData = GRI303.map(row => ({
      ...row,
      amount: l===null?row.amount:l[row.id][1],
      isApplicable: !(row.id===3 || row.id===4 || (l===null?true:l[row.id][1]==='N/A') )
    }));
    setData(enhancedData);
  }, []);

  useEffect(() => {
    let l=gri3;
    if(l!=null)
    l=Object.entries(gri3);
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
    let temp=gri3;
    newD.current=newData;
    switch(id){
      case 1: temp.surfacewater=!isApplicable?'N/A':"";
      curr.current=temp;
      comUpdate.current="surfacewater"
      break;
      case 2: temp.groundwater=!isApplicable?'N/A':"";
      curr.current=temp;
      comUpdate.current="groundwater"
      break;
      case 5: temp.thirdpartywaterpotable=!isApplicable?'N/A':"";
      curr.current=temp;
      comUpdate.current="thirdpartywaterpotable"
      break;
      case 6: temp.thirdpartywaternewaterordesal=!isApplicable?'N/A':"";
      curr.current=temp;
      comUpdate.current="thirdpartywaternewaterordesal"
      break;
    }
    fluxAnalysis();
  };
  
  const handleEditCommit = React.useCallback(
    (params) => {
      const { id, field, value } = params;
      const newEdits = edits.filter((edit) => !(edit.id === id && edit.field === field));
      newEdits.push({ id, field, value });

      let temp = gri3;
      newD.current=newEdits;
      newEdits.forEach((edit) => {
        switch (edit.id) {
          case 1: temp.surfacewater=edit.value;
         
     
          curr.current=temp;
          comUpdate.current="surfacewater"
          break;
          case 2: temp.groundwater=edit.value;
      
     
          curr.current=temp;
          comUpdate.current="groundwater"
          break;
          case 5: temp.thirdpartywaterpotable=edit.value;
          curr.current=temp;
          comUpdate.current="thirdpartywaterpotable"
          break;
          case 6: temp.thirdpartywaternewaterordesal=edit.value;
          curr.current=temp;
          comUpdate.current="thirdpartywaternewaterordesal"
          break;
        }
      });
      fluxAnalysis();
      
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

          startIcon={editable?<CloudUploadIcon />:<CloudDownloadIcon />}
          disabled={params.row.id === 3 || params.row.id === 4 || !params.row.isApplicable } 
        >
      {editable?"Upload Attachment":"Download Attachment"}
          <input
          type="file"
          hidden
          multiple
          onChange={handleFileChange}
        />
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
      <Dialog
        open={open}
        
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <h1>Please check your entry!</h1>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h2>Last month, the value of {comUpdate.current} was "{holder[0]}" but this month you are entering the value "{holder[1]}" for it. {holder.length>2 && "Your value for this month is "+holder[2]+"% "+holder[3]+" than for last month. "} Are you sure that your entry is correct?</h2>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} autoFocus>Edit</Button>
          <Button onClick={handleCloseConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Gri3;

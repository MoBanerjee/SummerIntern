import React,{useState,useEffect} from 'react';
import DialogContent from '@mui/material/DialogContent';
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import DialogContentText from '@mui/material/DialogContentText';
import { GRI302 } from "../../data/Entities";
import Header from "../../components/Header";
import { toast } from 'react-toastify';
import { useTheme } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Box ,Button,Switch, TextField, IconButton, MenuItem, Select, FormControl, InputLabel} from '@mui/material';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/RemoveCircle';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
const customContentStyle = {
  width: '200%',
  maxWidth: 'none',
};
function isGradePresent(array, grade) {
  return array.some(item => item.grade === grade);
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function shiftLastToSecond(arr) {
  if (arr.length < 3) {
      console.log("Array needs to have at least 3 elements.");
      return arr;
  }


  const lastElement = arr.pop();


  for (let i = arr.length - 1; i >= 2; i--) {
      arr[i + 1] = arr[i];
  }


  arr[2] = lastElement;

  return arr;
}


const Gri2 = ({editable}) => {
  const [open, setOpen] = React.useState(false);

  const [fields, setFields] = useState(JSON.parse(localStorage.getItem('gri2')).biodiesel==null?[]:JSON.parse(localStorage.getItem('gri2')).biodiesel);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const[holder,setHold] =useState([])

  const [prev,setPrev]=useState(JSON.parse(localStorage.getItem("grip3")));
  const curr =React.useRef("");
  const [openA, setOpenA] = React.useState(false);
  const tempBool=React.useRef(false);
  const newD=React.useRef("");
  const comUpdate = React.useRef("");
  const handleClickOpenA= () => {

    setOpenA(true);
  };

  const handleCloseEdit = () => {
    
      tempBool.current=false;

    setOpenA(false);

    comUpdate.current=""


  };
  const handleCloseConfirm = () => {
tempBool.current=false;
localStorage.setItem("gri3",JSON.stringify(curr.current));
window.dispatchEvent(new Event('storageUpdated'));
setData(newD.current);

    setOpenA(false);

  };
  const fluxAnalysis=()=>{
    if(comUpdate.current=="")return;
  
    if(prev[comUpdate.current]===curr.current[comUpdate.current] || curr.current[comUpdate.current]==null || curr.current[comUpdate.current]==""){
      localStorage.setItem("gri3",JSON.stringify(curr.current));
  window.dispatchEvent(new Event('storageUpdated'));
  if(prev[comUpdate.current]=='N/A' || curr.current[comUpdate.current]=="N/A")
  setData(newD.current);
    }
    else{
      if(prev[comUpdate.current]!='N/A' && curr.current[comUpdate.current]!="N/A"){
        const diff=Math.round((curr.current[comUpdate.current]-prev[comUpdate.current])*100/prev[comUpdate.current])
        if(Math.abs(diff)<10){
          localStorage.setItem("gri3",JSON.stringify(curr.current));
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
      handleClickOpenA()
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
  const handleAddField = () => {
    if(fields=="" || fields==null){
      setFields([{ grade: '', value: '' }]);
    }
    else
    setFields([...fields, { grade: '', value: '' }]);
  };

  const handleRemoveField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  const handleFieldChange = (index, event) => {
    const newFields = fields.map((field, i) => {
      if (i === index) {
        return { ...field, [event.target.name]: event.target.value };
      }
      return field;
    });
    setFields(newFields);
  };
  const handleClickOpen = () => {
    setOpen(true);
  
  };

  const handleClose = () => {
    handleBioDiesel();
   
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  
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
    let l=JSON.parse(localStorage.getItem("gri2"));
    if(l!=null){
    l=Object.entries(JSON.parse(localStorage.getItem("gri2")));
    l=shiftLastToSecond(l)}

    const enhancedData = GRI302.map(row => ({
      ...row,
      amount: l===null?"" :l[row.id][1],
      
      isApplicable: l===null?true : l[row.id][1]==='N/A'  ?false:true,
    }));

    setData(enhancedData);

    
  }, []);
  const StyledSelect = styled(Select)({
    '& .MuiSelect-selectMenu': {
      maxHeight: '200px', 
    },
    '& .MuiPaper-root': {
      maxHeight: '200px', 
    },
  });
  useEffect(() => {
    let l=JSON.parse(localStorage.getItem("gri2"));
    if(l!=null){
    l=Object.entries(JSON.parse(localStorage.getItem("gri2")));
  l=shiftLastToSecond(l)}

    const enhancedData = GRI302.map(row => ({
      ...row,
      amount: l===null?"" :l[row.id][1],
      isApplicable: l===null?true : l[row.id][1]==='N/A'  ?false:true,
    }));

    setData(enhancedData);

    
  }, [data]);
  const handleBioDiesel= 
    () => {


      let temp = JSON.parse(localStorage.getItem('gri2'));
      if(fields.length==0)temp.biodiesel=null
      else {
        let t=false;
        fields.forEach((element) => {
        if(element.value=='' || element.grade==''){
          t=true;
          toast.error("Please fill in all values");
          return;
        }});
        if(t)return;}
        temp.biodiesel=fields;
        localStorage.setItem('gri2', JSON.stringify(temp));
      window.dispatchEvent(new Event('storageUpdated'));
      setOpen(false);
    }
    const handleBack=()=>{
      setOpen(false);
    }
  const handleBioDapp=(id,isApplicable)=>{
    const newData = data.map(row => {
      if (row.id === 2) {
        return { ...row, isApplicable };
      }
      return row;
    });
   
    if(!isApplicable) newData[id-1].amount='N/A';
    else newData[id-1].amount=''
    let temp=JSON.parse(localStorage.getItem("gri2"))
    temp.biodiesel=!isApplicable?'N/A':"";
    localStorage.setItem("gri2",JSON.stringify(temp))
    window.dispatchEvent(new Event('storageUpdated'));
    setData(newData);

  }
  const handleApplicabilityChange = (id, isApplicable) => {
 
    const newData = data.map(row => {
   
      if (row.id === id) {
        return { ...row, isApplicable };
      }
      return row;
    });
   
    if(!isApplicable) newData[id-1].amount='N/A';
    else newData[id-1].amount=''
    let temp=JSON.parse(localStorage.getItem("gri2"))
    switch(id){
      case 1: temp.diesel=!isApplicable?'N/A':"";
      break;
      case 3: temp.gasoline=!isApplicable?'N/A':"";
      break;
      case 4: temp.biomethaneliq=!isApplicable?'N/A':"";
      break;
      case 5: temp.biomethanecomp=!isApplicable?'N/A':"";
      break;
      case 6: temp.lpg=!isApplicable?'N/A':"";
      break;
      case 7: temp.lng=!isApplicable?'N/A':"";
      break;
      case 8: temp.cng=!isApplicable?'N/A':"";
      break;
      case 9: temp.flamal26=!isApplicable?'N/A':"";
      break;
      case 10: temp.acetylene=!isApplicable?'N/A':"";
      break;
      case 11: temp.gridelec=!isApplicable?'N/A':"";
      break;
      case 12: temp.solarrenewableenergy=!isApplicable?'N/A':"";
      break;
      case 13: temp.recsrenewableenergy=!isApplicable?'N/A':"";
      break;
    }
 localStorage.setItem("gri2",JSON.stringify(temp))
 window.dispatchEvent(new Event('storageUpdated'));
    setData(newData);
  };
  const handleEditCommit = React.useCallback(
    (params) => {
      const { id, field, value } = params;
      const newEdits = edits.filter((edit) => !(edit.id === id && edit.field === field));
      newEdits.push({ id, field, value });

      let temp = JSON.parse(localStorage.getItem('gri2'));
      newEdits.forEach((edit) => {
        switch (edit.id) {
          case 1: temp.diesel=edit.value;
          break;
          case 3: temp.gasoline=edit.value;
          break;
          case 4: temp.biomethaneliq=edit.value;
          break;
          case 5: temp.biomethanecomp=edit.value;
          break;
          case 6: temp.lpg=edit.value;
          break;
          case 7: temp.lng=edit.value;
          break;
          case 8: temp.cng=edit.value;
          break;
          case 9: temp.flamal26=edit.value;
          break;
          case 10: temp.acetylene=edit.value;
          break;
          case 11: temp.gridelec=edit.value;
          break;
          case 12: temp.solarrenewableenergy=edit.value;
          break;
          case 13: temp.recsrenewableenergy=edit.value;
          break;
        }
      });
      localStorage.setItem('gri2', JSON.stringify(temp));
      window.dispatchEvent(new Event('storageUpdated'));
      
    },
    [edits]
  );

  const columns = [
    { field: "id", headerName: "S.no", flex: 0.5 },
    { field: "entity", headerName: "Entity", flex: 0.5 },
    { field: "amount", headerName: "Quantity", type: 'number', flex: 0.5, editable: (params) => !params.row.isApplicable,
    renderCell: (params) => {
      if (params.row.id === 2 && JSON.parse(localStorage.getItem('gri2')).biodiesel!='N/A') {
        return (
          <Button
            component="label"
            role={undefined}
            variant="contained"
            disabled={!params.row.isApplicable }
            tabIndex={-1}
            startIcon={<AddCircleOutlineIcon />}
            size="small"
            onClick={handleClickOpen}
          >
    {editable? "Add Grade/ Value":"View Grade/ Value"}
          </Button>
        );
      } else if(params.row.id === 2 && JSON.parse(localStorage.getItem('gri2')).biodiesel==='N/A'){
        return(<span>N/A</span>)
      }else {
        return (
          <span>{params.value}</span>
        );
      }
    }
  
  
  },
    
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
  disabled={!params.row.isApplicable }
  tabIndex={-1}
  startIcon={editable?<CloudUploadIcon />:<CloudDownloadIcon />}
  size="small"
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
          onChange={params.row.id!=2?((event) => handleApplicabilityChange(params.id, event.target.checked)):((event)=>handleBioDapp(params.id, event.target.checked))}
          disabled={(!editable)}
        />
      )
    },
  ];

  return (
    <>
     
      <Box m="20px">
        <Header title="GRI 302" subtitle="ENERGY 2016" />
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
            isCellEditable={(params) => editable?!(params.row.id === 2) & params.row.isApplicable: false}
            onCellEditCommit={handleEditCommit}
            getRowClassName={(params) => {
              let res='';
              if(params.row.id==2 && (JSON.parse(localStorage.getItem("gri2")).biodiesel==null || JSON.parse(localStorage.getItem("gri2")).biodiesel=='') )res='row--empty'
              else if(params.row.id==2 && !(JSON.parse(localStorage.getItem("gri2")).biodiesel==null || JSON.parse(localStorage.getItem("gri2")).biodiesel=="N/A" || JSON.parse(localStorage.getItem("gri2")).biodiesel=='') )res='row--fillo'
              else if(params.row.id==2 && (JSON.parse(localStorage.getItem("gri2")).biodiesel==='N/A') )res='row--na'
              else if(params.row.amount === null || params.row.amount === '')res='row--empty';
              else if(params.row.amount === 'N/A')res='row--na';
              else res='row--fillo'
              return res;
            }}
          />
        </Box>
        <Dialog
  open={open}
  onClose={handleClose}
  scroll="body"
  fullScreen={true}
  fullWidth={true}
  aria-labelledby="scroll-dialog-title"
  aria-describedby="scroll-dialog-description"

>
  <DialogContent dividers={true}     >
    <DialogContentText
      id="scroll-dialog-description"
      ref={descriptionElementRef}
      tabIndex={-1}
  
    >
      <Box sx={{ ...style }}>
        {fields.map((field, index) => (
          <Box key={index} display="flex"  alignItems="center" mb={2}>
            <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
              <InputLabel>Grade</InputLabel>
              <Select
                        name="grade"
                        value={field.grade}
                        onChange={(e) => handleFieldChange(index, e)}
                        label="Grade"
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              maxHeight: '200px',
                              overflowY: 'auto',
                            },
                          },
                        }}
                      >
                        {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
                          !isGradePresent(fields, num) || num === field.grade ? (
                            <MenuItem key={num} value={num}>
                              {num}
                            </MenuItem>
                          ) : null
                        ))}
                      </Select>
            </FormControl>
            <TextField
              name="value"
              label="Value"
              value={field.value}
              onChange={(e) => handleFieldChange(index, e)}
              variant="outlined"
              sx={{ marginRight: 2 }}
            />
            <IconButton onClick={() => handleRemoveField(index)}>
              <RemoveIcon />
            </IconButton>
          </Box>
        ))}
       {editable && <Button variant="contained" sx={{ marginRight: 20 }} startIcon={<AddIcon />} onClick={handleAddField}>
          Add
        </Button>}
        {editable &&<Button variant="contained" startIcon={<SaveIcon />} onClick={handleClose}>
          Save
        </Button>}
        {!editable && <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={handleBack}>
          Back
        </Button>}
      </Box>
    </DialogContentText>
  </DialogContent>
</Dialog>

<Dialog
        open={openA}
        
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
    </>
  );
};

export default Gri2;


import React,{useContext,useState} from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';

import fidContext from '../../context/FormIDContext'
import ManhoursContext from '../../context/ManhoursContext'
import UserContext from '../../context/UserContext'
import RemarkContext from '../../context/RemarkContext'
import StateContext from '../../context/StateContext'
import YMContext from '../../context/YMContext'
import CurrentBUContext from '../../context/CurrentBUContext'
import Gri1Context from '../../context/Gri1Context'
import Gri2Context from '../../context/Gri2Context'
import Gri3Context from '../../context/Gri3Context'
import Gri5Context from '../../context/Gri5Context'
import Gri6Context from '../../context/Gri6Context'
import Grip1Context from '../../context/Grip1Context'
import Grip2Context from '../../context/Grip2Context'
import Grip3Context from '../../context/Grip3Context'
import Grip5Context from '../../context/Grip5Context'
import Grip6Context from '../../context/Grip6Context'
import { red, green ,orange} from '@mui/material/colors';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useNavigate } from 'react-router-dom';
import GRI1 from './GRI301';
import APIManager from '../../APIManager/APIManager'
import GRI2 from './GRI302';
import GRI3 from './GRI303';
import GRI5 from './GRI305';
import GRI6 from './GRI306';
import Manhours from './Manhours';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UseModal from '../../components/remarks/RemarksBox';; 


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const ColorButtonApprove = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[500]),
  backgroundColor: green[500],
  padding: '6px 12px',
  border: '1.5px solid',
  fontSize: 12,
  flex: 1,
  '&:hover': {
    backgroundColor: green[700],
  },
}));



const ColorButtonDeny = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[500]),
  backgroundColor: red[500],
  padding: '6px 12px',
  border: '1.5px solid',
  fontSize: 12,
  flex: 1,
  '&:hover': {
    backgroundColor: red[700],
  },
}));  

const ColorButtonClose = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[500]),
  backgroundColor: orange[500],
  padding: '6px 12px',
  border: '1.5px solid',
  fontSize: 12,
  flex: 1,
  '&:hover': {
    backgroundColor: red[700],
  },
}));  



function ApproveDenyForm({ editable }) {
  const {fid, setfid}=useContext(fidContext);
const {manhours,setmanhours}=useContext(ManhoursContext);
const {remarks,setremarks}=useContext(RemarkContext);
const {currentBu,setcurrentBu}=useContext(CurrentBUContext);
const {state,setstate}=useState(StateContext)
const {ym,setym}=useState(YMContext)
const {user,setuser}=useContext(UserContext);
const {gri1,setgri1}=useContext(Gri1Context);
const {gri2,setgri2}=useContext(Gri2Context);
const {gri3,setgri3}=useContext(Gri3Context);
const {gri5,setgri5}=useContext(Gri5Context);
const {gri6,setgri6}=useContext(Gri6Context);
const {grip1,setgrip1}=useContext(Grip1Context);
const {grip2,setgrip2}=useContext(Grip2Context);
const {grip3,setgrip3}=useContext(Grip3Context);
const {grip5,setgrip5}=useContext(Grip5Context);
const {grip6,setgrip6}=useContext(Grip6Context);
function clearStorage(){
  setfid(null);
  setmanhours(null);
  setgri1(null);
  setgri2(null);
  setgri3(null);
  setgri5(null);
  setgri6(null);

}
  const navigate = useNavigate();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [openA, setOpenA] = React.useState(false);
  const [openD, setOpenD] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false); 
  const userinfo = user|| [];
  const role = userinfo[0].role 
  const handleGoBack = async () => {
    clearStorage();
    navigate("/grading");
  };
  const approveForm = async () => {
    setOpenA(false);
    try {
        let t="al1"
        if(role==="Approver 2")t="al2"
      
      APIManager.approveForm({
        fid: fid,
        type: t,
        doer:userinfo[0].email
      })
      toast.success("Form has been approved successfully!");
      setTimeout(() => {
        clearStorage();
        navigate("/grading");
      }, 0);
    } catch (error) {
      console.error("Error approving form:", error);
    }
  };

  const denyForm = async() => {
    setOpenD(false);
    try {
        let t="dl1"
        if(role==="Approver 2")t="dl2"
        const results = APIManager.denyForm({

  fid:fid,
  type:t,
  doer:userinfo[0].email
  
          })
        
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    setShowModal(true); 
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCloseA = () => {
    setOpenA(false);
  };

  const handleClickOpenA = () => {
    setOpenA(true);
  };

  const handleCloseD = () => {
    setOpenD(false);
  };

  const handleClickOpenD = () => {
    setOpenD(true);
  };

  function a11yProps(index) {
    return {
      id: `action-tab-${index}`,
      'aria-controls': `action-tabpanel-${index}`,
    };
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
    <div style={{ position: 'sticky', top: 0, zIndex: 1600, backgroundColor: 'white', padding: '10px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10px' }}>

      <ColorButtonApprove variant="contained" size="normal" onClick={handleClickOpenA} endIcon={<ThumbUpAltIcon />}>
           {role==="Approver 1"? "Approve":"Receive"}
          </ColorButtonApprove>
          <ColorButtonDeny variant="contained" size="normal" onClick={handleClickOpenD} endIcon={<CancelIcon />}>
            Deny
          </ColorButtonDeny>
          <ColorButtonClose variant="contained" size="normal" onClick={handleGoBack } endIcon={<CloseIcon />}>
            Close
          </ColorButtonClose>
      </div>
    </div>
    <Box sx={{ bgcolor: 'background.paper', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
    <AppBar position="sticky" color="default" style={{ top: 0, zIndex: 1500 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="Manhours" {...a11yProps(1)} sx={{ fontSize: 17 }} />
          <Tab label="GRI301" {...a11yProps(2)} sx={{ fontSize: 17 }} />
          <Tab label="GRI302" {...a11yProps(3)} sx={{ fontSize: 17 }} />
          <Tab label="GRI303" {...a11yProps(4)} sx={{ fontSize: 17 }} />
          <Tab label="GRI305" {...a11yProps(5)} sx={{ fontSize: 17 }} />
          <Tab label="GRI306" {...a11yProps(0)} sx={{ fontSize: 17 }} />
        </Tabs>
      </AppBar>
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <GRI1 editable={false} />
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <GRI2 editable={false} />
      </TabPanel>
      <TabPanel value={value} index={3} dir={theme.direction}>
        <GRI3 editable={false} />
      </TabPanel>
      <TabPanel value={value} index={4} dir={theme.direction}>
        <GRI5 editable={false} />
      </TabPanel>
      <TabPanel value={value} index={5} dir={theme.direction}>
        <GRI6 editable={false} />
      </TabPanel>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <Manhours editable={false} />
      </TabPanel>
      </Box>

      <Dialog
        open={openA}
        onClose={handleCloseA}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontSize: 20 }}>
          {"Approve Submission?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ fontSize: 17, color: green[1000] }}>
            Once approved, you cannot undo your action! <br />Please confirm your action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseA} sx={{ fontSize: 17, color: red[600] }}>Cancel</Button>
          <Button onClick={approveForm} autoFocus sx={{ fontSize: 17, color: green[600] }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openD}
        onClose={handleCloseD}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontSize: 20 }}>
          {"Deny Submission?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ fontSize: 17, color: green[1000] }}>
            Once denied, you cannot undo your action! <br />Please confirm your action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseD} sx={{ fontSize: 17, color: red[600] }}>Cancel</Button>
          <Button onClick={denyForm} autoFocus sx={{ fontSize: 17, color: green[600] }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {showModal && <UseModal />} 
    </Box>
    </div>
  );
}

export default ApproveDenyForm;


import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import axios from 'axios';
import { purple, red, green } from '@mui/material/colors';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import SaveAsSharpIcon from '@mui/icons-material/SaveAsSharp';
import { useNavigate } from 'react-router-dom';
import fidContext from '../../context/FormIDContext'
import ManhoursContext from '../../context/ManhoursContext'
import UserContext from '../../context/UserContext'

import CurrentBUContext from '../../context/CurrentBUContext'
import Gri1Context from '../../context/Gri1Context'
import Gri2Context from '../../context/Gri2Context'
import Gri3Context from '../../context/Gri3Context'
import Gri5Context from '../../context/Gri5Context'
import Gri6Context from '../../context/Gri6Context'
import APIManager from '../../APIManager/APIManager'
import GRI1 from './GRI301';
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
const {fid, setfid}=useContext(fidContext);
const {manhours,setmanhours}=useContext(ManhoursContext);

const {currentBu,setcurrentBu}=useContext(CurrentBUContext);

const {user,setuser}=useContext(UserContext);
const {gri1,setgri1}=useContext(Gri1Context);
const {gri2,setgri2}=useContext(Gri2Context);
const {gri3,setgri3}=useContext(Gri3Context);
const {gri5,setgri5}=useContext(Gri5Context);
const {gri6,setgri6}=useContext(Gri6Context);

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

const ColorButtonSave = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  padding: '6px 12px',
  border: '1.5px solid',
  fontSize: 12,
  flex: 1,
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

const ColorButtonSubmit = styled(Button)(({ theme }) => ({
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

function replaceNAWithMinusOne(obj) {
  for (let key in obj) {
    if (obj[key] === 'N/A') {
      obj[key] = -1;
    }
  }
}

function clearStorage() {
  setfid(null);
  setmanhours(null);
  setgri1(null);
  setgri2(null);
  setgri3(null);
  setgri5(null);
  setgri6(null);
}

function FloatingActionButtonZoom({ editable }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [bgdcolor1, setColor1] = React.useState("#ff7f7f");
  const [bgdcolor2, setColor2] = React.useState("#ff7f7f");
  const [bgdcolor3, setColor3] = React.useState("#ff7f7f");
  const [bgdcolor4, setColor4] = React.useState("#ff7f7f");
  const [bgdcolor5, setColor5] = React.useState("#ff7f7f");
  const [bgdcolor6, setColor6] = React.useState("#ff7f7f");
  


    const updateColors = () => {
      let g1 = gri1
      let g2 = gri2
      let g3 = gri3
      let g5 = gri5
      let g6 = gri6
      let mh = manhours

      if (mh === null || mh === "") setColor1("#ff7f7f");
      else setColor1("lightgreen");

      if (g1) {
        let isEmpty1 = Object.values(g1).some(x => x === null || x === '');
        setColor2(isEmpty1 ? "#ff7f7f" : "lightgreen");
      }

      if (g2) {
        let isEmpty2 = Object.values(g2).some(x => x === null || x === '');
        setColor3(isEmpty2 ? "#ff7f7f" : "lightgreen");
      }

      if (g3) {
        let isEmpty3 = Object.values(g3).some(x => x === null || x === '');
        setColor4(isEmpty3 ? "#ff7f7f" : "lightgreen");
      }

      if (g5) {
        let isEmpty5 = Object.values(g5).some(x => x === null || x === '');
        setColor5(isEmpty5 ? "#ff7f7f" : "lightgreen");
      }

      if (g6) {
        let isEmpty6 = Object.values(g6).some(x => x === null || x === '');
        setColor6(isEmpty6 ? "#ff7f7f" : "lightgreen");
      }

    };

    

    React.useEffect(() => {
      updateColors();
      const storageListener = () => {
        updateColors();
      };
      window.addEventListener('storageUpdated', storageListener);
  
      return () => {
        window.removeEventListener('storageUpdated', storageListener);
      };
    }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const submitForm = async () => {
    setOpen(false);

    let g1 = gri1
    let g2 = gri2
    let g3 = gri3
    let g5 = gri5
    let g6 = gri6
    let mh = manhours
    let isEmpty = mh === null || mh === "";

    let listobj = [g1, g2, g3, g5, g6];
    for (let y = 0; y < 5 && !isEmpty; y++) {
      isEmpty = Object.values(listobj[y]).some(x => x === null || x === '');
      if (isEmpty) console.log(y);
    }

    if (!isEmpty) {
      replaceNAWithMinusOne(g1);
      replaceNAWithMinusOne(g2);
      replaceNAWithMinusOne(g3);
      replaceNAWithMinusOne(g5);
      replaceNAWithMinusOne(g6);
      if (mh == 'N/A') mh = -1;
      try {
        const results = APIManager.submitForm(
          {
            gri1: g1,
            gri2: g2,
            gri3: g3,
            gri5: g5,
            gri6: g6,
            mh: mh,
            fid: fid,
            type: "submitted",
            doer: user[0].email,
            bu: currentBu,
          }

        )

        toast.success("Your form has been submitted successfully!");
        setTimeout(() => {
          clearStorage();
          navigate("/datainput");
        }, 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      toast.error("Failed to submit! Please complete the sections of the form highlighted red!");
      return;
    }
  };

  const saveDraft = async () => {
    setOpen(false);

    let g1 = gri1
    let g2 = gri2
    let g3 = gri3
    let g5 = gri5
    let g6 = gri6
    let mh = manhours

    replaceNAWithMinusOne(g1);
    replaceNAWithMinusOne(g2);
    replaceNAWithMinusOne(g3);
    replaceNAWithMinusOne(g5);
    replaceNAWithMinusOne(g6);
    if (mh == 'N/A') mh = -1;

    try {
      const results = 
      APIManager.submitForm({
        gri1: g1,
        gri2: g2,
        gri3: g3,
        gri5: g5,
        gri6: g6,
        mh: mh,
        fid: fid,
        type: "saved",
        doer: user[0].email,
      })

      toast.success("Your draft has been saved successfully!");
      setTimeout(() => {
        clearStorage();
        navigate("/datainput");
      }, 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function a11yProps(index) {
    return {
      id: `action-tab-${index}`,
      'aria-controls': `action-tabpanel-${index}`,
    };
  }

  return (
    <>

    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 1600, backgroundColor: 'white', padding: '10px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10px' }}>
          <ColorButtonSave variant="contained" size="normal" onClick={saveDraft} endIcon={<SaveAsSharpIcon />}>
            Save as Draft
          </ColorButtonSave>
          <ColorButtonSubmit variant="contained" size="normal" onClick={handleClickOpen} endIcon={<SendIcon />}>
            Submit
          </ColorButtonSubmit>
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
            <Tab label="Manhours" {...a11yProps(1)} sx={{ fontSize: 17, backgroundColor: bgdcolor1 }} />
            <Tab label="GRI301" {...a11yProps(2)} sx={{ fontSize: 17, backgroundColor: bgdcolor2 }} />
            <Tab label="GRI302" {...a11yProps(3)} sx={{ fontSize: 17, backgroundColor: bgdcolor3 }} />
            <Tab label="GRI303" {...a11yProps(4)} sx={{ fontSize: 17, backgroundColor: bgdcolor4 }} />
            <Tab label="GRI305" {...a11yProps(5)} sx={{ fontSize: 17, backgroundColor: bgdcolor5 }} />
            <Tab label="GRI306" {...a11yProps(0)} sx={{ fontSize: 17, backgroundColor: bgdcolor6 }} />
          </Tabs>
        </AppBar>
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          <TabPanel value={value} index={1} dir={theme.direction} style={{ color: 'green' }}>
            <GRI1 editable={true} />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <GRI2 editable={true} />
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <GRI3 editable={true} />
          </TabPanel>
          <TabPanel value={value} index={4} dir={theme.direction}>
            <GRI5 editable={true} />
          </TabPanel>
          <TabPanel value={value} index={5} dir={theme.direction}>
            <GRI6 editable={true} />
          </TabPanel>
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Manhours editable={true} />
          </TabPanel>
        </Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" sx={{ fontSize: 20 }}>
            {"Submit Form?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" sx={{ fontSize: 17, color: green[1000] }}>
              Once submitted, you cannot resubmit this form! <br />Please confirm your action
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ fontSize: 17, color: red[600] }}>Cancel</Button>
            <Button onClick={submitForm} autoFocus sx={{ fontSize: 17, color: green[600] }}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
    </>
  );
}

export default FloatingActionButtonZoom;


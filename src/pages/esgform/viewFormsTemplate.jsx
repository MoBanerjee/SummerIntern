import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import { red, orange } from '@mui/material/colors';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import CommentIcon from '@mui/icons-material/Comment';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import GRI1 from './GRI301';
import GRI2 from './GRI302';
import GRI3 from './GRI303';
import GRI5 from './GRI305';
import GRI6 from './GRI306';
import Manhours from './Manhours';

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

const ColorButton = styled(Button)(({ theme, bgcolor }) => ({
  color: theme.palette.getContrastText(bgcolor),
  backgroundColor: bgcolor,
  padding: '6px 12px',
  border: '1.5px solid',
  fontSize: 12,
  flex: 1,
  '&:hover': {
    backgroundColor: bgcolor,
  },
}));
const getColorScheme = (state, theme) => {
  const validColors = {
    'Approved by Level 1': '#73fa92',
    'Received by Level 2': '#069147',
    'Denied by Level 1': '#f07179',
    'Denied by Level 2': '#c20612',
    'Submitted but not approved': '#f2d830',
    'Reset for rectification':'#FFA500'
  };

  

  const backgroundColor = validColors[state] 
  

  let color;
  try {
    color = theme.palette.getContrastText(backgroundColor);
  } catch (error) {
    console.error("Error getting contrast text color:", error);
    color = '#000'; 
  }

  return {
    color,
    backgroundColor,
  };
};

const Banner = styled('div')(({ theme, localState }) => ({

  padding: '6px 12px',
  border: '1.5px solid ',
  borderRadius: '4px',
  fontSize: 14,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  flexGrow: 1,
  height: '37px',
}));
const LargeTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .MuiTooltip-tooltip`]: {
    fontSize: '1rem', 
  },
});
function clearStorage() {
  localStorage.setItem('fid', null);
  localStorage.setItem('manhours', null);
 
  localStorage.setItem('gri1', null);
  localStorage.setItem('gri2', null);
  localStorage.setItem('gri3', null);
  localStorage.setItem('gri5', null);
  localStorage.setItem('gri6', null);
  localStorage.setItem('remark', null);
  localStorage.setItem('state', null);
}

function FloatingActionButtonZoom({ editable }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [localState, setLocalState] = useState('');
  const [tooltipOpen, setTooltipOpen] = useState(false);

  useEffect(() => {
    const state = JSON.parse(localStorage.getItem('state'));
    setLocalState(state);
  }, []);

  const handleGoBack = async () => {
    clearStorage();
    navigate("/viewF");
  };

  const handleShowRemark = () => {
    setTooltipOpen(!tooltipOpen);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        <Banner
  localState={localState}
  style={{
    color: getColorScheme(localState,useTheme()).color,
    backgroundColor: getColorScheme(localState,useTheme()).backgroundColor
  }}
>{"Form has been " + localState}</Banner>
          {(localState === 'Denied by Level 1' || localState === 'Denied by Level 2') && (
            <LargeTooltip
              title={JSON.parse(localStorage.getItem("remark"))}
              open={tooltipOpen}
              onClose={() => setTooltipOpen(false)}
              disableFocusListener
              disableHoverListener
              disableTouchListener

            >
              <ColorButton
                variant="contained"
                size="normal"
                onClick={handleShowRemark}
                endIcon={tooltipOpen ? <CommentsDisabledIcon/> : <CommentIcon />}
                bgcolor={tooltipOpen ? orange[700] : orange[500]}
              >
                {tooltipOpen ? 'Hide Remark' : 'Show Remark'}
              </ColorButton>
            </LargeTooltip>
          )}
          <ColorButton variant="contained" size="normal" onClick={handleGoBack} endIcon={<CloseIcon />} bgcolor={red[700]}>
            Close
          </ColorButton>
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
      </Box>
    </div>
  );
}

export default FloatingActionButtonZoom;

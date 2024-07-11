import React,{ useState } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { tokens } from "../../theme";
import SubmitData from "@mui/icons-material/Backup";
import  secureLocalStorage  from  "react-secure-storage";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SummarizeIcon from '@mui/icons-material/Summarize';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import SeatriumLogo from "../../Assets/SeatriumLogo.png"
import FlagIcon from '@mui/icons-material/Flag';
import BookIcon from '@mui/icons-material/Book';
import FeedbackIcon from '@mui/icons-material/Feedback';
const Item = ({ title, to,state, icon, selected, setSelected,BU }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleClick = (BU) => {
  
    setSelected(title);

 
    localStorage.setItem('currentBu', JSON.stringify(state));
    
    
  };
  return (
    <MenuItem
      active={selected === title}
      onClick={() => handleClick(BU)}
      icon={icon}
      style={{ color: selected === title ? colors.primary[500] : colors.grey[100] }}
    >
      <Link to={{
        pathname: to,
        state: state
      }}style={{ textDecoration: 'none', color: 'inherit' }}>
        <Typography>{title}</Typography>
      </Link>
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [isDataInputOpen, setIsDataInputOpen] = useState(false);
  const [isROpen, setROpen] = useState(false);
  const [isGOpen, setGOpen] = useState(false);
  const [isMOpen, setMOpen] = useState(false);
  const [isAOpen, setAOpen] = useState(false);
  const userinfo = JSON.parse(localStorage.getItem("user"))|| [];
  const role = userinfo[0].role 
  const allbus=["B1","B2","B3","B4","B5","B6","B7","B8","B9","B10","B11","B12","B13","B14","B15","B16"];
  const bus =(role=="Approver 2" || role=="Admin") ?allbus:((userinfo.length > 0 && userinfo[0].bus) ? userinfo[0].bus : []);


  const buslist={};
  buslist["B1"]="SNE";
  buslist["B2"]="SOGA";
  buslist["B3"]="SPMI";
  buslist["B4"]="SSSI";
  buslist["B5"]="SNHI";
  buslist["B6"]="SNS";
  buslist["B7"]="SFB";
  buslist["B8"]="SSMB";
  buslist["B9"]="SAM";
  buslist["B10"]="TBY";
  buslist["B11"]="AY";
  buslist["B12"]="PY";
  buslist["B13"]="SMS";
  buslist["B14"]="PTS";
  buslist["B15"]="PTK";
  buslist["B16"]="EJA";
  let dataInputSubitems = [];
  for (let j = 0; j < bus.length; j++) {

    dataInputSubitems.push({
      title: buslist[bus[j]],
      path: '/datainput',
      state: bus[j] 
    })
  }
  let ReSubitems = [];
  for (let j = 0; j < bus.length; j++) {

    ReSubitems.push({
      title: buslist[bus[j]],
      path: '/resubmitportal',
      state: bus[j] 
    })
  }
  let GSubitems = [];
  for (let j = 0; j < bus.length; j++) {

    GSubitems.push({
      title: buslist[bus[j]],
      path: '/grading',
      state: bus[j] 
    })
  }
  let ASubitems = [];
  for (let j = 0; j < bus.length; j++) {

    ASubitems.push({
      title: buslist[bus[j]],
      path: '/viewF',
      state: bus[j] 
    })
  }
  let MSubitems = [
    {      title: "Create New Account",
      path: '/createacc',
      state: null },
      {      title: "Delete Account",
      path: '/delete',
      state: null },


  ];



  return (
    <Box sx={{
      "& .pro-sidebar-inner": { background: `blue !important` },
      "& .pro-icon-wrapper": { backgroundColor: "transparent !important" },
      "& .pro-inner-item": { color: 'white',padding: "5px 35px 5px 20px !important" },
      "& .pro-inner-item:hover": { color: "lightblue !important" },
      "& .pro-menu-item.active": { color: "yellow !important" },
    }}>
      <ProSidebar collapsed={isCollapsed}>
      <img src={SeatriumLogo} style={{width:295, height:47.5}}></img>
        <Menu iconShape="square" >
          <MenuItem onClick={() => setIsCollapsed(!isCollapsed)} icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ margin: "10px 0 20px 0", color: colors.grey[100] }}>
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            
            <Item title="Home" to="/home" icon={<HomeIcon />} selected={selected} setSelected={setSelected} />
            
           {role==="User" && <SubMenu title="Data Input" icon={<SubmitData />} open={isDataInputOpen} onOpenChange={() => setIsDataInputOpen(!isDataInputOpen)}
  style={{ color: 'black' }}> 
  {dataInputSubitems.map((subitem, index) => (
    <Item key={index} title={subitem.title} to={subitem.path} state={subitem.state} BU={subitem.state} selected={selected} setSelected={setSelected} />
  ))}
</SubMenu>}
{(role==="Approver 1" || role==="Approver 2") && <SubMenu title="Pending Approvals" icon={<SubmitData />} open={isGOpen} onOpenChange={() => setGOpen(!isGOpen)}
  style={{ color: 'black' }}> 
  {GSubitems.map((subitem, index) => (
    <Item key={index} title={subitem.title} to={subitem.path} state={subitem.state} BU={subitem.state} selected={selected} setSelected={setSelected} />
  ))}
</SubMenu>}
{(role==="Approver 1" || role==="Approver 2" || role==="User" || role==="Admin") && <SubMenu title="Archive" icon={<BookmarkIcon />} open={isAOpen} onOpenChange={() => setAOpen(!isAOpen)}
  style={{ color: 'black' }}> 
  {ASubitems.map((subitem, index) => (
    <Item key={index} title={subitem.title} to={subitem.path} state={subitem.state} BU={subitem.state} selected={selected} setSelected={setSelected} />
  ))}
</SubMenu>}

{(role==="Admin") && <SubMenu title="Manage Accounts" icon={<ManageAccountsIcon />} open={isMOpen} onOpenChange={() => setMOpen(!isMOpen)}
  style={{ color: 'black' }}> 
  {MSubitems.map((subitem, index) => (
    <Item key={index} title={subitem.title} to={subitem.path} state={subitem.state} BU={subitem.state} selected={selected} setSelected={setSelected} />
  ))}
</SubMenu>}
{role==="User" && <SubMenu title="Resubmission Portal" icon={<EventRepeatIcon />} open={isROpen} onOpenChange={() => setROpen(!isROpen)}
  style={{ color: 'black' }}> 
  {ReSubitems.map((subitem, index) => (
    <Item key={index} title={subitem.title} to={subitem.path} state={subitem.state} BU={subitem.state} selected={selected} setSelected={setSelected} />
  ))}
</SubMenu>}
{(role==="Admin") && <Item title="View Logbook" to="/log" icon={<BookIcon />} selected={selected} setSelected={setSelected} />}{/**view summary n dashboard*/}
{(role==="Admin") && <Item title="Summary Report" to="/getpdf" icon={<SummarizeIcon />} selected={selected} setSelected={setSelected} />}   
{(role==="Admin") && <Item title="Service Requests" to="/requestReview" icon={<FeedbackIcon />} selected={selected} setSelected={setSelected} />}   
{(role==="Approver 1" || role==="User" ) && <Item title="Raise Service Request" to="/raiseTicket" icon={<FlagIcon />} selected={selected} setSelected={setSelected} />}   
          </Box>
        </Menu>
      </ProSidebar>
      
    </Box>
  );
};

export default Sidebar;

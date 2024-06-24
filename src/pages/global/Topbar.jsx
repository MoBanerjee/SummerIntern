import React, { useState } from 'react';
import { Box, IconButton, useTheme, Menu, MenuItem } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { white } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { toast } from "react-toastify";
import DialogTitle from '@mui/material/DialogTitle';
import { red, green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Inbox from '../../components/Inbox';; 
const Topbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [openD, setOpenD] = React.useState(false);
  const userinfo = JSON.parse(localStorage.getItem("user"))|| [];
  const handleCloseD = () => {
    setOpenD(false);
  };
  const handleClickOpenD = () => {
    setOpenD(true);
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setAnchorEl(null);
  };
  const handleViewProfile = () => {
    handleSettingsClose ();
    navigate("/view")
  };
  const logout=()=>{
    handleCloseD()
    handleSettingsClose ();
    localStorage.clear();
    navigate("/");

  }
  const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'white',
    color: 'white',
    padding: '6px 12px',
    border: '1.5px solid',
    fontSize: 9.5,
    '&:hover': {
      backgroundColor: "yellow",
    },
  }));
  const handleSwitch = () => {
    let temp=JSON.parse(localStorage.getItem("user"))
    if(temp[0].role=="Admin")
   temp[0].role="Approver 2"
  else temp[0].role="Admin"

    localStorage.setItem('user', JSON.stringify(temp));
    
    toast.success("You are now logged in as "+temp[0].role);
        navigate("/home");
        
    
  };
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={1}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'lightblue',
        height: '48px',  
        zIndex: 1000,
      }}
    >

      <Box display="flex">
        {/*
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        */}
      </Box>

      {/* Right Side */}
      <Box display="flex" alignItems="center">
      {(userinfo[0].highprivelege )&& <StyledButton variant="contained" onClick={handleSwitch} style={{color:'blue'}}>
      {userinfo[0].role=="Admin"?"Switch to  Approver 2 Mode":"Switch to Admin Mode"}
    </StyledButton>}
<Inbox/>
        <IconButton onClick={handleSettingsClick} style={{color:'blue'}}>
          <SettingsIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleSettingsClose}
        >
          <MenuItem onClick={handleViewProfile} style={{color:'blue'}}>View Profile</MenuItem>
          <MenuItem onClick={handleClickOpenD } style={{color:'blue'}}>Logout</MenuItem>
        </Menu>
        <Dialog
        open={openD}
        onClose={handleCloseD}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontSize: 20 }}>
          {"Logout?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ fontSize: 17, color: green[1000] }}>
            Are you sure you want to logout?<br />Please confirm your action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseD} sx={{ fontSize: 17, color: red[600] }}>Cancel</Button>
          <Button onClick={logout} autoFocus sx={{ fontSize: 17, color: green[600] }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      </Box>
    </Box>
  );
};

export default Topbar;

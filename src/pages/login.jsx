
import React, { useState, useEffect } from 'react';
import { Box, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useMediaQuery from "@mui/material/useMediaQuery";
import secureLocalStorage from "react-secure-storage";
import Header from "../components/ui/Header";
import { toast } from 'react-toastify';
import { AuthProvider, useAuth } from 'react-oauth2-code-pkce';
import APIManager from '../../APIManager/APIManager'

const CreateAccount = () => {
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [user, setUser] = useState(null);
  const { authService } = useAuth();

  useEffect(() => {
   
    if (authService.isAuthenticated()) {
      const accessToken = authService.getAccessToken();
      getUserInfo(accessToken);
    }
  }, [authService]);

  const getUserInfo = async (accessToken) => {
    try {
      const response = await axios.get('https://graph.microsoft.com/v1.0/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setUser(response.data);
      secureLocalStorage.setItem('user', JSON.stringify(response.data));
      toast.success("Logged in successfully!");
      navigate('/home');
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const handleOAuthLogin = () => {
    authService.authorize();
  };

  return (
    <Box m="20px">
      <Header title="Login" subtitle="Log in using your Outlook account" />
      <Box display="flex" justifyContent="center" mt="20px">
        <Button onClick={handleOAuthLogin} color="primary" variant="contained">
          Login with Outlook
        </Button>
      </Box>
    </Box>
  );
};

const App = () => {
  return (
    <AuthProvider
      authConfig={{
        clientId: 'YOUR_CLIENT_ID', // replace with your client ID
        authorizationEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
        tokenEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
        redirectUri: 'http://localhost:3000/callback', // your redirect URI
        scopes: ['openid', 'profile', 'email', 'offline_access', 'User.Read']
      }}
    >
      <CreateAccount />
      
    </AuthProvider>
  );
};

export default App;

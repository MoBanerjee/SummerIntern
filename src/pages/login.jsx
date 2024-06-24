/**import React, { useState } from 'react';
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Formik } from "formik";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import secureLocalStorage from "react-secure-storage";
import Header from "../components/Header";
import { toast } from 'react-toastify';

const CreateAccount = () => {
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [user, setUser] = useState();
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [emailForReset, setEmailForReset] = useState("");

  const submitData = async (values) => {
    try {
      const response = await axios.post(`http://localhost:3000/verifyAccount`, {
        email: values.email,
        password: values.password,
      });
      toast.success("Logged in successfully!");
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate("/home");
    } catch (error) {
      toast.error("Incorrect credentials! Please try again!");
      console.error("Error fetching data:", error);
    }
  };

  const handleFormSubmit = (values) => {
    submitData(values);
  };

  const handleForgotPasswordSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/checkEmail`, { email: emailForReset });
      if (response.status === 200) {
        setForgotPasswordOpen(false);
        const response = await axios.post(`http://localhost:3000/forgotPassword`, { email: emailForReset });
        //setResetPasswordOpen(true);
      } 
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("No account found with this email address!");
      } else {
        toast.error("Error deleting account. Please try again.");
      }
      console.error("Error deleting account:", error);
    }
  };

  /**const handleResetPasswordSubmit = async (values) => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    try {
      const response = await axios.post(`http://localhost:3000/resetPassword`, {
        token,
        newPassword: values.newPassword,
      });
      toast.success("Password reset successfully! Logging in...");
      navigate("/login");
    } catch (error) {
      toast.error("Error resetting password! Please try again.");
      console.error("Error resetting password:", error);
    }
  };

  return (
    <Box m="20px">
      <Header title="Login" subtitle="Please fill in your credentials below" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
              <Button onClick={() => setForgotPasswordOpen(true)} color="primary">
                Forgot Password?
              </Button>
              <Button type="submit" color="secondary" variant="contained">
                Login
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      <Dialog open={forgotPasswordOpen} onClose={() => setForgotPasswordOpen(false)}>
        <DialogTitle>Forgot Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your registered email address
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={emailForReset}
            onChange={(e) => setEmailForReset(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setForgotPasswordOpen(false)}>Cancel</Button>
          <Button onClick={handleForgotPasswordSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>


    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
});

const initialValues = {
  email: "",
  password: "",
};

export default CreateAccount;*/
import React, { useState, useEffect } from 'react';
import { Box, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useMediaQuery from "@mui/material/useMediaQuery";
import secureLocalStorage from "react-secure-storage";
import Header from "../components/Header";
import { toast } from 'react-toastify';
import { AuthProvider, useAuth } from 'react-oauth2-code-pkce';
import { red, green } from '@mui/material/colors';

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

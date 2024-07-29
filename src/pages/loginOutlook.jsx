
import React, { useState ,useContext} from 'react';
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Formik } from "formik";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/ui/Header";
import { toast } from 'react-toastify';
import { green } from '@mui/material/colors';
import APIManager from '../APIManager/APIManager'
import UserContext from '../context/UserContext'



const CreateAccount = () => {
  const {userContext,setuser}=useContext(UserContext);
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [user, setUser] = useState();
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  const [emailForReset, setEmailForReset] = useState("");
  const [openD, setOpenD] = useState(false);

  const handleOpenD = () => {
    setOpenD(true);
  };

  const handleCloseD = () => {
    setOpenD(false);
  };

  const handleAdmin = () => {
    let temp=userContext
   temp[0].role="Admin"
    setuser(temp)
    handleCloseD();
    toast.success("Logged in successfully!");
        navigate("/home");
        
    
  };

  const handleApprover2 = () => {
    let temp=userContext
   temp[0].role="Approver 2"
   setuser(temp)
    handleCloseD();
    toast.success("Logged in successfully!");
        navigate("/home");
        
  };
  const submitData = async (values) => {
    try {
      const response = 
      APIManager.verifyAccount({
        email: values.email,
        password: values.password,
      })
      localStorage.setItem("token",response.data.rows)
      setUser(response.data.rows);
      
      
      setuser(response.data)
      if(response.data[0].highprivelege){
        
        handleOpenD();
      }
      else{
        toast.success("Logged in successfully!");
        navigate("/home");
        
      }
      
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
      const response = 
      APIManager.checkEmail({
        email: emailForReset
      })
      if (response.status === 200) {
        setForgotPasswordOpen(false);
        const response =
        APIManager.forgotPassword({
          email: emailForReset
        })
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

 const handleResetPasswordSubmit = async (values) => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    try {
      const response = 
      APIManager.resetPassword({
        token,
        newPassword: values.newPassword,
      })
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
      <Dialog
    open={openD}
    onClose={handleCloseD}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title" sx={{ fontSize: 20 }}>
      {"Choose Onboarding Role"}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description" sx={{ fontSize: 17, color: green[800] }}>
        Please select the role you want to onboard as:
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleAdmin} sx={{ fontSize: 17, color: green[600] }}>
        Admin
      </Button>
      <Button onClick={handleApprover2} autoFocus sx={{ fontSize: 17, color: green[600] }}>
        Approver 2
      </Button>

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

export default CreateAccount;
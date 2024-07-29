import React, { useState } from 'react';
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Formik } from "formik";
import axios from 'axios';
import * as yup from "yup";
import { toast } from 'react-toastify';
import Header from "../components/ui/Header";
import { green, red } from '@mui/material/colors';
import APIManager from '../APIManager/APIManager'

const DeleteProfile = () => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [formValues, setFormValues] = useState({ email: "" });

  const handleDeleteSubmit = async (setFieldValue) => {
    try {
      const response = 
      APIManager.deleteProfile({email: formValues.email,})
      setOpenConfirmDialog(false);
      setFormValues({ email: "" });
      setFieldValue("email", "");
      toast.success("Account deleted successfully!");
    } catch (error) {
      toast.error("Error deleting account. Please try again.");
      console.error("Error deleting account:", error);
    }
    setOpenConfirmDialog(false);
  };

  const handleFormSubmit = async (values) => {
    setFormValues(values);
    try {
      const response = await axios.post(`http://localhost:3000/checkEmail`, {
        email: values.email,
      });

      if (response.status === 200) {
        setOpenConfirmDialog(true);
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

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  return (
    <Box m="20px">
      <Header title="Delete Account" subtitle="Enter the email address of the account you want to delete" />
      <Formik
        initialValues={{ email: "" }}
        validationSchema={yup.object().shape({
          email: yup.string().email("Invalid email").required("Required"),
        })}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
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
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Delete Account
              </Button>
            </Box>
            <Dialog
              open={openConfirmDialog}
              onClose={handleCloseConfirmDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title" sx={{ fontSize: 20 }}>
                {"Delete Account?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description" sx={{ fontSize: 17, color: green[1000] }}>
                  Once deleted, you cannot undo your action! <br />Please confirm your action.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseConfirmDialog} sx={{ fontSize: 17, color: red[600] }}>Cancel</Button>
                <Button onClick={() => handleDeleteSubmit(setFieldValue)} autoFocus sx={{ fontSize: 17, color: green[600] }}>
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default DeleteProfile;

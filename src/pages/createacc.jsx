import React from 'react';
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import axios from 'axios';
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import MultiSelectDropdown from "../components/MultiSelectDropdownRoles";
import CustomTextNumberDropdown from "../components/BUDropdown";
import { toast } from 'react-toastify';
const CreateAccount = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const submitData = async (values,resetForm) => {

    try {
      const response = await axios.post(`http://localhost:3000/createAccount`, {
        email:values.email,
        password:values.password,
        bus:values.bus,
        roles:values.roles
      });
      toast.success("Account created successfully");
      resetForm(); 
      return;
    } catch (error) {
      toast.error("An account with this Email-Id already exists!");
      console.error("Error fetching data:", error);
    }
    
  };
  const handleFormSubmit = (values ,{ resetForm }) => {
    submitData(values,resetForm)
  };



  return (
    <Box m="20px">
      <Header title="Account Registration" subtitle="Please fill in the details below to create a new account" />

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
            <MultiSelectDropdown name="roles" />

            <CustomTextNumberDropdown name="bus"/>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" >
                Create New Account
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};



const checkoutSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
  roles: yup.array().min(1, 'At least one role is required').required("Required"),
  bus: yup.array().min(1, 'At least one BU is required').required("Required")
});
const initialValues = {

  email: "",
  password: "",
  roles: [],
  bus:[]

};

export default CreateAccount;
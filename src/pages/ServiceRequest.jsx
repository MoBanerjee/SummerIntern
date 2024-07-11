import React from 'react';
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import axios from 'axios';
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import CustomTextNumberDropdown from "../components/BUDropdown";
import { toast } from 'react-toastify';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const ServiceReq = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const userinfo = JSON.parse(localStorage.getItem("user"))|| [];
  const submitData = async (values, resetForm) => {
    try {
        console.log(values.month)
      const response = await axios.post(`http://localhost:3000/raiseTicket`, {
        reason: values.reason,
        month: values.month+1, 
        bus: values.bus,
        year: values.year,
        doer: userinfo[0].email
      });
      toast.success("Ticket raised successfully");
      resetForm();
      return;
    } catch (error) {
      toast.error("This form has not been submitted yet!");
      console.error("Error fetching data:", error);
    }
  };

  const handleFormSubmit = (values, { resetForm }) => {
    submitData(values, resetForm);
  };

  return (
    <Box m="20px">
      <Header title="Service Request" subtitle="Please fill in the details below to raise a ticket." />

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
          setFieldValue,
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
              <CustomTextNumberDropdown name="bus" mul={false} filter={userinfo[0].bus} />
              <TextField
                select
                fullWidth
                variant="filled"
                label="Year"
                value={values.year}
                onChange={handleChange}
                name="year"
                error={!!touched.year && !!errors.year}
                helperText={touched.year && errors.year}
                sx={{ gridColumn: "span 2" }}
              >
                {Array.from({ length: new Date().getFullYear() - 2022 }, (_, index) => (
                  <MenuItem key={index} value={2023 + index}>
                    {2023 + index}
                  </MenuItem>
                ))}
              </TextField>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  views={['month']}
                  label="Month"
                  minDate={new Date(2023, 0)}
                  maxDate={new Date(new Date().getFullYear(), new Date().getMonth()-1)}
                  value={new Date(values.year, values.month)}
                  onChange={(newValue) => {
                    setFieldValue("month", newValue.getMonth());
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      variant="filled"
                      sx={{ gridColumn: "span 2" }}
                      error={!!touched.month && !!errors.month}
                      helperText={touched.month && errors.month}
                    />
                  )}
                />
              </LocalizationProvider>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Reason"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.reason}
                name="reason"
                error={!!touched.reason && !!errors.reason}
                helperText={touched.reason && errors.reason}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Raise Ticket
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  reason: yup.string().required("Required"),
  bus: yup.array().min(1, "Please select the associated BU").required("Required"),
  month: yup.number().required("Required").min(0, "Month must be between 0 and 11").max(11, "Month must be between 0 and 11"),
  year: yup.number().required("Required").min(2023, "Year must be 2023 or later").max(new Date().getFullYear(), "Year must be the current year or earlier"),
});

const initialValues = {
  reason: "",
  bus: [],
  month: new Date().getMonth()-1,
  year: new Date().getFullYear(),
};

export default ServiceReq;

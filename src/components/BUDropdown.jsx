import React from 'react';
import { useField, useFormikContext } from 'formik';
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput } from '@mui/material';

function CustomTextNumberDropdown({ name ,mul=true, filter="all"}) {
  const { setFieldValue, values } = useFormikContext();
  const [field, meta] = useField(name);
  const currentError = meta.touched && meta.error;

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFieldValue(name, typeof value === 'string' ? value.split(',') : value);
  };
 let numberOptions = [
    { value: 'B1', text: "SNE" },
    { value: 'B2', text: "SOGA" },
    { value: 'B3', text: "SPMI" },
    { value: 'B4', text: "SSSI" },
    { value: 'B5', text: "SNHI" },
    { value: 'B6', text: "SNS" },
    { value: 'B7', text: "SFB" },
    { value: 'B8', text: "SSMB" },
    { value: 'B9', text: "SAM" },
    { value: 'B10', text: "TBY" },
    { value: 'B11', text: "AY" },
    { value: 'B12', text: "PY" },
    { value: 'B13', text: "SMS" },
    { value: 'B14', text: "PTS" },
    { value: 'B15', text: "PTK" },
    { value: 'B16', text: "EJA" }
  ];
const filterBU=(filter)=>{
  let temp=[]
  numberOptions.map((ele)=>{
    if(filter.includes(ele.value))
    temp.push(ele)
  })
  return temp;
}
if (filter!="all"){
  numberOptions=filterBU(filter);
}
  return (
    <FormControl fullWidth error={!!currentError}>
      <InputLabel id={`${name}-label`}>Select BUs</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        multiple={mul}
        {...field}
        value={values[name]}
        onChange={handleChange}
        input={<OutlinedInput label="Select Numbers" />}
        renderValue={(selected) => selected.map(val => numberOptions.find(option => option.value === val).text).join(', ')}
        sx={{ gridColumn: "span 4" }}
      >
        {numberOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
      {currentError && <p style={{ color: 'red' }}>{meta.error}</p>}
    </FormControl>
  );
}

export default CustomTextNumberDropdown;

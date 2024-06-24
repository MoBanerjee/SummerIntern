import React from 'react';
import { useField, useFormikContext } from 'formik';
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput } from '@mui/material';

function MultiSelectDropdown({ name }) {
  const { setFieldValue, values } = useFormikContext();
  const [field, meta] = useField(name);
  const currentError = meta.touched && meta.error;

  const handleChange = (event) => {
    const {
      target: { value: newValue },
    } = event;

    
    const selected = new Set(values[name]);
    const newSelection = new Set(newValue);

    
    const added = Array.from(newSelection).filter(x => !selected.has(x))[0];

    if (added) {
      switch (added) {
        case 'User':
        case 'Approver 1':
          
          setFieldValue(name, [added]);
          break;
        case 'Admin':
        case 'Approver 2':
          
          if (selected.has('Admin') || selected.has('Approver 2')) {
            
            setFieldValue(name, Array.from(newSelection));
          } else {
            
            setFieldValue(name, [added]);
          }
          break;
        default:
          break;
      }
    } else {
      
      setFieldValue(name, Array.from(newSelection));
    }
  };

  return (
    <FormControl fullWidth error={!!currentError}>
      <InputLabel id={`${name}-label`}>Select Role</InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        multiple
        {...field}
        value={values[name]}
        onChange={handleChange}
        input={<OutlinedInput label="User Roles" />}
        renderValue={(selected) => selected.join(', ')}
        sx={{ gridColumn: "span 10" }}
      >
        {['User', 'Approver 1', 'Approver 2', 'Admin'].map(role => (
          <MenuItem key={role} value={role}>
            {role}
          </MenuItem>
        ))}
      </Select>
      {currentError && <p style={{ color: 'red' }}>{meta.error}</p>}
    </FormControl>
  );
}

export default MultiSelectDropdown;



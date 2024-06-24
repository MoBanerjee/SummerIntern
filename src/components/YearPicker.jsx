import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const YearPicker = ({ minYear = 2023, maxYear = 2035, onChange ,editable}) => {
  const current=new Date().getFullYear();
  const currentM=new Date().getMonth();
  let start=currentM==0?new Date().getFullYear()-1: new Date().getFullYear();
  const [year, setYear] = useState(JSON.parse(localStorage.getItem('ym'))===null?start:JSON.parse(localStorage.getItem('ym')).slice(0, 4));

  const handleChange = (event) => {
    setYear(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="year-picker-label">Year</InputLabel>
      <Select
        labelId="year-picker-label"
        id="year-picker"
        value={year}
        label="Year"
        onChange={handleChange}
      >
        {[...Array(maxYear - minYear + 1).keys()].map(offset => {
          const year = maxYear - offset;
          return (
            <MenuItem key={year} value={year}  disabled={editable?(year<=current-2 || year>current ||  !(year==current-1 && (currentM==0 || currentM==1)) ) && (!(currentM!=0  && year==current)):(currentM==0?year>current-1:year>current)}>{year}</MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default YearPicker;

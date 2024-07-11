import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import YearPicker from '../../components/YearPicker';
import { useNavigate } from 'react-router-dom';
import DataGrid from '../../components/DataGrid';
import axios from 'axios';

function FormTemplate() {
  const navigate = useNavigate();
  let currentM=new Date().getMonth();
  let start=currentM==0?new Date().getFullYear()-1: new Date().getFullYear();
  const [year, setYear] = useState(JSON.parse(localStorage.getItem('ym'))===null?start:JSON.parse(localStorage.getItem('ym')).slice(0, 4));
  
  const [data, setData] = useState([]);
  function replaceMinusOneWithNA(obj) {
    for (let key in obj) {
        if (obj[key] === -1) {
            obj[key] = 'N/A';
        }
    }
}
function clearStorage(){
  localStorage.setItem('fid',null);
  localStorage.setItem('manhours',null);

  localStorage.setItem('ym',null);
  localStorage.setItem('gri1',null);
  localStorage.setItem('gri2',null);
  localStorage.setItem('gri3',null);
  localStorage.setItem('gri5',null);
  localStorage.setItem('gri6',null);

}
useEffect(() => {
    
    
    

  clearStorage();
}, []);
  const openform= async(m)=>{
    if(m%10===m){
    m=m.toString();
    localStorage.setItem('ym', JSON.stringify(year+'0'+m));}
    else{
      m=m.toString();
      localStorage.setItem('ym', JSON.stringify(year+m));
    }
    try {
      
      const results = await axios.post(`http://localhost:3000/getFormData`, {
        ymonth:JSON.parse(localStorage.getItem(
          "ym"
          )),
        bu:JSON.parse(localStorage.getItem(
          "currentBu"
          )),
          doer:JSON.parse(localStorage.getItem("user"))[0].email,
          category:"editing"
      });
      if(results.data.rows.length>0){
        let obj=results.data.rows[0].manhours;
        if(obj==-1)obj='N/A';
      localStorage.setItem('fid', JSON.stringify(results.data.rows[0].fid));
      localStorage.setItem('manhours', JSON.stringify(obj));}
      else{const results = await axios.post(`http://localhost:3000/createnewform`, {
        ymonth:JSON.parse(localStorage.getItem(
          "ym"
          )),
        bu:JSON.parse(localStorage.getItem(
          "currentBu"
          )),
          doer:JSON.parse(localStorage.getItem("user"))[0].email
      });

      localStorage.setItem('fid', JSON.stringify(results.data[1].rows[0].fid));
      localStorage.setItem('manhours', JSON.stringify(results.data[1].rows[0].manhours));
      }


      
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    try {
      const f=JSON.parse(localStorage.getItem(
        "fid"
        ));
        let results=""
      for(let i=1;i<7;i++){
        if(i===4)continue;
       results = await axios.post(`http://localhost:3000/getgri${i}`, {
        fid:f,

      });
      let obj = results.data.rows[0];
replaceMinusOneWithNA(obj);
      localStorage.setItem('gri'+i, JSON.stringify(obj));
      


      
    }} catch (error) {
      console.error("Error fetching data:", error);
    }
    try {
      const f=JSON.parse(localStorage.getItem(
        "fid"
        ));
        let results=""
      for(let i=1;i<7;i++){
        if(i===4)continue;
       results = await axios.post(`http://localhost:3000/getgri${i}`, {
        fid:f-1,

      });
      let obj = results.data.rows[0];
replaceMinusOneWithNA(obj);
      localStorage.setItem('grip'+i, JSON.stringify(obj));//flux analysis for not submitted forms?
      


      
    }} catch (error) {
      console.error("Error fetching data:", error);
    }
    navigate("/gri");

  }
  const fetchData = async () => {

    try {
      
      const statuses = await axios.post(`http://localhost:3000/getMonthwiseData`, {
        year:year.toString(),
        bu:JSON.parse(localStorage.getItem(
          "currentBu"
          ))
      });
      
      const statusarray = statuses.data;
      let response=[];
      
      const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
      for (let i = 0; i < 12; i++) {
        console.log(currentM);
        if(currentM>1){
          if(i<currentM-2 || i>=currentM)continue;
        }
        else{
          if(currentM==0){
            if(i!=10 && i!=11){
              
              continue;}

          }
          if(currentM==1){
            if(i!=11 && i!=0)continue;
  
            if(i==11 && year==new Date().getFullYear())continue;
            if(i==0 && year==new Date().getFullYear()-1)continue;
          }
        }

        if(statusarray[i]==='Yet to Start' ){response=response.concat([{month: months[i], status: 'Yet to Start', openform: openform, remarks: '' ,mth:i+1}])}
        else if(statusarray[i]==='saved'){response=response.concat([{month: months[i], status: 'Draft', openform: openform, remarks: '' ,mth:i+1}])}
        else {response=response.concat([{month: months[i], status: 'Submitted', formLink: '', remarks: '' }])}
      }
      
      setData(response);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    
  };
  useEffect(() => {
    
    
    

    fetchData();
  }, [localStorage.getItem(
    "currentBu"
    )]);

  useEffect(() => {
    
    
    

    fetchData();
  }, [year]);

  return (
    <Container maxWidth="md">
      <h1>Data Input for Year: {year}</h1>
      <div>
      <YearPicker onChange={setYear} minYear={2023} maxYear={2035} editable={true}/>
      </div>
      <br/>
      <DataGrid data={data} />
    </Container>
  );
}

export default FormTemplate;

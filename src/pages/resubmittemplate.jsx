import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import YearPicker from '../components/YearPicker';
import { useNavigate } from 'react-router-dom';
import DataGrid from '../components/DataGrid';
import axios from 'axios';

function ResubFormTemplate() {
  const navigate = useNavigate();
  let currentM=new Date().getMonth();
  let start=currentM==0?new Date().getFullYear()-1: new Date().getFullYear();
  const [year, setYear] = useState(JSON.parse(localStorage.getItem('ym'))===null?start:JSON.parse(localStorage.getItem('ym')).slice(0, 4));
  const userinfo = JSON.parse(localStorage.getItem("user"))|| [];
  const role = userinfo[0].role 
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
          category:"resubmitting"
      });
 
        let obj=results.data.rows[0].manhours;
        if(obj==-1)obj='N/A';
      localStorage.setItem('fid', JSON.stringify(results.data.rows[0].fid));
      localStorage.setItem('manhours', JSON.stringify(obj));
      if(results.data.rows[0].status==="dl1" )
      localStorage.setItem('state', JSON.stringify("Denied by Level 1"));
      else if( results.data.rows[0].status==="dl2")
      localStorage.setItem('state', JSON.stringify("Denied by Level 2"));


      
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
      
  const rem = await axios.post(`http://localhost:3000/getRemarks`, {
            fid:f,
    
          });
  localStorage.setItem('remark', JSON.stringify(rem.data.rows[0].remark));
      
    }} catch (error) {
      console.error("Error fetching data:", error);
    }

    navigate("/resubmit");

  }
  const fetchData = async () => {

    try {
  
     
      const results = await axios.post(`http://localhost:3000/getMonthwiseResubData`, {
        year:year.toString(),
        bu:JSON.parse(localStorage.getItem(
          "currentBu"
          ))
        
      });
      console.log(results.data);

      let response=[];
      
      const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
     
          results.data.forEach(row => {
    let monthIndex = parseInt(row.ym.slice(-2)) - 1; 
        

let stat=""
if(row.status='dl1')stat='Denied by Level 1';
else stat='Denied by Level 2';
        response=response.concat([{month: months[monthIndex], status: stat, openform: openform, remarks: '' ,mth:monthIndex+1}])
        
       
      })
      
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
      <h1>Submitted Forms for Year: {year}</h1>
      <div>
      <YearPicker onChange={setYear} minYear={2023} maxYear={2035} editable={false}/>
      </div>
      <br/>
      <DataGrid data={data} />
    </Container>
  );
}

export default ResubFormTemplate;

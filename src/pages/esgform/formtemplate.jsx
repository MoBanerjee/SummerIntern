import React, { useState, useEffect ,useContext} from 'react';
import { Container } from '@mui/material';
import YearPicker from '../../components/selections/YearPicker';
import { useNavigate } from 'react-router-dom';
import DataGrid from '../../components/esgform/DataGrid';
import fidContext from '../../context/FormIDContext'
import ManhoursContext from '../../context/ManhoursContext'
import UserContext from '../../context/UserContext'
import YMContext from '../../context/YMContext'
import Gri1Context from '../../context/Gri1Context'
import Gri2Context from '../../context/Gri2Context'
import CurrentBUContext from '../../context/CurrentBUContext'
import Gri3Context from '../../context/Gri3Context'
import Gri5Context from '../../context/Gri5Context'
import Gri6Context from '../../context/Gri6Context'
import Grip1Context from '../../context/Grip1Context'
import Grip2Context from '../../context/Grip2Context'
import Grip3Context from '../../context/Grip3Context'
import Grip5Context from '../../context/Grip5Context'
import Grip6Context from '../../context/Grip6Context'

import APIManager from '../../APIManager/APIManager'

function FormTemplate() {
  const {fid, setfid}=useContext(fidContext);
const {manhours,setmanhours}=useContext(ManhoursContext);
const {ym,setym}=useState(YMContext)
const {user,setuser}=useContext(UserContext);
const {gri1,setgri1}=useContext(Gri1Context);
const {gri2,setgri2}=useContext(Gri2Context);
const {gri3,setgri3}=useContext(Gri3Context);
const {gri5,setgri5}=useContext(Gri5Context);
const {gri6,setgri6}=useContext(Gri6Context);
const {grip1,setgrip1}=useContext(Grip1Context);
const {grip2,setgrip2}=useContext(Grip2Context);
const {currentBu,setcurrentBu}=useContext(CurrentBUContext);
const {grip3,setgrip3}=useContext(Grip3Context);
const {grip5,setgrip5}=useContext(Grip5Context);
const {grip6,setgrip6}=useContext(Grip6Context);
  const navigate = useNavigate();
  let currentM=new Date().getMonth();
  let start=currentM==0?new Date().getFullYear()-1: new Date().getFullYear();
  const [year, setYear] = useState(ym===null?start:ym.slice(0, 4));
  
  const [data, setData] = useState([]);
  function replaceMinusOneWithNA(obj) {
    for (let key in obj) {
        if (obj[key] === -1) {
            obj[key] = 'N/A';
        }
    }
}
function clearStorage(){
  setfid(null);
  setmanhours(null);
  setym(null)
  setgri1(null);
  setgri2(null);
  setgri3(null);
  setgri5(null);
  setgri6(null);


}
useEffect(() => {
    
    
    

  clearStorage();
}, []);
  const openform= async(m)=>{
    if(m%10===m){
    m=m.toString();
    setym(year+'0'+m)}
    else{
      m=m.toString();
      setym(year+m)
    }
    try {
      
      const results = APIManager.getFormData({
        ymonth:ym,
        bu:currentBu,
          doer:user[0].email,
          category:"editing"
      })
      if(results.data.rows.length>0){
        let obj=results.data.rows[0].manhours;
        if(obj==-1)obj='N/A';
      setfid(results.data.rows[0].fid);
      setmanhours(obj);}
      else{const results = APIManager.createnewform(
        {
          ymonth:ym,
          bu:currentBu,
            doer:user[0].email
        }
      )

      setfid(results.data[1].rows[0].fid);
      setmanhours(results.data[1].rows[0].manhours);
      }


      
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    try {
      const f=fid;
        let results=""
      for(let i=1;i<7;i++){
        if(i===4)continue;
        
       results = 
      APIManager[`getgri${i}`]({
        fid:f,
      })
      let obj = results.data.rows[0];
replaceMinusOneWithNA(obj);
switch(i){
  case 1: setgri1(obj);
  break;
  case 2:setgri2(obj);
  break;
  case 3: setgri3(obj);
  break;
  case 5:setgri5(obj);
  break;
  case 6:setgri6(obj);
  break;
}
      


      
    }} catch (error) {
      console.error("Error fetching data:", error);
    }
    try {
      const f=fid;
        let results=""
      for(let i=1;i<7;i++){
        if(i===4)continue;
       results =       APIManager[`getgri${i}`]({
        fid:f-1,
      })
      let obj = results.data.rows[0];
replaceMinusOneWithNA(obj);
switch(i){
  case 1: setgrip1(obj);
  break;
  case 2:setgrip2(obj);
  break;
  case 3: setgrip3(obj);
  break;
  case 5:setgrip5(obj);
  break;
  case 6:setgrip6(obj);
  break;
}//flux analysis for not submitted forms?
      


      
    }} catch (error) {
      console.error("Error fetching data:", error);
    }
    navigate("/gri");

  }
  const fetchData = async () => {

    try {
      
      const statuses = APIManager.getMonthwiseData({
        year:year.toString(),
        bu:currentBu
      })
      
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
  }, [currentBu]);

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

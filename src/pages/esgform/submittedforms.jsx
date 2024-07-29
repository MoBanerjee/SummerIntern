import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import YearPicker from '../../components/selections/YearPicker';
import { useNavigate } from 'react-router-dom';
import DataGrid from '../../components/esgform/DataGrid';
import axios from 'axios';
import fidContext from '../../context/FormIDContext'
import ManhoursContext from '../../context/ManhoursContext'
import UserContext from '../../context/UserContext'
import YMContext from '../../context/YMContext'
import CurrentBUContext from '../../context/CurrentBUContext'
import Gri1Context from '../../context/Gri1Context'
import Gri2Context from '../../context/Gri2Context'
import Gri3Context from '../../context/Gri3Context'
import Gri5Context from '../../context/Gri5Context'
import Gri6Context from '../../context/Gri6Context'
import APIManager from '../../APIManager/APIManager'

const {fid, setfid}=useContext(fidContext);
const {manhours,setmanhours}=useContext(ManhoursContext);

const {currentBu,setcurrentBu}=useContext(CurrentBUContext);

const {ym,setym}=useState(YMContext)
const {user,setuser}=useContext(UserContext);
const {gri1,setgri1}=useContext(Gri1Context);
const {gri2,setgri2}=useContext(Gri2Context);
const {gri3,setgri3}=useContext(Gri3Context);
const {gri5,setgri5}=useContext(Gri5Context);
const {gri6,setgri6}=useContext(Gri6Context);

function SubFormTemplate() {
  const navigate = useNavigate();
  let currentM=new Date().getMonth();
  let start=currentM==0?new Date().getFullYear()-1: new Date().getFullYear();
  const [year, setYear] = useState(ym===null?start:ym.slice(0, 4));
  const userinfo = user|| [];
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
  setym(year+'0'+m)
  }
    else{
      m=m.toString();
      setym(year+m)
    }
    try {
      
      const results = 
 APIManager.getFormData({
  ymonth:ym,
  bu:currentBu,
    doer:user[0].email,
    category:"grading"
 })
        let obj=results.data.rows[0].manhours;
        if(obj==-1)obj='N/A';
      

      setfid(results.data.rows[0].fid)
      setmanhours(obj)



      
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    try {
      const f=fid
        let results=""
      for(let i=1;i<7;i++){
        if(i===4)continue;
       results = await axios.post(`http://localhost:3000/getgri${i}`, {
        fid:f,

      });
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
    navigate("/ad");

  }
  const fetchData = async () => {

    try {
        let t="submitted"
        if(role==="Approver 2")t="al1"
     
      const results = 
      APIManager.getMonthwiseSubData({
        year:year.toString(),
        bu:currentBu,
        type:t
      })
      console.log(results.data);

      let response=[];
      
      const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
     
          results.data.forEach(row => {
    let monthIndex = parseInt(row.ym.slice(-2)) - 1; 
        


        response=response.concat([{month: months[monthIndex], status: 'Yet to be Approved', openform: openform, remarks: '' ,mth:monthIndex+1}])
        
       
      })
      
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
      <h1>Submitted Forms for Year: {year}</h1>
      <div>
      <YearPicker onChange={setYear} minYear={2023} maxYear={2035} editable={false}/>
      </div>
      <br/>
      <DataGrid data={data} />
    </Container>
  );
}

export default SubFormTemplate;

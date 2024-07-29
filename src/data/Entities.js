import ManhoursContext from '../context/ManhoursContext'
import Gri1Context from '../context/Gri1Context'
import Gri2Context from '../context/Gri2Context'
import Gri3Context from '../context/Gri3Context'
import Gri5Context from '../context/Gri5Context'
import Gri6Context from '../context/Gri6Context'

import {useContext} from 'react';








function Manhour(){
  const {manhours,setmanhours}=useContext(ManhoursContext);
  return manhours
}
function Gri1(){
  const {gri1,setgri1}=useContext(Gri1Context);
  return gri1
}
function Gri2(){
  const {gri1,setgri1}=useContext(Gri1Context);
  return gri1
}
function Gri3(){
  const {gri3,setgri3}=useContext(Gri3Context);
  return gri1
}
function Gri5(){
  const {gri5,setgri5}=useContext(Gri5Context);
  return gri1
}

function Gri6(){
  const {gri6,setgri6}=useContext(Gri6Context);
  return gri1
}

const gri1=Gri1()
const gri2=Gri2()
const gri3=Gri3()
const gri5=Gri5()
const gri6=Gri6()
const manhours=Manhour()



export const GRI301 = [
  {
    id: 1,
    entity: "Raw Steel",
    amount:gri1===null?(""):(gri1.rawsteel===null?"":gri1.rawsteel),
    unit: "Metric Tons",
  },
  {
    id: 2,
    entity: "Steel Pipes",
    amount:gri1===null?(""):gri1.steelpipes===null?"":gri1.steelpipes,
    unit: "Metric Tons",
  },
  {
    id: 3,
    entity: "Other Steel",
    amount:gri1===null?(""):gri1.othersteel===null?"":gri1.othersteel,
    unit: "Metric Tons",
  },
  {
    id: 4,
    entity: "Steel Shots",
    amount:gri1===null?(""):gri1.steelshots===null?"":gri1.steelshots,
    unit: "Metric Tons",
  },
  {
    id: 5,
    entity: "Steel Grit",
    amount:gri1===null?(""):gri1.steelgrit===null?"":gri1.steelgrit,
    unit: "Metric Tons",
  },
  {
    id: 6,
    entity: "Copper Grit",
    amount:gri1===null?(""):gri1.coppergrit===null?"":gri1.coppergrit,
    unit: "Metric Tons",
  },
  {
    id: 7,
    entity: "Welding Consumables",
    amount:gri1===null?(""):gri1.weldingconsumables===null?"":gri1.weldingconsumables,
    unit: "Metric Tons",
  },
  {
    id: 8,
    entity: "Paint",
    amount:gri1===null?(""):gri1.paint===null?"":gri1.paint,
    unit: "Litres",
  },
  {
    id: 9,
    entity: "Thinner",
    amount:gri1===null?(""):gri1.thinner===null?"":gri1.thinner,
    unit: "Litres",
  },

  
];

export const ManHrs = [
  {
    id: 1,
    entity: "Manhours",
    number:manhours===null?(""):manhours,
    unit: "Hours",
  },
  

  
];


export const GRI302 = [
  {
    id: 1,
    entity: "Diesel",
    amount:gri2===null?(""):gri2.diesel===null?"":gri2.diesel,
    unit: "Litres",
  },
  {
    id: 2,
    entity: "Bio-Diesel",
    amount:gri2===null?(""):gri2.biodiesel===null?"":gri2.biodiesel,
    unit: "Litres",
  },
  {
    id: 3,
    entity: "Gasoline",
    amount:gri2===null?(""):gri2.gasoline===null?"":gri2.gasoline,
    unit: "Litres",
  },
  {
    id: 4,
    entity: "Bio-Methane (Liquefied)",
    amount:gri2===null?(""):gri2.biomethaneliq===null?"":gri2.biomethaneliq,
    unit: "Kgs",
  },
  {
    id: 5,
    entity: "Bio-Methane (Compressed)",
    amount:gri2===null?(""):gri2.biomethanecomp===null?"":gri2.biomethanecomp,
    unit: "Kgs",
  },
  {
    id: 6,
    entity: "LPG",
    amount:gri2===null?(""):gri2.lpg===null?"":gri2.lpg,
    unit: "Kgs",
  },
  {
    id: 7,
    entity: "LNG",
    amount:gri2===null?(""):gri2.lng===null?"":gri2.lng,
    unit: "Cubic Meters",
  },
  {
    id: 8,
    entity: "CNG",
    amount:gri2===null?(""):gri2.cng===null?"":gri2.cng,
    unit: "Cubic Meters",
  },
  {
    id: 9,
    entity: "FLAMAL 26",
    amount:gri2===null?(""):gri2.flamal26===null?"":gri2.flamal26,
    unit: "Cubic Meters",
  },
  {
    id: 10,
    entity: "Acetylene",
    amount:gri2===null?(""):gri2.acetylene===null?"":gri2.acetylene,
    unit: "Cubic Meters",
  },
  {
    id: 11,
    entity: "Grid Electricity",
    amount:gri2===null?(""):gri2.gridelec===null?"":gri2.gridelec,
    unit: "kWh",
  },
  {
    id: 12,
    entity: "Renewable Energy - Solar",
    amount:gri2===null?(""):gri2.solarrenewableenergy===null?"":gri2.solarrenewableenergy,
    unit: "kWh",
  },
  {
    id: 13,
    entity: "Renewable Energy - with RECs",
    amount:gri2===null?(""):gri2.recsrenewableenergy===null?"":gri2.recsrenewableenergy,
    unit: "kWh",
  },

  
];

export const GRI303 = [
  {
    id: 1,
    entity: "Surface Water",
    amount:gri3===null?(""):gri3.surfacewater===null?"":gri3.surfacewater,
    unit: "Cubic Meter",
  },
  {
    id: 2,
    entity: "Ground Water",
    amount:gri3===null?(""):gri3.groundwater===null?"":gri3.groundwater,
    unit: "Cubic Meter",
  },
  {
    id: 3,
    entity: "Seawater",
    amount:"0",
    unit: "Cubic Meter",
  },
  {
    id: 4,
    entity: "Produced Water",
    amount:"0",
    unit: "Cubic Meter",
  },
  {
    id: 5,
    entity: "Third Party Water - Potable Water",
    amount:gri3===null?(""):gri3.thirdpartywaterpotable===null?"":gri3.thirdpartywaterpotable,
    unit: "Cubic Meter",
  },
  {
    id: 6,
    entity: "Third Party Water - NEWater / Desalinated Water",
    amount:gri3===null?(""):gri3.thirdpartywaternewaterordesal===null?"":gri3.thirdpartywaternewaterordesal,
    unit: "Cubic Meter",
  }
  
];

export const GRI305 = [
  {
    id: 1,
    entity: "CO2",
    amount:gri5===null?(""):gri5.co2===null?"":gri5.co2,
    unit: "Kgs",
  },
  {
    id: 2,
    entity: "R22",
    amount:gri5===null?(""):gri5.r22===null?"":gri5.r22,
    unit: "Kgs",
  },
  {
    id: 3,
    entity: "R32",
    amount:gri5===null?(""):gri5.r32===null?"":gri5.r32,
    unit: "Kgs",
  },
  {
    id: 4,
    entity: "R34A",
    amount:gri5===null?(""):gri5.r34a===null?"":gri5.r34a,
    unit: "Kgs",
  },
  {
    id: 5,
    entity: "R410A",
    amount:gri5===null?(""):gri5.r410a===null?"":gri5.r410a,
    unit: "Kgs",
  },
  {
    id: 6,
    entity: "R404A",
    amount:gri5===null?(""):gri5.r404a===null?"":gri5.r404a,
    unit: "Kgs",
  },
  {
    id: 7,
    entity: "R407C",
    amount:gri5===null?(""):gri5.r407c===null?"":gri5.r407c,
    unit: "Kgs",
  },
  {
    id: 8,
    entity: "R134A",
    amount:gri5===null?(""):gri5.r134a===null?"":gri5.r134a,
    unit: "Kgs",
  },
  {
    id: 9,
    entity: "R141B",
    amount:gri5===null?(""):gri5.r141b===null?"":gri5.r141b,
    unit: "Kgs",
  },
  {
    id: 10,
    entity: "R600",
    amount:gri5===null?(""):gri5.r600===null?"":gri5.r600,
    unit: "Kgs",
  }
  
];

export const GRI306 = [
  {
    id: 1,
    entity: "Hazardous Waste for Disposal",
    amount:gri6===null?(""):gri6.hazwastefrdisposal===null?"":gri6.hazwastefrdisposal,
    unit: "Metric Ton",
  },
  {
    id: 2,
    entity: "Non-Hazardous Waste for Incineration",
    amount:gri6===null?(""):gri6.nonhazwastefrincineration===null?"":gri6.nonhazwastefrincineration,
    unit: "Metric Ton",
  },
  {
    id: 3,
    entity: "Non-Hazardous Waste for Landfill",
    amount:gri6===null?(""):gri6.nonhazwastefrlandfill===null?"":gri6.nonhazwastefrlandfill,
    unit: "Metric Ton",
  },
  {
    id: 4,
    entity: "Non-Hazardous Waste for Offsite Recycling",
    amount:gri6===null?(""):gri6.nonhazwastefroffsiterecycling===null?"":gri6.nonhazwastefroffsiterecycling,
    unit: "Metric Ton",
  },
  
];
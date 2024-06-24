export const GRI301 = [
  {
    id: 1,
    entity: "Raw Steel",
    amount:JSON.parse(localStorage.getItem("gri1"))===null?(""):(JSON.parse(localStorage.getItem("gri1")).rawsteel===null?"":JSON.parse(localStorage.getItem("gri1")).rawsteel),
    unit: "Metric Tons",
  },
  {
    id: 2,
    entity: "Steel Pipes",
    amount:JSON.parse(localStorage.getItem("gri1"))===null?(""):JSON.parse(localStorage.getItem("gri1")).steelpipes===null?"":JSON.parse(localStorage.getItem("gri1")).steelpipes,
    unit: "Metric Tons",
  },
  {
    id: 3,
    entity: "Other Steel",
    amount:JSON.parse(localStorage.getItem("gri1"))===null?(""):JSON.parse(localStorage.getItem("gri1")).othersteel===null?"":JSON.parse(localStorage.getItem("gri1")).othersteel,
    unit: "Metric Tons",
  },
  {
    id: 4,
    entity: "Steel Shots",
    amount:JSON.parse(localStorage.getItem("gri1"))===null?(""):JSON.parse(localStorage.getItem("gri1")).steelshots===null?"":JSON.parse(localStorage.getItem("gri1")).steelshots,
    unit: "Metric Tons",
  },
  {
    id: 5,
    entity: "Steel Grit",
    amount:JSON.parse(localStorage.getItem("gri1"))===null?(""):JSON.parse(localStorage.getItem("gri1")).steelgrit===null?"":JSON.parse(localStorage.getItem("gri1")).steelgrit,
    unit: "Metric Tons",
  },
  {
    id: 6,
    entity: "Copper Grit",
    amount:JSON.parse(localStorage.getItem("gri1"))===null?(""):JSON.parse(localStorage.getItem("gri1")).coppergrit===null?"":JSON.parse(localStorage.getItem("gri1")).coppergrit,
    unit: "Metric Tons",
  },
  {
    id: 7,
    entity: "Welding Consumables",
    amount:JSON.parse(localStorage.getItem("gri1"))===null?(""):JSON.parse(localStorage.getItem("gri1")).weldingconsumables===null?"":JSON.parse(localStorage.getItem("gri1")).weldingconsumables,
    unit: "Metric Tons",
  },
  {
    id: 8,
    entity: "Paint",
    amount:JSON.parse(localStorage.getItem("gri1"))===null?(""):JSON.parse(localStorage.getItem("gri1")).paint===null?"":JSON.parse(localStorage.getItem("gri1")).paint,
    unit: "Litres",
  },
  {
    id: 9,
    entity: "Thinner",
    amount:JSON.parse(localStorage.getItem("gri1"))===null?(""):JSON.parse(localStorage.getItem("gri1")).thinner===null?"":JSON.parse(localStorage.getItem("gri1")).thinner,
    unit: "Litres",
  },

  
];

export const ManHrs = [
  {
    id: 1,
    entity: "Manhours",
    number:JSON.parse(localStorage.getItem("manhours"))===null?(""):JSON.parse(localStorage.getItem("manhours")),
    unit: "Hours",
  },
  

  
];


export const GRI302 = [
  {
    id: 1,
    entity: "Diesel",
    amount:JSON.parse(localStorage.getItem("gri2"))===null?(""):JSON.parse(localStorage.getItem("gri2")).diesel===null?"":JSON.parse(localStorage.getItem("gri2")).diesel,
    unit: "Litres",
  },
  {
    id: 2,
    entity: "Bio-Diesel",
    amount:JSON.parse(localStorage.getItem("gri2"))===null?(""):JSON.parse(localStorage.getItem("gri2")).biodiesel===null?"":JSON.parse(localStorage.getItem("gri2")).biodiesel,
    unit: "Litres",
  },
  {
    id: 3,
    entity: "Gasoline",
    amount:JSON.parse(localStorage.getItem("gri2"))===null?(""):JSON.parse(localStorage.getItem("gri2")).gasoline===null?"":JSON.parse(localStorage.getItem("gri2")).gasoline,
    unit: "Litres",
  },
  {
    id: 4,
    entity: "Bio-Methane (Liquefied)",
    amount:JSON.parse(localStorage.getItem("gri2"))===null?(""):JSON.parse(localStorage.getItem("gri2")).biomethaneliq===null?"":JSON.parse(localStorage.getItem("gri2")).biomethaneliq,
    unit: "Kgs",
  },
  {
    id: 5,
    entity: "Bio-Methane (Compressed)",
    amount:JSON.parse(localStorage.getItem("gri2"))===null?(""):JSON.parse(localStorage.getItem("gri2")).biomethanecomp===null?"":JSON.parse(localStorage.getItem("gri2")).biomethanecomp,
    unit: "Kgs",
  },
  {
    id: 6,
    entity: "LPG",
    amount:JSON.parse(localStorage.getItem("gri2"))===null?(""):JSON.parse(localStorage.getItem("gri2")).lpg===null?"":JSON.parse(localStorage.getItem("gri2")).lpg,
    unit: "Kgs",
  },
  {
    id: 7,
    entity: "LNG",
    amount:JSON.parse(localStorage.getItem("gri2"))===null?(""):JSON.parse(localStorage.getItem("gri2")).lng===null?"":JSON.parse(localStorage.getItem("gri2")).lng,
    unit: "Cubic Meters",
  },
  {
    id: 8,
    entity: "CNG",
    amount:JSON.parse(localStorage.getItem("gri2"))===null?(""):JSON.parse(localStorage.getItem("gri2")).cng===null?"":JSON.parse(localStorage.getItem("gri2")).cng,
    unit: "Cubic Meters",
  },
  {
    id: 9,
    entity: "FLAMAL 26",
    amount:JSON.parse(localStorage.getItem("gri2"))===null?(""):JSON.parse(localStorage.getItem("gri2")).flamal26===null?"":JSON.parse(localStorage.getItem("gri2")).flamal26,
    unit: "Cubic Meters",
  },
  {
    id: 10,
    entity: "Acetylene",
    amount:JSON.parse(localStorage.getItem("gri2"))===null?(""):JSON.parse(localStorage.getItem("gri2")).acetylene===null?"":JSON.parse(localStorage.getItem("gri2")).acetylene,
    unit: "Cubic Meters",
  },
  {
    id: 11,
    entity: "Grid Electricity",
    amount:JSON.parse(localStorage.getItem("gri2"))===null?(""):JSON.parse(localStorage.getItem("gri2")).gridelec===null?"":JSON.parse(localStorage.getItem("gri2")).gridelec,
    unit: "kWh",
  },
  {
    id: 12,
    entity: "Renewable Energy - Solar",
    amount:JSON.parse(localStorage.getItem("gri2"))===null?(""):JSON.parse(localStorage.getItem("gri2")).solarrenewableenergy===null?"":JSON.parse(localStorage.getItem("gri2")).solarrenewableenergy,
    unit: "kWh",
  },
  {
    id: 13,
    entity: "Renewable Energy - with RECs",
    amount:JSON.parse(localStorage.getItem("gri2"))===null?(""):JSON.parse(localStorage.getItem("gri2")).recsrenewableenergy===null?"":JSON.parse(localStorage.getItem("gri2")).recsrenewableenergy,
    unit: "kWh",
  },

  
];

export const GRI303 = [
  {
    id: 1,
    entity: "Surface Water",
    amount:JSON.parse(localStorage.getItem("gri3"))===null?(""):JSON.parse(localStorage.getItem("gri3")).surfacewater===null?"":JSON.parse(localStorage.getItem("gri3")).surfacewater,
    unit: "Cubic Meter",
  },
  {
    id: 2,
    entity: "Ground Water",
    amount:JSON.parse(localStorage.getItem("gri3"))===null?(""):JSON.parse(localStorage.getItem("gri3")).groundwater===null?"":JSON.parse(localStorage.getItem("gri3")).groundwater,
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
    amount:JSON.parse(localStorage.getItem("gri3"))===null?(""):JSON.parse(localStorage.getItem("gri3")).thirdpartywaterpotable===null?"":JSON.parse(localStorage.getItem("gri3")).thirdpartywaterpotable,
    unit: "Cubic Meter",
  },
  {
    id: 6,
    entity: "Third Party Water - NEWater / Desalinated Water",
    amount:JSON.parse(localStorage.getItem("gri3"))===null?(""):JSON.parse(localStorage.getItem("gri3")).thirdpartywaternewaterordesal===null?"":JSON.parse(localStorage.getItem("gri3")).thirdpartywaternewaterordesal,
    unit: "Cubic Meter",
  }
  
];

export const GRI305 = [
  {
    id: 1,
    entity: "CO2",
    amount:JSON.parse(localStorage.getItem("gri5"))===null?(""):JSON.parse(localStorage.getItem("gri5")).co2===null?"":JSON.parse(localStorage.getItem("gri5")).co2,
    unit: "Kgs",
  },
  {
    id: 2,
    entity: "R22",
    amount:JSON.parse(localStorage.getItem("gri5"))===null?(""):JSON.parse(localStorage.getItem("gri5")).r22===null?"":JSON.parse(localStorage.getItem("gri5")).r22,
    unit: "Kgs",
  },
  {
    id: 3,
    entity: "R32",
    amount:JSON.parse(localStorage.getItem("gri5"))===null?(""):JSON.parse(localStorage.getItem("gri5")).r32===null?"":JSON.parse(localStorage.getItem("gri5")).r32,
    unit: "Kgs",
  },
  {
    id: 4,
    entity: "R34A",
    amount:JSON.parse(localStorage.getItem("gri5"))===null?(""):JSON.parse(localStorage.getItem("gri5")).r34a===null?"":JSON.parse(localStorage.getItem("gri5")).r34a,
    unit: "Kgs",
  },
  {
    id: 5,
    entity: "R410A",
    amount:JSON.parse(localStorage.getItem("gri5"))===null?(""):JSON.parse(localStorage.getItem("gri5")).r410a===null?"":JSON.parse(localStorage.getItem("gri5")).r410a,
    unit: "Kgs",
  },
  {
    id: 6,
    entity: "R404A",
    amount:JSON.parse(localStorage.getItem("gri5"))===null?(""):JSON.parse(localStorage.getItem("gri5")).r404a===null?"":JSON.parse(localStorage.getItem("gri5")).r404a,
    unit: "Kgs",
  },
  {
    id: 7,
    entity: "R407C",
    amount:JSON.parse(localStorage.getItem("gri5"))===null?(""):JSON.parse(localStorage.getItem("gri5")).r407c===null?"":JSON.parse(localStorage.getItem("gri5")).r407c,
    unit: "Kgs",
  },
  {
    id: 8,
    entity: "R134A",
    amount:JSON.parse(localStorage.getItem("gri5"))===null?(""):JSON.parse(localStorage.getItem("gri5")).r134a===null?"":JSON.parse(localStorage.getItem("gri5")).r134a,
    unit: "Kgs",
  },
  {
    id: 9,
    entity: "R141B",
    amount:JSON.parse(localStorage.getItem("gri5"))===null?(""):JSON.parse(localStorage.getItem("gri5")).r141b===null?"":JSON.parse(localStorage.getItem("gri5")).r141b,
    unit: "Kgs",
  },
  {
    id: 10,
    entity: "R600",
    amount:JSON.parse(localStorage.getItem("gri5"))===null?(""):JSON.parse(localStorage.getItem("gri5")).r600===null?"":JSON.parse(localStorage.getItem("gri5")).r600,
    unit: "Kgs",
  }
  
];

export const GRI306 = [
  {
    id: 1,
    entity: "Hazardous Waste for Disposal",
    amount:JSON.parse(localStorage.getItem("gri6"))===null?(""):JSON.parse(localStorage.getItem("gri6")).hazwastefrdisposal===null?"":JSON.parse(localStorage.getItem("gri6")).hazwastefrdisposal,
    unit: "Metric Ton",
  },
  {
    id: 2,
    entity: "Non-Hazardous Waste for Incineration",
    amount:JSON.parse(localStorage.getItem("gri6"))===null?(""):JSON.parse(localStorage.getItem("gri6")).nonhazwastefrincineration===null?"":JSON.parse(localStorage.getItem("gri6")).nonhazwastefrincineration,
    unit: "Metric Ton",
  },
  {
    id: 3,
    entity: "Non-Hazardous Waste for Landfill",
    amount:JSON.parse(localStorage.getItem("gri6"))===null?(""):JSON.parse(localStorage.getItem("gri6")).nonhazwastefrlandfill===null?"":JSON.parse(localStorage.getItem("gri6")).nonhazwastefrlandfill,
    unit: "Metric Ton",
  },
  {
    id: 4,
    entity: "Non-Hazardous Waste for Offsite Recycling",
    amount:JSON.parse(localStorage.getItem("gri6"))===null?(""):JSON.parse(localStorage.getItem("gri6")).nonhazwastefroffsiterecycling===null?"":JSON.parse(localStorage.getItem("gri6")).nonhazwastefroffsiterecycling,
    unit: "Metric Ton",
  },
  
];
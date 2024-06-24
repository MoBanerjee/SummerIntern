import React from "react";
import * as d3 from "d3";
import "./heatmap.css";
import axios from 'axios';
import { FormControl, InputLabel, MenuItem, Select, Box } from '@mui/material';

const colors = {
  "Received by Level 2": "#2E8B57",
  "Denied": "#D32F2F",
  "Not Started": "#FFA07A",
  "Not Applicable": "#D3D3D3",
  "Approved by Level 1": "#1E90FF",
  "Ongoing": "#FFD700",
  "Submitted but yet to be approved by Level 1": "#9370DB"
};

const categories = [
  "Not Applicable",
  "Not Started",
  "Ongoing",
  "Submitted but yet to be approved by Level 1",
  "Approved by Level 1",
  "Received by Level 2",
  "Denied",
];
const buData = [
  { buid: 'B1', bu: 'SNE' },
  { buid: 'B2', bu: 'SOGA' },
  { buid: 'B3', bu: 'SPMI' },
  { buid: 'B4', bu: 'SSSI' },
  { buid: 'B5', bu: 'SNHI' },
  { buid: 'B6', bu: 'SNS' },
  { buid: 'B7', bu: 'SFB' },
  { buid: 'B8', bu: 'SSMB' },
  { buid: 'B9', bu: 'SAM' },
  { buid: 'B10', bu: 'TBY' },
  { buid: 'B11', bu: 'AY' },
  { buid: 'B12', bu: 'PY' },
  { buid: 'B13', bu: 'SMS' },
  { buid: 'B14', bu: 'PTS' },
  { buid: 'B15', bu: 'PTK' },
  { buid: 'B16', bu: 'EJA' },
];

const buDictionary = buData.reduce((dict, item) => {
  dict[item.buid] = item.bu;
  return dict;
}, {});

const getFormStatuses = async (year) => {
  try {
    const response = await axios.post(`http://localhost:3000/getFormStatus`, {
      year: year,
      
    });
    const statusArray = response.data;
    return statusArray;
  } catch (error) {
    console.error("Error: ", error);
  }
};

export default class Heatmap extends React.Component {
  state = {
    data: [],
    formStatuses: [],
    selectedYear: new Date().getFullYear(),
  };

  constructor() {
    super();
    this._chartRef = React.createRef();
  }

  async componentDidMount() {
    const formStatuses = await getFormStatuses(this.state.selectedYear);
    this.setState({ formStatuses }, () => this.generateDummyData());
  }

  handleYearChange = async (event) => {
    const selectedYear = event.target.value;
    const formStatuses = await getFormStatuses(selectedYear);
    this.setState({ selectedYear, formStatuses }, () => this.generateDummyData());
  };

  attachChart() {
    const { data } = this.state;

    const margin = { top: 60, right: 20, bottom: 120, left: 100 },
      size = 600 - margin.left - margin.right; 

    
    d3.select("#chart").select("svg").remove();

   
    const svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", size + margin.left + margin.right)
      .attr("height", size + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

   
    const myGroups = Array.from(new Set(data.map((d) => d.group)));
    const myVars = Array.from(new Set(data.map((d) => d.variable)));


    const x = d3
      .scaleBand()
      .domain(myVars)
      .range([0, size])
      .padding(0.05);

    svg
      .append("g")
      .style("font-size", 12)
      .attr("transform", "translate(0,0)")
      .call(d3.axisTop(x).tickSize(0))
      .select(".domain")
      .remove();

    const y = d3
      .scaleBand()
      .domain(myGroups)
      .range([0, size])
      .padding(0.05);

    svg
      .append("g")
      .style("font-size", 12)
      .call(d3.axisLeft(y).tickSize(0))
      .select(".domain")
      .remove();

    
    svg.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(y)
        .tickSize(-size)
        .tickFormat("")
      );

    svg.append("g")
      .attr("class", "grid")
      .call(d3.axisTop(x)
        .tickSize(size)
        .tickFormat("")
      );

    const tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

    svg
      .selectAll()
      .data(data, (d) => d.group + ":" + d.variable)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.variable))
      .attr("y", (d) => y(d.group))
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .style("fill", (d) => colors[d.value])
      .style("stroke-width", 1)
      .style("stroke", "black")
      .style("opacity", 0.8)
 


    const legend = svg
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(0, ${size + 40})`);


    const rowSize = Math.ceil(categories.length / 4);

    const row1 = legend.selectAll(".legend-item-row1")
      .data(categories.slice(0, rowSize))
      .enter()
      .append("g")
      .attr("class", "legend-item-row1")
      .attr("transform", (d, i) => `translate(${i * 150}, 0)`);

    row1.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", (d) => colors[d])
      .style("stroke", "black");

    row1.append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .style("font-size", "12px")
      .text((d) => d);

    const row2 = legend.selectAll(".legend-item-row2")
      .data(categories.slice(rowSize, rowSize * 2))
      .enter()
      .append("g")
      .attr("class", "legend-item-row2")
      .attr("transform", (d, i) => `translate(${i * 150}, 20)`);

    row2.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", (d) => colors[d])
      .style("stroke", "black");

    row2.append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .style("font-size", "12px")
      .text((d) => d);

    const row3 = legend.selectAll(".legend-item-row3")
      .data(categories.slice(rowSize * 2))
      .enter()
      .append("g")
      .attr("class", "legend-item-row3")
      .attr("transform", (d, i) => `translate(${i * 150}, 40)`);

    row3.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", (d) => colors[d])
      .style("stroke", "black");

    row3.append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .style("font-size", "12px")
      .text((d) => d);
  }

  generateDummyData() {
    const buses = [
      "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11", "B12", "B13", "B14", "B15", "B16"
    ];
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const mi = {
      "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5, "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11
    };
    const busNums = {
      "B1": 0, "B2": 1, "B3": 2, "B4": 3, "B5": 4, "B6": 5, "B7": 6, "B8": 7, "B9": 8, "B10": 9, "B11": 10, "B12": 11, "B13": 12, "B14": 13, "B15": 14, "B16": 15
    };

    const { formStatuses, selectedYear } = this.state;
    const data = [];

    buses.forEach((bus) => {
      const busNum = busNums[bus];
      months.forEach((month) => {
        const m = new Date().getMonth();
        const i = mi[month];
        const currentYear = new Date().getFullYear();
        let category =""
        if(selectedYear <currentYear) category="Not Started";
        else  category = "Not Applicable";
        if (i < m && formStatuses[busNum]) {
          category = formStatuses[busNum][i];
        }
        data.push({
          group: buDictionary[bus],
          variable: month,
          value: category
        });
      });
    });

    this.setState({ data }, () => this.attachChart());
  }

  render() {
    const { selectedYear } = this.state;
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2022 }, (_, i) => currentYear - i);

    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box ml={4}>
          <FormControl variant="outlined" sx={{width:"500px"}} fullWidth>
            <InputLabel id="year-select-label">Year</InputLabel>
            <Select
              labelId="year-select-label"
              id="year-select"
              value={selectedYear}
              onChange={this.handleYearChange}
              label="Year"
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <div id="chart" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
      </Box>
    );
  }
}

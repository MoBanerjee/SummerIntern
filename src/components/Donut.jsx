import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import { FormControl, InputLabel, MenuItem, Select, Box } from '@mui/material';
import axios from 'axios';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const colors = {
	"Received by Level 2": "#2E8B57",
	"Denied": "#D32F2F",
	"Not Started": "#FFA07A",
	"Not Applicable": "#D3D3D3",
	"Approved by Level 1": "#1E90FF",
	"Ongoing": "#FFD700",
	"Submitted but yet to be approved by Level 1": "#9370DB"
  };
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
  const getFormStats = async (year,bu) => {
	try {
	  const response = await axios.post(`http://localhost:3000/getFormStats`, {
		year: year,
		bu:bu
	  });
	  const statsArray = response.data;
	  return statsArray;
	} catch (error) {
	  console.error("Error: ", error);
	}
  };
class Donut extends Component {
  state = {
    selectedBU: 'B1',
	formStats: [],
    selectedYear: new Date().getFullYear(),
  };
  async componentDidMount() {
    const formStats = await getFormStats(this.state.selectedYear,this.state.selectedBU);
    this.setState({ formStats }, () => getFormStats(this.state.selectedYear,this.state.selectedBU));
  }
  handleBUChange = async(event) => {
    this.setState({ selectedBU: event.target.value });
	const selectedBU = event.target.value;
    const formStatsRes = await getFormStats(this.state.selectedYear,selectedBU);
    this.setState({ formStats:formStatsRes  });
  };

  handleYearChange = async(event) => {
	this.setState({ selectedYear: event.target.value });
    const selectedYear = event.target.value;
    const formStatsRes = await getFormStats(selectedYear,this.state.selectedBU);
    this.setState({ formStats:formStatsRes});
  };

  render() {
    const { selectedBU, selectedYear } = this.state;
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2022 }, (_, i) => currentYear -i);
    const bus = Array.from({ length: 16 }, (_, i) => `B${i + 1}`);

    const options = {
      animationEnabled: true,
      title: {
        text: `Submission Status of Forms in ${selectedYear}`,
		fontSize:23
      },
      subtitles: [{
        text:buDictionary[selectedBU],
        verticalAlign: "center",
        fontSize: 24,
        dockInsidePlotArea: true
      }],
      data: [{
        type: "doughnut",
        showInLegend: true,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###' form(s)'",
        dataPoints: [
			{ name: "Not Applicable", y: this.state.formStats[0], color: colors["Not Applicable"] },
			{ name: "Not Started", y: this.state.formStats[1], color: colors["Not Started"] },
			{ name: "Ongoing", y: this.state.formStats[2], color: colors["Ongoing"] },
			{ name: "Submitted but yet to be approved by Level 1", y: this.state.formStats[3], color: colors["Submitted but yet to be approved by Level 1"] },
			{ name: "Approved by Level 1", y: this.state.formStats[4], color: colors["Approved by Level 1"] },
			{ name: "Received by Level 2", y: this.state.formStats[5], color: colors["Received by Level 2"] },
			{ name: "Denied", y: this.state.formStats[6], color: colors["Denied"] }
		  ]
  
      }]
    };

    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box mr={10} ml={4}>
          <FormControl variant="outlined" sx={{width:"200px"}} fullWidth>
            <InputLabel id="bu-select-label">Select BU</InputLabel>
            <Select
              labelId="bu-select-label"
              id="bu-select"
              value={selectedBU}
              onChange={this.handleBUChange}
              label="Select BU"
            >
              {bus.map((bu) => (
                <MenuItem key={buDictionary[bu]} value={bu}>
                  {buDictionary[bu]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box mr={3}>
          <FormControl variant="outlined" sx={{width:"200px"}}fullWidth>
            <InputLabel id="year-select-label">Select Year</InputLabel>
            <Select
              labelId="year-select-label"
              id="year-select"
              value={selectedYear}
              onChange={this.handleYearChange}
              label="Select Year"
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <CanvasJSChart options={options} />
      </Box>
    );
  }
}

export default Donut;

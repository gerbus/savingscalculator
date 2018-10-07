import React, { Component } from 'react';
import ChartJs from 'chart.js';

class Chart extends Component {
  state = {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    chartData: {
      labels: ["one","two","three"],
      datasets: [{
        label: "Label1",
        data: [1,2,3],
        backgroundColor: "rgba(127,127,127,0.5)",
        yAxisID: "yAxis1",
      },
      {
        label: "Label2",
        data: [0,2,4],
        backgroundColor: "rgba(127,0,127,0.5)",
        yAxisID: "yAxis2",
      }]
    }
  };
  
  render() {

    
    return (
      <div id="canvasContainer">
        <canvas
          ref="chart"
          id="chart"
          width="100"
          height="70"
          responsive="true"></canvas>
      </div>
    )
  }
  attachChart = () => {
    if (this.chart) { 
      this.chart.destroy(); 
    }
    this.chart = new ChartJs(this.refs["chart"], {
      type: "line",
      data: this.state.chartData,
      options: {
        scales: { 
          yAxes: [
            { id: 'yAxis1',
              type: 'linear',
              position: 'left',
              ticks: {
                min: 0,
                max: 5,
                stepSize: 1,
              }
            },
            { id: 'yAxis2', 
              type: 'linear', 
              position: 'right',
              ticks: { 
                min: 0,
                max: 5,
                stepSize: 1, 
              }
            }
          ] 
        },        
      }
    });
  }
  componentDidMount() {
    this.attachChart();
  }
  componentDidUpdate() {
    this.attachChart();
  }
}

export default Chart;
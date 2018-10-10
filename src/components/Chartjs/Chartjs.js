import React, { Component } from 'react';
import ChartJs from 'chart.js';

class Chart extends Component {
  state = {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  };
  componentDidMount() {
    this.attachChart();
  }
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div id="canvasContainer">
        <canvas
          ref="chart"
          id="chart"
          responsive="true"></canvas>
      </div>
    )
  }
  attachChart = () => {
    if (this.chart) { 
      this.chart.destroy(); 
    }
    this.chart = new ChartJs(this.refs["chart"], {
      type: this.props.type,
      data: this.props.data,
      options: this.props.options,
    });
  }
  componentDidUpdate() {
    this.attachChart();
  }
}

export default Chart;
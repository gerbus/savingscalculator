import React, { Component } from 'react';
import ChartJs from 'chart.js';
import _ from 'lodash';

class Chart extends Component {
  /*state = {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  };*/
  componentDidMount() {
    this.attachChart();
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state);
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
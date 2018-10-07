import React, { Component } from 'react';
import * as math from 'mathjs';
import _ from 'lodash';
import Chart from './components/Chartjs';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends Component {
  state = {
    principal: '',
    rate: '',
    compoundings: 12,
    contributions: '',
    contributionsAmount: '',
    years: '',
    balance: '',
  };
  years = "{}";
  chartData = {
    labels: [],
    datasets: [{
      steppedLine: true,
      data: []
    }],      
  };
  chartOptions = {
    scales: { 
      yAxes: [{
        type: 'linear',
        position: 'left',
        ticks: {
          min: 0,
        }
      }] 
    },        
  };
  handleInput = (event) => {
    this.setState({
      [event.target.dataset.name]: event.target.value,
    });
  };
  handleCalculate = () => {
    const principal = math.round(parseFloat(this.state.principal),2);
    const rate = math.round(parseFloat(this.state.rate),6);
    const compoundings = parseInt(this.state.compoundings);
    const contributions = parseInt(this.state.contributions);
    const contributionsAmount = math.round(parseFloat(this.state.contributionsAmount),2);
    const { years } = this.state;
    let labels = [];
    let label = 0;
    let data = [];
    
    // Init
    let calcBalance = principal;
    labels.push(label);
    data.push(calcBalance);
    
    // Iterate
    const intervals = Math.min(compoundings, contributions) ? compoundings * contributions : Math.max(compoundings, contributions);
    for (let year = 1; year <= years; year++) {
      for (let interval = 1; interval <= intervals; interval++) {
        let doCompound = compoundings && interval % parseInt(intervals/compoundings) === 0;
        let doContribute = contributions && interval % parseInt(intervals/contributions) === 0;

        /*if (doCompound || doContribute) {
          console.log("interval");
          console.log("balance:",calcBalance);
        }*/
        if (doCompound) {
          // Do a compounding of interest
          calcBalance = math.round(calcBalance + parseFloat(calcBalance * rate),2);
          //console.log("compounding: *(1+",rate,") =>",calcBalance);          
        }
        if (doContribute) {
          // Do a contribution
          calcBalance += contributionsAmount;
          //console.log("contributing: +",contributionsAmount," =>",calcBalance);
        }
        if (doCompound || doContribute) {
          labels.push(++label);
          data.push(calcBalance);
        }
      }
    }
    
    this.chartData = _.merge(this.chartData, {
      labels: labels,
      datasets: [{
        data: data,
      }]
    });
    this.refs["chart"].forceUpdate();
    
    this.years = years;
    this.setState({
      balance: calcBalance,
    });
  };
  render() {
    const {
      handleInput,
      handleCalculate,
    } = this;
    const { 
      principal,
      rate,
      compoundings,
      contributions,
      contributionsAmount,
      years,
      balance,
      work,
    } = this.state;
      
    return (
      <div className="App container">
        <div className="row mt-3 mb-3">
          <div className="col-md-9 col-lg-6">
            <h1>Savings Calculator</h1>
            <h2>Calculate future savings based on compounding interest and/or regular contributions. Most online calculators don't support when contributions and interest compounding happen on different schedules, but this one does!</h2>
          </div>
        </div>
        
        <div className="row">
          <div className="col-lg-6">
            <div className="row form-group">
              <label className="col-form-label col-sm-8 col-md-6 col-lg-8">Initial Investment Amount (Principal)</label>
              <div className="col-sm-4 col-md-3 col-lg-4">
                <input 
                  type="number"
                  className="form-control"
                  autoFocus={true}
                  data-name="principal"
                  value={principal}
                  onChange={handleInput} />
              </div>
            </div>
            <div className="row form-group">
              <label className="col-form-label col-sm-8 col-md-6 col-lg-8">Annual Rate of Return (i.e. Interest Rate)</label>
              <div className="col-sm-4 col-md-3 col-lg-4">
                <input 
                  type="number"
                  className="form-control"
                  data-name="rate"
                  value={rate} 
                  onChange={handleInput} />
              </div>
            </div>
            <div className="row form-group">
              <label className="col-form-label col-sm-8 col-md-6 col-lg-8">
                Number of Compoundings per Year
                <small className="form-text text-muted">Usually compounded monthly (12)</small>
              </label>
              <div className="col-sm-4 col-md-3 col-lg-4">
                <input 
                  type="number"
                  className="form-control" 
                  data-name="compoundings"
                  value={compoundings} 
                  onChange={handleInput} />
                
              </div>
            </div>
            <div className="row form-group">
              <label className="col-form-label col-sm-8 col-md-6 col-lg-8">
                Number of <b>Contributions</b> per Year
                <small className="form-text text-muted">For contributions twice a month, use 24. <br/>For contributions every two weeks, use 26.</small>
              </label>
              <div className="col-sm-4 col-md-3 col-lg-4">
                <input 
                  type="number"
                  className="form-control" 
                  data-name="contributions"
                  value={contributions} 
                  onChange={handleInput} />
                
              </div>
            </div>
            <div className="row form-group">
              <label className="col-form-label col-sm-8 col-md-6 col-lg-8">Amount of Each Contribution</label>
              <div className="col-sm-4 col-md-3 col-lg-4">
                <input 
                  type="number"
                  className="form-control" 
                  data-name="contributionsAmount"
                  value={contributionsAmount} 
                  onChange={handleInput} />
              </div>
            </div>
            <div className="row form-group">
              <label className="col-form-label col-sm-8 col-md-6 col-lg-8">Number of Years to Calculate</label>
              <div className="col-sm-4 col-md-3 col-lg-4">
                <input 
                  type="number"
                  className="form-control"
                  data-name="years"
                  value={years} 
                  onChange={handleInput} />
              </div>
            </div>

            <div className="row form-group">
              <div className="col-md-9 col-lg-8">
                <input 
                  type="button" 
                  value="Calculate" 
                  className="btn btn-primary mb-4"
                  onClick={handleCalculate} />
              </div>
            </div>
          </div>
          
          <div className="offset-lg-1 col-lg-5">
            <div className="row form-group">
              <label className="col-form-label col-sm-8 col-md-6 col-lg-7">Balance after {this.years} years</label>
              <div className="col-sm-4 col-md-3 col-lg-5">
                <input 
                  type="number"
                  className="form-control"
                  data-name="balance"
                  value={balance}
                  disabled="disabled" />
              </div>
            </div>
            
            <div className="row form-group">
              <div className="col-md-9 col-lg-12">
                <Chart 
                  ref="chart"
                  type="line" 
                  data={this.chartData} 
                  options={this.chartOptions} />
              </div>
            </div>
          </div>
          
        </div>
        
                
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import * as math from 'mathjs';

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
    work: '',
  }

  handleInput = (event) => {
    this.setState({
      [event.target.dataset.name]: event.target.value,
    });
  }
  handleCalculate = () => {
    const principal = math.round(parseFloat(this.state.principal),2);
    const rate = math.round(parseFloat(this.state.rate),6);
    const compoundings = parseInt(this.state.compoundings);
    const contributions = parseInt(this.state.contributions);
    const contributionsAmount = math.round(parseFloat(this.state.contributionsAmount),2);
    const { years } = this.state;
    
    let calcBalance = principal;
    const intervals = Math.min(compoundings, contributions) ? compoundings * contributions : Math.max(compoundings, contributions);
    
    // Iterate
    for (let year = 1; year <= years; year++) {
      for (let interval = 1; interval <= intervals; interval++) {
        let doCompound = compoundings && interval % parseInt(intervals/compoundings) === 0;
        let doContribute = contributions && interval % parseInt(intervals/contributions) === 0;

        if (doCompound || doContribute) {
          console.log("interval");
          console.log("balance:",calcBalance);          
        }
        if (doCompound) {
          // Do a compounding of interest
          calcBalance = math.round(calcBalance + parseFloat(calcBalance * rate),2);
          console.log("compounding: *(1+",rate,") =>",calcBalance);          
        }
        if (doContribute) {
          // Do a contribution
          calcBalance += contributionsAmount;
          console.log("contributing: +",contributionsAmount," =>",calcBalance);
        }
      }
    }
    
    this.setState({
      balance: calcBalance
    })
  }
  
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
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5">
            <h1>Compound Interest and Different Frequeucy Contributions Calculator</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5">
            <div className="form-group">
              <div className="form-label">Initial Investment Amount (Principal)</div>
              <input 
                type="number"
                className="form-control"
                data-name="principal"
                value={principal}
                onChange={handleInput} />
            </div>
            <div className="form-group">
              <div className="form-label">Annual Rate of Return (i.e. Interest Rate)</div>
              <input 
                type="number"
                className="form-control"
                data-name="rate"
                value={rate} 
                onChange={handleInput} />
            </div>
            <div className="form-group">
              <div className="form-label">Number of Compoundings per Year</div>
              <input 
                type="number"
                className="form-control" 
                data-name="compoundings"
                value={compoundings} 
                onChange={handleInput} />
              <small className="form-text text-muted">Usually compounded monthly (12)</small>
            </div>
            <div className="form-group">
              <div className="form-label">Number of <b>Contributions</b> per Year</div>
              <input 
                type="number"
                className="form-control" 
                data-name="contributions"
                value={contributions} 
                onChange={handleInput} />
              <small
                className="form-text text-muted">For contributions twice a month, use 24. <br/>For contributions every two weeks, use 26.</small>
            </div>
            <div className="form-group">
              <div className="form-label">Amount of Each Contribution</div>
              <input 
                type="number"
                className="form-control" 
                data-name="contributionsAmount"
                value={contributionsAmount} 
                onChange={handleInput} />
            </div>
            <div className="form-group">
              <div className="form-label">Number of Years to Calculate</div>
              <input 
                type="number"
                className="form-control"
                data-name="years"
                value={years} 
                onChange={handleInput} />
            </div>

            <input 
              type="button" 
              value="Calculate" 
              className="btn btn-primary mb-4"
              onClick={handleCalculate} />
            
          </div>
          <div className="col-sm-9 col-md-5 col-lg-5">
            <div className="form-group">
              <div className="form-label">Balance after {years} years</div>
              <input 
                type="number"
                className="form-control"
                data-name="balance"
                value={balance}
                disabled="disabled" />
            </div>
            <textarea 
              className="form-control" 
              rows="18"
              value={work}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

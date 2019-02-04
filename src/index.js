import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function CalculatorButton (props) {
  return (
    <button className="button" value={props.value}>{props.displayText}</button>
  );
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      currentValue: 0,
    }
  }

  handleChange(e) {
    this.setState({
      currentValue: e.target.value
    });
  }

  render() {
    return (
      <div>
          <input
            value={this.state.currentValue}
            onChange={this.handleChange}
          />
          <CalculatorButton value="add" displayText="+"/>

          <CalculatorButton value="equals" displayText="="/>
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <Calculator />
  </div>,
  document.querySelector("#root")
);

const addFunction = (a, b) => a + b;
const subtractFunction = (a, b) => a - b;
const multiplyFunction = (a, b) => a * b;
const divideFunction = (a,b) => a / b;

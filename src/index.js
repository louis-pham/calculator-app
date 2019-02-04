import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function CalculatorButton(props) {
    return (
      <button
        className="button"
        value={props.value}
        onClick={props.onClick}>
        {props.displayText}
      </button>
    );
}

function CalculatorInput(props) {
    return (
      <input
        value={props.value}
        onChange={props.onChange}
      />
    );
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.clearEntry = this.clearEntry.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.state = {
      inputValue: 0,
      firstOperand: 0,
      secondOperand: 0,
      operator: null,
      inputChanged: true,
    }
  }

  handleClick(e) {
    /*
      if operator not yet selected:
        set first operand to current input
        set selected operator
        signal for new input
      otherwise:
        if there is new input:
          set second operand to current input
          do operation
          set current input to output
          set first operand to output

      if equals is pressed:
        if the input hasnt changed:
          do operation (no change in operator; input is the first operand -- second remains untouched)
        else:
          do operation; update second operand and current value
    */

    // check if input is valid
    const input = parseFloat(this.state.inputValue);
    if (!isNaN(input)) {
      if (!this.state.operator) {
        this.setState({
          firstOperand: input,
          secondOperand: input,
          operator: e.target.value,
          inputChanged: false,
        });
      } else {
        let newValue;
        if (e.target.value !== "equals") {
          if (this.state.inputChanged) {
            newValue = chooseOperator(this.state.operator)(this.state.firstOperand, input);
            this.setState({
              inputValue: newValue,
              firstOperand: newValue,
              secondOperand: input,
              operator: e.target.value,
              inputChanged: false,
            });
          }
        } else {
          if (!this.state.inputChanged) {
            newValue = chooseOperator(this.state.operator)(input, this.state.secondOperand);
            this.setState({
              inputValue: newValue,
              firstOperand: newValue,
              inputChanged: false,
            });
          } else {
            newValue = chooseOperator(this.state.operator)(this.state.firstOperand, input);
            this.setState({
              inputValue: newValue,
              firstOperand: newValue,
              secondOperand: input,
              inputChanged: false,
            });
          }
        }
      }
    }
  }

  clearEntry() {
    this.setState({
      inputValue: 0,
    });
  }

  clearAll(e) {
    this.setState({
      inputValue: 0,
      firstOperand: 0,
      secondOperand: 0,
      operator: null,
      inputChanged: true,
    });
  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({
      inputValue: e.target.value,
      inputChanged: true,
    });
  }

  render() {
    return (
      <div>
          <div>{this.state.firstOperand}, {this.state.operator}</div>
          <CalculatorInput
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
          <CalculatorButton
            value="add"
            displayText="+"
            onClick={this.handleClick}
          />
          <CalculatorButton
            value="subtract"
            displayText="-"
            onClick={this.handleClick}
          />
          <CalculatorButton
            value="multiply"
            displayText="x"
            onClick={this.handleClick}
          />
          <CalculatorButton
            value="divide"
            displayText="/"
            onClick={this.handleClick}
          />
          <CalculatorButton
            value="equals"
            displayText="="
            onClick={this.handleClick}
          />
          <CalculatorButton
            value="clear"
            displayText="C"
            onClick={this.clearAll}
          />
          <CalculatorButton
            value="clearEntry"
            displayText="CE"
            onClick={this.clearEntry}
          />
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

const chooseOperator = (operator) => {
  if (operator === 'add') {
    return addFunction;
  } else if (operator === 'subtract') {
    return subtractFunction;
  } else if (operator === 'multiply') {
    return multiplyFunction;
  } else if (operator === 'divide') {
    return divideFunction;
  } else {
    return;
  }
};

export default Calculator;

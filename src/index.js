import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function CalculatorButton(props) {
  let buttonClass = props.buttonType === "operator" ? "button-operator" : "" ;
  return (
    <button
      className={buttonClass}
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
    this.handleNumberClick = this.handleNumberClick.bind(this);
    this.clearEntry = this.clearEntry.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.state = {
      inputValue: 0,
      firstOperand: null,
      secondOperand: null,
      operator: null,
      waitingForSecondOperand: false,
      inputChanged: false,
    }
  }

  handleClick(e) {
    /*
      if equals clicked,
        if operator is set,
          if not waiting for second op'd,
            a = input, b = second op'd
            execute
          if waiting,
            a = first op'd, b = input
            execute
            set second op'd as input
          set input and first op'd as new output
      otherwise an operator was clicked,
        if not waiting for second op'd,
          set first op'd as input
          set operator
          flag as waiting
        if waiting,
          if there was an input change,
            set second op'd as input
            execute
            set input and first op'd as new output
    */

    // check if input is valid
    const input = parseFloat(this.state.inputValue);
    if (!isNaN(input)) {
      let a, b, operator, c ;
      if (e.target.value === "equals") {
        if (this.state.operator) {
          operator = chooseOperator(this.state.operator);
          if (!this.state.waitingForSecondOperand) {
            a = input;
            b = this.state.secondOperand;
            c = operator(a,b);
          } else {
            // was waiting for second op'd -- second op'd = input
            a = this.state.firstOperand;
            b = input;
            c = operator(a,b);

            this.setState({
              waitingForSecondOperand: false,
              secondOperand: input,
            });
          }
          this.setState({
            firstOperand: c,
            inputValue: c,
            inputChanged: false,
          });
        }
      } else {
        // operator was clicked
        if (!this.state.waitingForSecondOperand) {
          this.setState({
            firstOperand: input,
            operator: e.target.value,
            waitingForSecondOperand: true,
            inputChanged: false,
          });
        } else {
          if (this.state.inputChanged) {
            a = this.state.firstOperand;
            b = input;
            operator = chooseOperator(this.state.operator);
            c = operator(a,b);

            this.setState({
              firstOperand: c,
              inputValue: c,
              secondOperand: b,
              waitingForSecondOperand: true,
              inputChanged: false,
            });
          }
        }
      }
    }
  }

  handleChange(e) {
    this.setState({
      inputValue: e.target.value,
      inputChanged: true,
    });
  }

handleNumberClick(e) {
  let currentInput = this.state.inputValue;
  this.setState({
    inputValue: parseFloat(currentInput.toString() + e.target.value),
  });
}

  clearEntry() {
    this.setState({
      inputValue: 0,
    });
  }

  clearAll(e) {
    this.setState({
      inputValue: 0,
      firstOperand: null,
      secondOperand: null,
      operator: null,
      waitingForSecondOperand: false,
      // inputChanged: true,
    });
  }

  render() {
    return (
      <div>
          <div>{this.state.firstOperand}, {this.state.operator},  {this.state.secondOperand}</div>
          <CalculatorInput
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
          <br />
          <CalculatorButton
            buttonType="operator"
            value="add"
            displayText="+"
            onClick={this.handleClick}
          />
          <CalculatorButton
            buttonType="operator"
            value="subtract"
            displayText="-"
            onClick={this.handleClick}
          />
          <CalculatorButton
            buttonType="operator"
            value="multiply"
            displayText="x"
            onClick={this.handleClick}
          />
          <CalculatorButton
            buttonType="operator"
            value="divide"
            displayText="/"
            onClick={this.handleClick}
          />
          <CalculatorButton
            buttonType="operator"
            value="equals"
            displayText="="
            onClick={this.handleClick}
          />
          <CalculatorButton
            buttonType="operator"
            value="clear"
            displayText="C"
            onClick={this.clearAll}
          />
          <CalculatorButton
            buttonType="operator"
            value="clearEntry"
            displayText="CE"
            onClick={this.clearEntry}
          />

          <CalculatorButton
            buttonType=""
            value="1"
            displayText="1"
            onClick={this.handleNumberClick}
          />
          <CalculatorButton
            buttonType=""
            value="2"
            displayText="2"
            onClick={this.handleNumberClick}
          />
          <CalculatorButton
            buttonType=""
            value="3"
            displayText="3"
            onClick={this.handleNumberClick}
          />
          <CalculatorButton
            buttonType=""
            value="4"
            displayText="4"
            onClick={this.handleNumberClick}
          />
          <CalculatorButton
            buttonType=""
            value="5"
            displayText="5"
            onClick={this.handleNumberClick}
          />
          <CalculatorButton
            buttonType=""
            value="6"
            displayText="6"
            onClick={this.handleNumberClick}
          />
          <CalculatorButton
            buttonType=""
            value="7"
            displayText="7"
            onClick={this.handleNumberClick}
          />
          <CalculatorButton
            buttonType=""
            value="8"
            displayText="8"
            onClick={this.handleNumberClick}
          />
          <CalculatorButton
            buttonType=""
            value="9"
            displayText="9"
            onClick={this.handleNumberClick}
          />
          <CalculatorButton
            buttonType=""
            value="0"
            displayText="0"
            onClick={this.handleNumberClick}
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

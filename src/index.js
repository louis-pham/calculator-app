import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class CalculatorButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        className="button"
        value={this.props.value}
        onClick={this.props.onClick}>
        {this.props.displayText}
      </button>
    );
  }
}

class CalculatorInput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
    this.state = {
      inputValue: 0,
      a: null,
      b: null,
      functionToDo: null,
    }
  }

  handleClick(e) {
    console.log("handleClick");
    const functionToDo = e.target.value;
    this.setState({
      a: parseFloat(this.state.inputValue),
      functionToDo: chooseFunction(functionToDo),
    });
  }

  handleEquals(e) {
    console.log("handleEquals");
    const a = this.state.a;
    const b = parseFloat(this.state.inputValue);
    let newValue = this.state.functionToDo(a,b);
    this.setState({
      inputValue: newValue,
      a: null,
      b: null,
    });
  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({
      inputValue: e.target.value
    });
  }

  render() {
    return (
      <div>
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
            value="equals"
            displayText="="
            onClick={this.handleEquals}
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
// const multiplyFunction = (a, b) => a * b;
// const divideFunction = (a,b) => a / b;

const chooseFunction = (functionString) => {
  if (functionString === 'add') {
    return addFunction;
  } else if (functionString === 'subtract') {
    return subtractFunction;
  }
};

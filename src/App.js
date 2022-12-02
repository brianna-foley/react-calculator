import './App.css';
import React, {useState} from 'react';
import {evaluate} from 'mathjs';

function App() {

const [previousOperand, setPreviousOperand] = useState('');
const [currentOperand, setCurrentOperand] = useState('0');
const notDigitsOrDecimal = /[^0-9.]/;
const digitsOrDecimal = /[0-9.]/;
// const checkForMathExpression = new RegExp(/(?:(?:^|[-+_*/])(?:\s*-?\d+(\.\d+)?(?:[eE][+-]?\d+)?\s*))+$/) ;


// function parse(str) {
//   if (!checkForMathExpression.test(str)) return 'invalid entry!'
//   return Function(`'use strict'; return (${str})`)()
// };
// function to remove last character of a string
const removeLastCharacter = (string) => {
  return string
  .split('')
  .slice(0, string.length - 1)
  .join('')
};

const removeSecondToLastCharacter = (string) => {
  return string
  .split('')
  .slice(0, string.length -2)
  .join('')
};

// function when a number or decimal is clicked
const addDigit = (event) => {
  const numberClick = event.target.className.includes('number');
  const buttonText = event.target.innerText;
  const id = event.target.id
  // prevent multiple zeros as first digits or multiple decimals in currentOperand
  if(numberClick && previousOperand.includes('=')) return currentOperand
  if(id === 'decimal' && currentOperand.includes('.')) return currentOperand
  if(id === 'zero' && currentOperand === '0') return currentOperand

  // add number
  if(numberClick && currentOperand === '0') {
    setCurrentOperand(buttonText)
    setPreviousOperand(buttonText)
  } else if(numberClick && currentOperand.match(notDigitsOrDecimal)) {
    setCurrentOperand(buttonText)
    setPreviousOperand(`${previousOperand}${buttonText}`)
  } else {
    setCurrentOperand(`${currentOperand}${buttonText}`)
    setPreviousOperand(`${previousOperand}${buttonText}`)
  }

  // add 0 before a decimal
  if(id === 'decimal' && currentOperand === '0') {
    setCurrentOperand(`${currentOperand}${buttonText}`)
    setPreviousOperand(`${currentOperand}${buttonText}`)
  } else if(id === 'decimal' && currentOperand.match(notDigitsOrDecimal)) {
    setCurrentOperand(`0${buttonText}`)
    setPreviousOperand(`${previousOperand} 0${buttonText}`)
  } else {
    return currentOperand;
  }
};
// function when an operator is clicked
const chooseOperation = (event) => {
  // prevent digit press when there is a calcualted answer
  if(previousOperand.includes('=') && event.target.innerText.match(digitsOrDecimal)) return currentOperand
  // allow the answer to be operated on
  if(previousOperand.includes('=')) {
    const answer = previousOperand.split('= ')
    setCurrentOperand(event.target.innerText)
    setPreviousOperand(`${answer[1]} ${event.target.innerText} `)
    // allow negative number after operator
  } else if(currentOperand.match(notDigitsOrDecimal) && event.target.id === 'subtract') {
    setCurrentOperand(`${event.target.innerText}`)
    setPreviousOperand(`${previousOperand}${event.target.innerText}`)
  } else if(currentOperand.length > 1 && currentOperand.includes('-') && event.target.innerText.match(notDigitsOrDecimal)) {
    setCurrentOperand(event.target.innerText)
    setPreviousOperand(`${previousOperand} ${event.target.innerText}`)
    // switch operator
  } else if(currentOperand.match(notDigitsOrDecimal)) {
    setCurrentOperand(event.target.innerText)
    setPreviousOperand(`${removeSecondToLastCharacter(previousOperand)} ${event.target.innerText} `)
  } else {
    setCurrentOperand(event.target.innerText)
    setPreviousOperand(`${previousOperand} ${event.target.innerText} `)
  }
}


// function when clear is clicked
const clear = (event) => {
  if (event.target.id === 'clear') {
    setCurrentOperand('0')
    setPreviousOperand('')
  }
};

const deleteOne = (event) => {
  if(event.target.id === 'delete' && currentOperand === '0') return currentOperand
  if(event.target.id === 'delete' && currentOperand.length === 1) {
    setCurrentOperand('0')
  }
  setCurrentOperand((prev) => removeLastCharacter(prev))
  setPreviousOperand((prev) => removeLastCharacter(prev))
};

// function to evaluate the expression
const calculate = () => {

    setCurrentOperand(evaluate(previousOperand))
    setPreviousOperand(`${previousOperand} = ${evaluate(previousOperand)}`)
};
  return (
    <div id='app'>
      <div className='grid'>
          <div id='previousOperand'>{previousOperand}</div>
        <div id='display'>
          <div id='currentOperand'>{currentOperand}</div>
        </div>
        <div id='clear' className='padButton'  onClick={clear}>AC</div>
        <div id='delete' className='padButton'  onClick={deleteOne}>DEL</div>
        <div id='divide' className='padButton operator' onClick={chooseOperation}>/</div>
        <div id='multiply' className='padButton operator' onClick={chooseOperation}>*</div>
        <div id='seven' className='padButton number' onClick={addDigit}>7</div>
        <div id='eight' className='padButton number' onClick={addDigit}>8</div>
        <div id='nine' className='padButton number' onClick={addDigit}>9</div>
        <div id='subtract' className='padButton operator' onClick={chooseOperation}>-</div>
        <div id='four' className='padButton number' onClick={addDigit}>4</div>
        <div id='five' className='padButton number' onClick={addDigit}>5</div>
        <div id='six' className='padButton number' onClick={addDigit}>6</div>
        <div id='add' className='padButton operator' onClick={chooseOperation}>+</div>
        <div id='one' className='padButton number' onClick={addDigit}>1</div>
        <div id='two' className='padButton number' onClick={addDigit}>2</div>
        <div id='three' className='padButton number' onClick={addDigit}>3</div>
        <div id='equals' className='padButton' onClick={calculate}>=</div>
        <div id='zero' className='padButton number' onClick={addDigit}>0</div>
        <div id='decimal' className='padButton number' onClick={addDigit}>.</div>
      </div>
    </div>
  );
}

export default App;

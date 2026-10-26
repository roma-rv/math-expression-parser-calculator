import { useState } from 'react'
import './App.css'

const operators = ["+", "-", "*", "/"];

const btnValues = [
  "7", "8", "9", "/",
  "4", "5", "6", "*",
  "1", "2", "3", "-",
  "C", "0", "=", "+"
];

function App() {
  const [input, setInput] = useState("");
  
  return (
    <div className='wrapper-calculator'>
      <div className='display'>{input}</div>
      <div className='wrapper-buttons-numbers'>
        {btnValues.map(value => {
          if (value === "C") {
            return <div key={value} className='button-number' onClick={() => setInput("")}>{value}</div>
          } else if (value === "=") {
            return <div key={value} className='button-number' onClick={() => setInput(input => {
              if (!input) {
                return "";
              }

              let sum = input;

              let tokens = sum.match(/(?<=[+*/(-]|^)-\d+|\d+|\+|\-|\*|\//g);

              console.log(tokens);

              for (let i = 0; i < tokens.length; i++) {
                if (tokens[i] === "/" || tokens[i] === "*") {
                  let prev = Number(tokens[i - 1]);
                  let next = Number(tokens[i + 1]);
                  let result = tokens[i] === "/" ? prev / next : prev * next;

                  tokens.splice(i - 1, 3, String(result));

                  i--;
                }
              }

              let total = Number(tokens[0]);

              console.log(Number(tokens[0]));

              for (let i = 1; i < tokens.length; i += 2) {
                let operator = tokens[i];
                let next = tokens[i + 1];
                if (operator === "+") {
                  total += Number(next);
                } else if (operator === "-") {
                  total -= Number(next);
                }
              }
              
              return String(total);
            })}>{value}</div>
          } else if (operators.includes(value)) {
              return <div key={value} className='button-number' onClick={() => setInput(input => {
                if (input.length === 0) {
                  if (value === "-") {
                    return value;
                  }
                  
                  return "";
                }

                let currentInput = String(input);

                if (currentInput.endsWith("+") ||
                    currentInput.endsWith("-") ||
                    currentInput.endsWith("/") ||
                    currentInput.endsWith("*")
                ) {
                  return currentInput;
                }

                return currentInput + value;
            })}>{value}</div>
          }
          
          else {
            return <div key={value} className='button-number' onClick={() => setInput(input => input + value)}>{value}</div>
          }
        }
        )}
      </div>
    </div>
  )
}

export default App

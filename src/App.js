import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
  const operations = [`/`, `*`, `+`, `-`];

  const [value, setValue] = useState("");
  const [operator, setoperator] = useState("");

  const [operand1, setoperand1] = useState("");
  const [operand2, setoperand2] = useState("");

  const [className, setclassName] = useState("");

  useEffect(() => {
    if (value.length > 15) {
      setclassName("font-XS");
    } else {
      setclassName("");
    }
  }, [value]);

  const handleOperations = (operation) => {
    const parsedOperand1 = parseInt(operand1, 10);
    const parsedOperand2 = parseInt(operand2, 10);
    const operationMap = {
      "+": (v1, v2) => v1 + v2,
      "-": (v1, v2) => v1 - v2,
      "*": (v1, v2) => v1 * v2,
      "/": (v1, v2) => v1 / v2
    };

    let result = value;

    if (value === "") {
      alert("Enter Some Value To Calculate");
    }

    if (operand2 !== "") {
      result = operationMap[operator](parsedOperand1, parsedOperand2);

      setoperand1(`${result}`);
      setoperand2("");
    }

    setoperator(operation);
    setValue(`${result}${operation}`);
  };

  const handleOperands = (digit) => {
    const newVal = value === "0" ? "" : value;

    setValue(newVal + digit);

    if (operator === "") {
      setoperand1(operand1 + digit);
    } else {
      setoperand2(operand2 + digit);
    }
  };

  function handleEqualOperation() {
    if (operand1 !== "" && operator !== "" && operand2 === "") {
      setValue(operand1);
      setoperator("");
    }

    if (operand2 !== "") {
      handleOperations("");
    }
  }

  function handleAC() {
    setValue("");
    setoperator("");
    setoperand1("");
    setoperand2("");
  }

  function handleDel() {
    if (operand1 !== "" && operator === "" && operand2 === "") {
      setoperand1("");
      setValue("");
    } else if (operand1 !== "" && operator !== "" && operand2 === "") {
      setoperator("");
      setValue(`${operand1}`);
    } else if (operand1 !== "" && operator !== "" && operand2 !== "") {
      setoperand2("");
      setValue(`${operand1}${operator}`);
    }
  }

  return (
    <div className="calci-shape">
      <div className="screen-area">
        <span className={className}>{value}</span>
      </div>
      <div className="keys-area">
        {digits.map((digit) => (
          <button
            className="key-style"
            key={digit}
            onClick={() => {
              handleOperands(digit);
            }}
          >
            {digit}
          </button>
        ))}

        {operations.map((operation) => (
          <button
            className="key-style"
            key={operation}
            onClick={() => {
              handleOperations(operation);
            }}
          >
            {operation}
          </button>
        ))}
        <button
          className="key-style"
          key="Del"
          onClick={() => {
            handleDel();
          }}
        >
          Del
        </button>
        <button
          className="key-style"
          key="AC"
          onClick={() => {
            handleAC();
          }}
        >
          AC
        </button>
        <button
          className="key-style"
          key="="
          onClick={() => {
            handleEqualOperation();
          }}
        >
          =
        </button>
      </div>
    </div>
  );
}

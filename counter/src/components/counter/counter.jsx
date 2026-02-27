import { useState } from "react";
import "./counter.css";
import Logs from "../logs/logs";

const Counter = () => {
  const [counter, setCounter] = useState(0);
  const [incVal, setIncVal] = useState(0);
  const [decVal, setDecVal] = useState(0);
  const [logs, setLogs] = useState([]);
  const [showLogs, setShowLogs] = useState(false);

  const handleOperation = (event) => {
    const value = Number(event.target.value);

    if (event.target.id === "value_inc") {
      if (value >= 0) setIncVal(value);
    } else if (event.target.id === "value_dec") {
      if (value >= 0) setDecVal(value);
    }
  };

  const deleteLog = (id) => {
    setLogs((prevLogs) => prevLogs.filter((log) => log.id !== id));
  };

  const handleCounter = (operator) => {
    const oldVal = counter;
    const changeVal = operator === "+" ? incVal : decVal;

    
    if (!changeVal || changeVal === 0) return;

    const newVal = operator === "+" ? counter + changeVal : counter - changeVal;

    setCounter(newVal);
    if (operator === "+") setIncVal(0);
    if (operator === "-") setDecVal(0);

    const newLog = {
      id: Math.random().toString(16).slice(2),
      value: `Previous Value = ${oldVal}, Value ${
        operator === "+" ? "Added" : "Subtracted"
      } = ${changeVal}, New Value = ${newVal}`,
    };

    setLogs((prev) => [...prev, newLog]);
  };

  return (
    <div className="main" data-testid="counter-component">
      <h1>COUNTER</h1>

      <h3 data-testid="counter-value">Value of Counter: {counter}</h3>

      <div className="buttons">
        <div className="action_section">
          <input
            type="number"
            value={incVal}
            placeholder="0"
            id="value_inc"
            data-testid="value_inc"
            onChange={handleOperation}
          />
          <button
            className="button button_inc"
            data-testid="button_inc"
            onClick={() => handleCounter("+")}
          >
            Increase
          </button>
        </div>

        <div className="action_section">
          <input
            type="number"
            value={decVal}
            placeholder="0"
            id="value_dec"
            data-testid="value_dec"
            onChange={handleOperation}
          />
          <button
            className="button button_dec"
            data-testid="button_dec"
            onClick={() => handleCounter("-")}
          >
            Decrease
          </button>
        </div>
      </div>

      {logs.length >= 1 && (
        <button
          className="button button_logs"
          data-testid="toggle-logs"
          onClick={() => setShowLogs((prev) => !prev)}
        >
          {showLogs ? "Hide Logs" : "Show Logs"}
        </button>
      )}

      {logs.length >= 1 && showLogs && (
        <div className="logs" data-testid="logs-section">
          <div className="logs_container">
            <Logs logsData={logs} deleteLog={deleteLog} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Counter;
import React from 'react';
import './App.css';
import Connector from './Connector';

const LEGO_BLE = {
  service: '00001623-1212-efde-1623-785feabcd123',
  characteristic: '00001624-1212-efde-1623-785feabcd123'
}

// This will set up a Scratch VM runtime with BLE, start scanning for the given service and automatically connect if any is found. Once connected, it will subscribe to the given characteristic and use to send commands to.
const c = new Connector(LEGO_BLE.service, LEGO_BLE.characteristic);

function setLED() {
  // Payload for setting the LED to violet
  c.send([8, 0, 129, 50, 17, 81, 0, 2])
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={setLED}>set LED</button>
      </header>
    </div>
  );
}

export default App;

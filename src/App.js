import React from 'react';
import logo from './logo.svg';
import './App.css';
import Connector from './Connector';

const LEGO_BLE = {
  service: '00001623-1212-efde-1623-785feabcd123',
  characteristic: '00001624-1212-efde-1623-785feabcd123'
}

new Connector(LEGO_BLE.service, LEGO_BLE.characteristic);

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';
import Connector from './Connector';

function App() {
  return (
    <div className="App">
      <Connector />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;

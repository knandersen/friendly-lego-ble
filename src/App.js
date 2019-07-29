import React from 'react';
import './App.css';
import Connector from './Connector';
import BaseUtil from 'scratch-vm/src/util/base64-util';
import LBLE from './LBLE';
import Card from './Card';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      messages: []
    }
    this.onMessage = this.onMessage.bind(this);
    // This will set up a Scratch VM runtime with BLE, start scanning for the given service and automatically connect if any is found. Once connected, it will subscribe to the given characteristic and use to send commands to.
    this.c = new Connector(LBLE.UUID.SERVICE, LBLE.UUID.CHARACTERISTIC, this.onMessage);
  }


  setLED() {
    // Payload for setting the LED to violet
    console.log(this.c)
    this.send([8, 0, 129, 50, 17, 81, 0, 2]);
  }

  send(payload) {
    this.c.send(payload);
    this.setState((prevState) => ({
      messages: [...prevState.messages, {"timestamp":Date.now(),"payload":payload,fromDevice:false}]
  }));
  }

  onMessage(e) {
    var b = BaseUtil.base64ToUint8Array(e)
    this.setState((prevState) => ({
        messages: [...prevState.messages, {"timestamp":Date.now(),"payload":b,fromDevice:true}]
    }));
  }

  render() {
    const cards = this.state.messages.map(m => {
            return <Card {...m}></Card>;
    });

    return (
      <div className="App">
        {cards}
        <Card timestamp={Date.now()} payload={[8, 0, 129, 50, 17, 81, 0, 2]}></Card>
        <button onClick={this.setLED.bind(this)}>set LED</button>
      </div>
    );
  }
}

export default App;

import React from 'react';
import './App.css';
import Connector from './Connector';
import BaseUtil from 'scratch-vm/src/util/base64-util';
import LBLE from './LBLE';
import Message from './Message';
import CommandCenter from './CommandCenter';
import uuidv1 from 'uuid/v1';
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      messages: []
    }
    this.onMessage = this.onMessage.bind(this);
    this.send = this.send.bind(this);
    // This will set up a Scratch VM runtime with BLE, start scanning for the given service and automatically connect if any is found. Once connected, it will subscribe to the given characteristic and use to send commands to.
    this.c = new Connector(LBLE.UUID.SERVICE, LBLE.UUID.CHARACTERISTIC, this.onMessage);
  }

  send(payload) {
    this.c.send(payload);
  }

  onMessage(e) {
    var b = BaseUtil.base64ToUint8Array(e)
    this.setState((prevState) => ({
        messages: [...prevState.messages, {"timestamp":Date.now(),"payload":b,fromDevice:true}]
    }));
  }

  onCommand(p) {
    this.c.send(p);
    this.setState((prevState) => ({
      messages: [...prevState.messages, {"timestamp":Date.now(),"payload":p,fromDevice:false}]
  }));
  }

  render() {
    const cards = this.state.messages.map(m => {
            return <Message key={uuidv1()} {...m}></Message>;
    });
    const sortedCards = cards.sort((a,b) => {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    }).reverse();

    return (
      <div className="App">
        <CssBaseline />
        <div className="Cards">
          <Typography variant="h5" gutterBottom>Messages</Typography>
          {sortedCards}
          {<Message timestamp={Date.now()} payload={[8, 0, 129, 50, 17, 81, 0, 2]} fromDevice={false}></Message>}
          {<Message timestamp={Date.now()} payload={[9, 0, 129, 50, 17, 81, 0, 2, 50, 17, 81, 0, 4]} fromDevice={true}></Message>}
        </div>
        <CommandCenter ioSend={this.onCommand.bind(this)} />
      </div>
    );
  }
}

export default App;

import React from 'react';
import './Card.css';
import LBLE from './LBLE';
import moment from 'moment';
import uuidv1 from 'uuid/v1';

class Card extends React.Component {

  render() {
    var phrase = '?'
    switch(this.props.payload[2]) {
        case LBLE.MessageType.HUB_PROPERTIES:
        case LBLE.MessageType.HUB_ALERTS:
            phrase = 'Hub'
            break;
        case LBLE.MessageType.HUB_ATTACHED_IO: {
            let port = this.props.payload[3],
                  event = this.props.payload[4],
                  io = this.props.payload[5];
            phrase = `${LBLE.IO.reverseMap[io]} ${LBLE.IOEvent.reverseMap[event]} on port ${LBLE.Port.reverseMap[port] ? LBLE.Port.reverseMap[port]:port}`;
            break;
        }
        case LBLE.MessageType.PORT_INFORMATION:
            phrase = 'Port'
            break;
        case LBLE.MessageType.PORT_FEEDBACK:
            let port = this.props.payload[3],
            feedback = this.props.payload[4];
            phrase = `Command ${feedback} on port ${LBLE.Port.reverseMap[port] ? LBLE.Port.reverseMap[port]:port}`
            break;
        case LBLE.MessageType.ERROR:
            phrase = 'Error'
            break;
        default:
          console.log(this.props.payload)
    }

    const hexStrings = Array.prototype.map.call(this.props.payload, function(n) {
        return '0x' + LBLE.toHexString(n) + ' '
    })
    return (
      <div key={uuidv1()} className="Card">
        {/*<div className="Card-header">
            <div className="Card-title">{phrase}</div>
        </div>*/}
        <div className="Card-phrase">
            {phrase}
        </div>
        <div className="Card-footer">
            <div className="Card-code">{hexStrings}</div>
            <div className="Card-timestamp">{moment(this.props.timestamp).format('HH:mm:ss.SSS')}</div>
        </div>
        
      </div>
    );
  }
}

export default Card;

import React from 'react';
import './Card.css';
import LBLE from './LBLE';
import moment from 'moment';

class Card extends React.Component {

  constructor() {
    super();
    this.state = {
    }

  }

  render() {
    var phrase = '?'
    switch(this.props.payload[2]) {
        case LBLE.MessageType.HUB_PROPERTIES:
        case LBLE.MessageType.HUB_ALERTS:
            phrase = 'Hub'
            break;
        case LBLE.MessageType.HUB_ATTACHED_IO:
            phrase = ``
        case LBLE.MessageType.PORT_INFORMATION:
            phrase = 'Port'
            break;
        case LBLE.MessageType.ERROR:
            phrase = 'Error'
        default:
    }

    const hexStrings = Array.prototype.map.call(this.props.payload, function(n) {
        return '0x' + LBLE.toHexString(n) + ' '
    })
    return (
      <div key={moment(this.props.timestamp).format('x')} className="Card">
        {/*<div className="Card-header">
            <div className="Card-title">{phrase}</div>
        </div>*/}
        <div className="Card-content">
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

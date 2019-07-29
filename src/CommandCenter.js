import React from 'react';
import './CommandCenter.css';
import LBLE from './LBLE';
import { SketchPicker } from 'react-color';

const HubID = 0x00;

class CommandCenter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ledIndex: 0,
            ledRgb: {r:0,g:0,b:0},
            background:'#fff'
        }

        this.handleChangeLedIndex = this.handleChangeLedIndex.bind(this);
        this.handleChangeLedRgb = this.handleChangeLedRgb.bind(this)
    }

    handleChangeLedIndex(e) {
        this.setState({ledIndex: e.target.value})
    }

    handleChangeLedRgb(c) {
        const color = { r: c.rgb.r, g: c.rgb.g, b: c.rgb.b};
        console.log(color)
        this.setState({
            ledRgb: color, 
            background: c.hex
        });
    }

    changeLedByIndex(payload) {
        this.changeLedMode(0)
        const cmd = [HubID, 
            LBLE.MessageType.OUTPUT, 
            50, 
            LBLE.OutputExecution.EXECUTE_IMMEDIATELY ^ LBLE.OutputExecution.COMMAND_FEEDBACK,
            LBLE.OutputSubCommand.WRITE_DIRECT_MODE_DATA,
            0,
            this.state.ledIndex
        ];
        cmd.unshift(cmd.length);
        this.props.ioSend(cmd);
    }

    changeLedByRgb(payload) {
        this.changeLedMode(1)
        const cmd = [HubID, 
            LBLE.MessageType.OUTPUT, 
            50, 
            LBLE.OutputExecution.EXECUTE_IMMEDIATELY ^ LBLE.OutputExecution.COMMAND_FEEDBACK,
            LBLE.OutputSubCommand.WRITE_DIRECT_MODE_DATA,
            1,
            this.state.ledRgb.r,
            this.state.ledRgb.g,
            this.state.ledRgb.b,
        ];
        cmd.unshift(cmd.length);
        this.props.ioSend(cmd);
    }

    changeLedMode(mode) {
        const cmd = [HubID, 
            LBLE.MessageType.PORT_INPUT_FORMAT_SETUP_SINGLE, 
            50,
            mode,
            ...LBLE.numberToInt32Array(1),
            1
        ];
        cmd.unshift(cmd.length);
        this.props.ioSend(cmd);
    }
    

  render() {
    const ledOptions = Object.keys(LBLE.LedColor).map((k,i) => {
        return <option value={i}>({i}) {k}</option>;
    });
    ledOptions.pop(); // Remove reverseMap

    return (
        <div className="CommandCenter-card">
            <div className="CommandCenter-header">LED</div>
            <select onChange={this.handleChangeLedIndex} value={this.state.ledIndex}>
                {ledOptions}
            </select>
            <button onClick={this.changeLedByIndex.bind(this)}>set LED by index</button>
            <br /><br />
            <SketchPicker disableAlpha={true} presetColors={[]} color={this.state.background} onChangeComplete={this.handleChangeLedRgb} />
            <button onClick={this.changeLedByRgb.bind(this)}>set LED by RGB</button>
        </div>
    );
  }
}

export default CommandCenter;

import React from 'react';
import './CommandCenter.css';
import LBLE from './LBLE';
import { SketchPicker } from 'react-color';
import Container from '@material-ui/core/Container';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';

const HubID = 0x00;

class CommandCenter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ledIndex: 0,
            portMotor:0,
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
        this.setState({
            ledRgb: c.rgb, 
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

    sendMotorCommand() {

    }
    

  render() {
    const ledOptions = Object.keys(LBLE.LedColor).map((k,i) => {
        return <MenuItem value={i} key={i}>({i}) {k}</MenuItem>;
    });
    ledOptions.pop(); // Remove reverseMap

    const portOptions = Object.keys(LBLE.Port).map((k,i) => {
        return <MenuItem value={i} key={i}>({i}) {k}</MenuItem>;
    });
    portOptions.pop(); // Remove reverseMap

    return (
        <Container>
        <ExpansionPanel expanded>
            <ExpansionPanelSummary 
                expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography variant="h5">LED</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <FormControl>
                    <Select onChange={this.handleChangeLedIndex} value={this.state.ledIndex}>
                        {ledOptions}
                    </Select><Button variant="contained" color="secondary" onClick={this.changeLedByIndex.bind(this)}>set LED by index</Button>
                    <br /><br />
                    <SketchPicker disableAlpha={true} presetColors={[]} color={this.state.background} onChangeComplete={this.handleChangeLedRgb} />
                    <Button variant="contained" color="secondary" onClick={this.changeLedByRgb.bind(this)}>set LED by RGB</Button>
                </FormControl>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded>
            <ExpansionPanelSummary 
                expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">  
                <Typography variant="h5">Motor</Typography>
            </ExpansionPanelSummary>   
            <ExpansionPanelDetails>
                <Grid container>
                    <Grid item xs={4}>
                        Port:
                    </Grid>
                    <Grid item xs={8}>
                        <Select onChange={this.handleChangePort} value={this.state.portMotor}>{portOptions}</Select>
                    </Grid>
                    <Grid item xs={4}>Command type:</Grid>
                    <Grid item xs={8}></Grid>
                    <Grid item xs={4}>Speed:</Grid>
                    <Grid item xs={8}><Slider defaultValue={50}
                                    aria-labelledby="discrete-slider"
                                    valueLabelDisplay="auto"
                                    step={1}
                                    marks
                                    min={0}
                                    max={100}/></Grid>
                    <Grid item xs={4}>MaxPower:</Grid>
                    <Grid item xs={8}><Slider defaultValue={100}
                                    aria-labelledby="discrete-slider"
                                    valueLabelDisplay="auto"
                                    step={1}
                                    marks
                                    min={0}
                                    max={100}
                                    color="secondary"/>
                    </Grid>
                    <Grid item xs={12}><Button variant="contained" color="secondary" onClick={this.sendMotorCommand.bind(this)}>Start motor with speed</Button></Grid>

                </Grid>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        </Container>
    );
  }
}

export default CommandCenter;

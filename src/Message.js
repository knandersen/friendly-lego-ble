import React from 'react';
import './Message.css';
import LBLE from './LBLE';
import moment from 'moment';
import uuidv1 from 'uuid/v1';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { ComputerRounded , ArrowBackRounded, ArrowForwardRounded } from '@material-ui/icons';

class Message extends React.Component {

  render() {
    var phrase = 'Message'
    switch(this.props.payload[2]) {
        case LBLE.MessageType.HUB_PROPERTIES:
        case LBLE.MessageType.HUB_ALERTS:
            phrase = <Typography>Hub</Typography>
            break;
        case LBLE.MessageType.HUB_ATTACHED_IO: {
            let port = this.props.payload[3],
                  event = this.props.payload[4],
                  io = this.props.payload[5];
            phrase = <Typography><b>{LBLE.IO.reverseMap[io]} {LBLE.IOEvent.reverseMap[event]}</b> on port <b>{LBLE.Port.reverseMap[port] ? LBLE.Port.reverseMap[port]:port}</b></Typography>;
            break;
        }
        case LBLE.MessageType.PORT_INFORMATION:
            phrase = <Typography>Port</Typography>
            break;
        case LBLE.MessageType.PORT_FEEDBACK:
            let port = this.props.payload[3],
            feedback = this.props.payload[4];
            phrase = <Typography>Command <b>{feedback}</b> on port <b>{LBLE.Port.reverseMap[port] ? LBLE.Port.reverseMap[port]:port}</b></Typography>;
            break;
        case LBLE.MessageType.ERROR:
            phrase = <Typography>Error</Typography>
            break;
        default:
          console.log(this.props.payload)
    }

    const hexStrings = Array.prototype.map.call(this.props.payload, function(n,i) {
        return '0x' + LBLE.toHexString(n) + ' '
    })

    return (
      <Card key={uuidv1()} style={{marginBottom:12}}>
        <CardContent>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="body2" gutterBottom>
                        {phrase}
                    </Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="caption">
                        {hexStrings}
                    </Typography>
                </Grid>
                <Grid item xs={2} alignContent={"flex-end"}>
                    <Typography variant="caption" align={'right'} color={'disabled'} gutterBottom>
                        {moment(this.props.timestamp).format('HH:mm:ss.SSS')}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                { this.props.fromDevice ? <ArrowForwardRounded color={"primary"} fontSize={"small"} />:<ArrowBackRounded color={"secondary"} fontSize={"small"} /> } <ComputerRounded fontSize={"small"} />
                </Grid>
            </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default Message;

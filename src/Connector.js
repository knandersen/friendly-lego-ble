import BLE from 'scratch-vm/src/io/ble';
import BaseUtil from 'scratch-vm/src/util/base64-util';
import React from 'react';

const LBLE = {
    service: '00001623-1212-efde-1623-785feabcd123',
    characteristic: '00001624-1212-efde-1623-785feabcd123'
}

class Connector extends React.Component {

    constructor() {
        super();

        const options = {
            filters: [{
                services: [LBLE.service]
            }],
            optionalServices: []
        };  
        this.ble = new BLE(this,'myExtension', options, this._onConnect.bind(this), this.disconnect.bind(this));
    }

    // This is to catch the emit that will be called by the runtime parameter specified in the BLE-init.
    emit(v,e){
        console.log(e);
        if(e && !e.message) {
            this.scan(e)
        }
    }

    scan(e) {
        for (var p in e) {
            p = e[p]
            if(this.ble && p.peripheralId) {
                    this.ble.connectPeripheral(p.peripheralId);
            }
            break;
        }
    }

    _onConnect() {
        if(this.ble) {
            this.ble.startNotifications(
                LBLE.service,
                LBLE.characteristic,
                this._onMessage
            );
            // Set LED to pink
            this.ble.write(
                LBLE.service,
                LBLE.characteristic,
                BaseUtil.uint8ArrayToBase64([0x8,0x00, 0x81, 50, 0x00, 0x51, 0, 2]),'base64', true)
        }
    }

    _onMessage(base64) {
        console.log(BaseUtil.base64ToUint8Array(base64));
    }

    disconnect() {
        console.log("disconnect")
    }

    render() {
        return null;
    }
}

export default Connector;
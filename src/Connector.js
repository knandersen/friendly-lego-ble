import BLE from 'scratch-vm/src/io/ble';
import Runtime from 'scratch-vm/src/engine/runtime';
import BaseUtil from 'scratch-vm/src/util/base64-util';
const extensionId = 'myExtension';

class Connector {

    constructor(serviceUuid, characteristicUuid, onBleMessage) {
        this.serviceUuid = serviceUuid;
        this.characteristicUuid = characteristicUuid;
        this.onBleMessage = onBleMessage;
        this.runtime = new Runtime();
        this.runtime.registerPeripheralExtension(extensionId,this)
        const options = {
            filters: [{
                services: [this.serviceUuid]
            }],
            optionalServices: []
        };
        this.ble = new BLE(this.runtime,extensionId, options, this._onConnect.bind(this), this.disconnect.bind(this));
        this.runtime.addListener("PERIPHERAL_LIST_UPDATE",this.onDiscover.bind(this));
        console.log("Set up LEGO Connector")
    }

    onDiscover(e) {
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
                this.serviceUuid,
                this.characteristicUuid,
                this.onBleMessage
            );
        }
    }
    disconnect() {
        console.log("disconnect")
    }

    send(payload) {
        return this.ble._connected ? this.ble.write(
            this.serviceUuid,
            this.characteristicUuid,
            BaseUtil.uint8ArrayToBase64(payload),'base64', true) : false;
        
    }
}

export default Connector;
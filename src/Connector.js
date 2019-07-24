import BLE from 'scratch-vm/src/io/ble';
import Runtime from 'scratch-vm/src/engine/runtime';
import BaseUtil from 'scratch-vm/src/util/base64-util';

const extensionId = 'myExtension';

class Connector {

    constructor(serviceUuid,characteristicUuid) {
        this.serviceUuid = serviceUuid;
        this.characteristicUuid = characteristicUuid;
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
                this._onMessage
            );
        }
    }

    _onMessage(base64) {
        console.log(BaseUtil.base64ToUint8Array(base64));
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
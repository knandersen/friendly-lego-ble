export default class LBLE {

    static toHex(number) {
        return (number).toString(16)
    }

    static toHexString(number) {
        return this.toHex(number).padStart(2,'0')
    }

    static UUID = {
        SERVICE: '00001623-1212-efde-1623-785feabcd123',
        CHARACTERISTIC: '00001624-1212-efde-1623-785feabcd123' 
    }

    static SystemType = {
        WEDO2: 0x00,
        DUPLO: 0x01,
        SYSTEM: 0x02,
        SYSTEM2: 0x03
    }

    static DeviceNumber = {
        WEDO: 0x00,
        DUPLO_TRAIN: 0x00,
        MOVE_HUB: 0x00,
        SYSTEM2PORT: 0x01,
        SYSTEM2HANDSET: 0x02
    }

    static DeviceCapabilities = {
        CENTRAL: 0x01,
        PERIPHERAL: 0x02,
        LPF2: 0x04,
        ACT_AS_REMOTE: 0x08
    }

    /**
     * Enum for ids for various LEGO Inputs and Outputs
     * @readonly
     * @enum {number}
     */

    static IO = {
        MOTOR_WEDO: 0x01,
        MOTOR_SYSTEM: 0x02,
        BUTTON: 0x05,
        LIGHT: 0x08,
        VOLTAGE: 0x14,
        CURRENT: 0x15,
        PIEZO: 0x16,
        LED: 0x17,
        TILT_EXTERNAL: 0x22,
        MOTION_SENSOR: 0x23,
        COLOR: 0x25,
        MOTOR_EXTERNAL: 0x26,
        MOTOR_INTERNAL: 0x27,
        TILT: 0x28,
        reverseMap: {}
    };

    /**
     * Enum for ids for various output command feedback types on the LEGO.
     * @readonly
     * @enum {number}
     */
    static PortFeedback = {
        IN_PROGRESS: 0x01,
        COMPLETED: 0x02,
        DISCARDED: 0x04,
        IDLE: 0x08,
        BUSY_OR_FULL: 0x10
    };

    /**
     * Enum for physical LEGO Ports
     * @readonly
     * @enum {number}
     */
    static Port = {
        A: 0,
        B: 1,
        C: 2,
        D: 3,
        E: 4,
        F: 5
    };

    /**
     * Ids for each color sensor value used by the extension.
     * @readonly
     * @enum {string}
     */
    static Color = {
        NONE: 'none',
        RED: 'red',
        BLUE: 'blue',
        GREEN: 'green',
        YELLOW: 'yellow',
        WHITE: 'white',
        BLACK: 'black'
    };

    /**
     * Enum for indices for each color sensed by the LEGO vision sensor.
     * @readonly
     * @enum {number}
     */
    static ColorIndex = {
        [this.Color.NONE]: 255,
        [this.Color.RED]: 9,
        [this.Color.BLUE]: 3,
        [this.Color.GREEN]: 5,
        [this.Color.YELLOW]: 7,
        [this.Color.WHITE]: 10,
        [this.Color.BLACK]: 0
    };

    static LedColor = {
        OFF: 0,
        PINK: 1,
        VIOLET: 2,
        BLUE: 3,
        LIGHT_BLUE: 4,
        LIGHT_GREEN: 5,
        GREEN:6,
        YELLOW:7,
        ORANGE:8,
        RED:9,
        WHITE:10
    };

    /**
     * Enum for Message Types
     * @readonly
     * @enum {number}
     */
    static MessageType = {
        HUB_PROPERTIES: 0x01,
        HUB_ACTIONS: 0x02,
        HUB_ALERTS: 0x03,
        HUB_ATTACHED_IO: 0x04,
        ERROR: 0x05,
        HW_NETWORK_COMMANDS: 0x08,
        FW_UPDATE_GO_INTO_BOOTMODE: 0x10,
        FW_UPDATE_LOCK_MEMORY: 0x11,
        FW_UPDATE_LOCK_STATUS_REQUEST: 0x12,
        FW_LOCK_STATUS : 0x13,
        PORT_INFO_REQUEST : 0x21,
        PORT_MODE_INFO_REQUEST: 0x22,
        PORT_INPUT_FORMAT_SETUP_SINGLE: 0x41,
        PORT_INPUT_FORMAT_SETUP_COMBINED: 0x42,
        PORT_INFORMATION: 0x43,
        PORT_MODEINFORMATION: 0x44,
        PORT_VALUE: 0x45,
        PORT_VALUE_COMBINED: 0x46,
        PORT_INPUT_FORMAT: 0x47,
        PORT_INPUT_FORMAT_COMBINED: 0x48,
        VIRTUAL_PORT_SETUP : 0x61,
        OUTPUT: 0x81,
        PORT_FEEDBACK: 0x82
    };

    static HubProperty = {
        ADVERTISEMENT_NAME : 0x01,
        BUTTON: 0x02,
        FW_VERSION: 0x03,
        HW_VERSION: 0x04,
        RSSI: 0x05,
        BATTERY_VOLTAGE: 0x06,
        BATTERY_TYPE: 0x07,
        MANUFACTURER_NAME: 0x08,
        RADIO_FW_VERSION: 0x09,
        LEGO_WP_VERSION: 0x0A,
        SYSTEM_TYPE_ID: 0x0B,
        HW_NETWORK_ID: 0x0C,
        PRIMARY_MAC: 0x0D,
        SECONDARY_MAC: 0x0E,
        HW_NETWORK_FAMILY: 0x0F
    }

    static HubPropertyOperation = {
        SET: 0x01,
        ENABLE_UPDATES: 0x02,
        DISABLE_UPDATES: 0x03,
        RESET: 0x04,
        REQUEST_UPDATE: 0x05,
        UPDATE: 0x06
    }

    static HubActionType = {
        SWITCH_OFF: 0x01,
        DISCONNECT: 0x02,
        VCC_PORT_ON: 0x03,
        VCC_PORT_OFF: 0x04,
        ACTIVATE_BUSY: 0x05,
        RESET_BUSY: 0x06,
        SWITCH_OFF_FAST : 0x2F,
        HUB_WILL_SWITCH_OFF: 0x30,
        HUB_WILL_DISCONNECT: 0x31,
        HUB_WILL_GO_INTO_BOOTMODE: 0x32
    }

    static HubAlert = {
        LOW_VOLTAGE : 0x01,
        HIGH_CURRENT: 0x02,
        LOW_SIGNAL: 0x03,
        OVER_POWER: 0x04
    }

    static HubAlertOperation = {
        ENABLE_UPDATES: 0x01,
        DISABLE_UPDATES: 0x02,
        REQUEST_UPDATES: 0x03,
        UPDATE: 0x04
    }

    static HubAlertPayload = {
        OK: 0x00,
        ALERT: 0xFF
    }

    static ErrorCodes = {
        ACK: 0x01,
        NACK: 0x02,
        BUFFER_OVERFLOW: 0x03,
        TIMEOUT: 0x04,
        COMMAND_NOT_RECOGNIZED : 0x05,
        INVALID_USE: 0x06,
        OVERCURRENT: 0x07,
        INTERNAL_ERROR: 0x08
    }

    static HardwareNetworkCommandType = {}

    static HardwareNetworkFamily = {}

    static HardwareNetworkSubfamily = {}

    static ModeInformationType = {
    }

    /**
     * TBD: function for converting version numbers to something friendly https://lego.github.io/lego-ble-wireless-protocol-docs/index.html#ver-no
     */

    /**
     * Enum for Motor Subcommands (for 0x81)
     * @readonly
     * @enum {number}
     */
    static OutputSubCommand = {
        START_POWER: 0x01,
        START_POWER_PAIR: 0x02,
        SET_ACC_TIME: 0x05,
        SET_DEC_TIME: 0x06,
        START_SPEED: 0x07,
        START_SPEED_PAIR: 0x08,
        START_SPEED_FOR_TIME: 0x09,
        START_SPEED_FOR_TIME_PAIR: 0x0A,
        START_SPEED_FOR_DEGREES: 0x0B,
        START_SPEED_FOR_DEGREES_PAIR: 0x0C,
        GO_TO_ABS_POSITION: 0x0D,
        GO_TO_ABS_POSITION_PAIR: 0x0E,
        PRESET_ENCODER: 0x14,
        WRITE_DIRECT_MODE_DATA: 0x51
    };

    /**
     * Enum for Startup/Completion information for an output command.
     * Startup and completion bytes must be OR'ed to be combined to a single byte.
     * @readonly
     * @enum {number}
     */
    static OutputExecution = {
        // Startup information
        BUFFER_IF_NECESSARY: 0x00,
        EXECUTE_IMMEDIATELY: 0x10,
        // Completion information
        NO_ACTION: 0x00,
        COMMAND_FEEDBACK: 0x01
    };

    /**
     * Enum for LEGO Motor end states
     * @readonly
     * @enum {number}
     */
    static MotorEndState = {
        FLOAT: 0,
        HOLD: 126,
        BRAKE: 127
    };

    /**
     * Enum for LEGO Motor acceleration/deceleration profiles
     * @readyonly
     * @enum {number}
     */
    static MotorProfile = {
        DO_NOT_USE: 0x00,
        ACCELERATION: 0x01,
        DECELERATION: 0x02
    };

    /**
     * Enum for when LEGO IO's are attached/detached
     * @readonly
     * @enum {number}
     */
    static IOEvent = {
        ATTACHED: 0x01,
        DETACHED: 0x00,
        ATTACHED_VIRTUAL: 0x02
    }
    
    static numberToInt32Array = function (number) {
        const buffer = new ArrayBuffer(4);
        const dataview = new DataView(buffer);
        dataview.setInt32(0, number);
        return [
            dataview.getInt8(3),
            dataview.getInt8(2),
            dataview.getInt8(1),
            dataview.getInt8(0)
        ];
    };

    static objectFlip(obj) {
        const ret = {};
        Object.keys(obj).forEach((key) => {
          ret[obj[key]] = key;
        });
        return ret;
      }

    
    static sconstructor() {
        this.IO.reverseMap = this.objectFlip(this.IO)
        this.IOEvent.reverseMap = this.objectFlip(this.IOEvent)
        this.Port.reverseMap = this.objectFlip(this.Port)
        this.PortFeedback.reverseMap = this.objectFlip(this.PortFeedback)
        this.LedColor.reverseMap = this.objectFlip(this.LedColor)
    }
}
LBLE.sconstructor()
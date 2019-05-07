var IoTDevice = require ('./device/device.js');
var cfenv = require('cfenv');

/* Edit these lines to reflect your IoT platform config. */
const ORG_ID = "lrgbjk";
const ACCESS_TOKEN = "this-is-my-secret-token";
var device = new IoTDevice(ORG_ID, ACCESS_TOKEN);
var hour = 0;

setInterval(() => Transmit(), 3000);
function Transmit() {
  device.Push('device_data');
  device.AlterDummyData(hour);
  if(hour == 24){
    hour = 0;
  }
  else{
    hour++;
  }
}

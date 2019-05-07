var iotf = require('ibmiotf');
class Device {
  constructor(org, token) {
    const device_config = {
      "org": org,
      "domain": "internetofthings.ibmcloud.com",
      "type": "IBM-KTH",
      "id": "0",
      "auth-method": "token",
      "auth-token": token,
      "use-client-certs": false
    };
    this.temp = 0;
    this.ph = 0;
    this.humidity = 0;
    this.device = new iotf.IotfManagedDevice(device_config);
    this._setup();
  }

  TempCurve(x){
    if(x===null){
      this.temp = null;
    }
    else if(x>=0 && x<=24){
      this.temp = Math.round(16 * Math.sin(x / 7.16) + 10);
    }
    else{
      this.temp = Math.round(8*Math.sin(x/5.16)+13);
    }
  }

  PhCurve(x) {
    if(x===null){
      this.ph = null;
    }
    else{
      this.ph = Math.round((6.4 + 1.4*Math.sin(x / 6.4))*10)/10;
    }
  }

  HumCurve(x) {
    if(x===null){
      this.humidity = null;
    }
    else if(x >= 0 && x <= 7){
      this.humidity = Math.round(40 - 2*x);
    }
    else if(x > 7 && x <= 8){
      this.humidity = Math.round(60*x - 394);
    }
    else if(x>8 && x<=24){
      this.humidity = Math.round(-0.124*x*x+93.9355);
    }
    else{
      this.humidity = Math.round(45 - 16*Math.sin(x / 3.2));
    }
  }

  AlterDummyData(hour){
    this.TempCurve(hour);
    this.PhCurve(hour);
    this.HumCurve(hour);
  }

  Push(id) {
    this.device.publishHTTPS(id, 'json', JSON.stringify({temp: this.temp, ph: this.ph, humidity: this.humidity}), 0);
  }

  _setup() {
    var that = this;

    /* Connect it to Watson IoT! */
    this.device.connect();

    /* When your device has connected, setup listeners and callbacks. */
    this.device.on('connect', function(parent){
      that.device_connected = true;

      /* If the device disconnects, we do not need to panic. */
      that.device.on('disconnect', function(){
        that.device_connected = false;
        console.log('Disocnnected');
      });

      /* Errors are pretty bad, right? */
      that.device.on('error', function (argument) {
        console.log(argument);
        process.exit(1);
      });

    });
  }

  IsConnected() {
    return this.device_connected;
  }
}

module.exports = Device;

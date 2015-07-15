var __interpretation_started_timestamp__;  

var k = 1.5;
var period = 50;

var main = function()
{
  __interpretation_started_timestamp__ = Date.now();
  
  var rightEnc = brick.encoder("B2");
  var leftEnc = brick.encoder("B1");
  
  var e3 = brick.encoder("B2");
  var e4 = brick.encoder("B1");
  
  rightEnc.reset();
  leftEnc.reset();

  var rightM = brick.motor("M2");
  var leftM = brick.motor("M1");
  leftM.setPower(50);
  rightM.setPower(50);
  
  while (l >= 0 && r <= 0) {
    r = rightEnc.readRawData();
    l = leftEnc.readRawData();
    var diff = l + r;
    script.wait(20);
  }

  var time = 0;
  var l = 0;
  var r = 0;
  while (time < 4500) {
    r = rightEnc.readRawData();
    l = leftEnc.readRawData();
    var diff = l + r;
    print(diff + " : " + k * diff);
    rightM.setPower(50 + k * diff);
    leftM.setPower(50 - k * diff);
    script.wait(period);
    time += period;
  }

  while (l >= 0 && r <= 0) {
    r = rightEnc.readRawData();
    l = leftEnc.readRawData();
    var diff = l + r;
    if (l < 200) {
      rightM.setPower(l * 0.01 * (-50 + k * diff));
      leftM.setPower(l * 0.01 * (-50 - k * diff));
    } else {
      rightM.setPower(-50 + k * diff);
      leftM.setPower(-50 - k * diff);
    }
    script.wait(period);
  }
}


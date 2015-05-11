var __interpretation_started_timestamp__;  

var k = 0.1;


var main = function()
{
  __interpretation_started_timestamp__ = Date.now();
  
  var encL = [];
  var encR = [];
  
  var rightEnc = brick.encoder("B2");
  var leftEnc = brick.encoder("B1");
  rightEnc.reset();
  leftEnc.reset();

  var rightM = brick.motor("M2");
  var leftM = brick.motor("M1");
  leftM.setPower(50);
  rightM.setPower(50);
  
  var time = 0;
  var l = 0;
  var r = 0;
  while (time < 1600) {
    l = leftEnc.readRawData();
    r = rightEnc.readRawData();
    print(l + " " + r);
    encL.push(l);
    encR.push(r);
    var diff = l + r;
    rightM.setPower(50 + k * diff);
    leftM.setPower(50 - k * diff);
    script.wait(20);
    time += 20;
  }
  print("here");
  while (l >= 0 && r <= 0) {
    r = rightEnc.readRawData();
    l = leftEnc.readRawData();
    var diff = l + r;
    rightM.setPower(-50 + k * diff);
    leftM.setPower(-50 - k * diff);
    script.wait(20);
  }
}


var __interpretation_started_timestamp__;
var v = 50;

function returnToTheLine(left, right) {
  var K = 0.1;
  
  var leftEnc = brick.encoder("B1");
  var rightEnc = brick.encoder("B2");

  var leftM = brick.motor(M1);
	var rightM = brick.motor(M2);

  var l = leftEnc.readRawData();  
  var r = rightEnc.readRawData();
  var diffl = l - left;
  var diffr = right - r;
  var c = diffl * 1.0 / diffr;

  while (l > left && r < right) {
    l = leftEnc.readRawData();
    r = rightEnc.readRawData();
    var diff = l + r * c;
    rightM.setPower(-v + K * diff);
    leftM.setPower((-v - K * diff) / c);
    
    script.wait(10);
  } 
}

var main = function()
{
  __interpretation_started_timestamp__ = Date.now();

  var sens = brick.lineSensor("video0");
  
  var leftEnc = brick.encoder("B1");
  var rightEnc = brick.encoder("B2");
  
  leftEnc.reset();
  rightEnc.reset();
  sens.init(true);
  sens.detect();
	
  var leftM = brick.motor(M1);
	var rightM = brick.motor(M2);

  for (var i = 0; i < 50; i++) {
    rightM.setPower(30);
    leftM.setPower(50);
    script.wait(10);
  }
  for (var i = 0; i < 50; i++) {
    rightM.setPower(30);
    leftM.setPower(40);
    script.wait(10);
  }
  for (var i = 0; i < 50; i++) {
    rightM.setPower(25);
    leftM.setPower(25);
    script.wait(10);
  }
  for (var i = 0; i < 50; i++) {
    rightM.setPower(30);
    leftM.setPower(60);
    script.wait(10);
  }
  for (var i = 0; i < 50; i++) {
    rightM.setPower(50);
    leftM.setPower(50);
    script.wait(10);
  }
  for (var i = 0; i < 50; i++) {
    rightM.setPower(70);
    leftM.setPower(50);
    script.wait(10);
  }
  for (var i = 0; i < 50; i++) {
    rightM.setPower(90);
    leftM.setPower(20);
    script.wait(10);
  }


  var l = leftEnc.readRawData();
  var r = rightEnc.readRawData();

  print("encoders: " + l + ", " + r);

  returnToTheLine(0, 0);
}

var __interpretation_started_timestamp__;
var k = 0;
var k1 = 0;
var v = 70;
var kturn = 0.8;
var retPeriod = 10;

/*function returnToTheLine(left, right) {
  var K = 0.4;
  var v1 = 70;
  
  var leftEnc = brick.encoder("B1");
  var rightEnc = brick.encoder("B2");

  var leftM = brick.motor(M1);
	var rightM = brick.motor(M2);

	leftM.setPower(0);
	rightM.setPower(0);

  var l = leftEnc.readRawData();  
  var r = rightEnc.readRawData();
  var diffl = l - left;
  var diffr = right - r;
  var c = diffl * 1.0 / diffr;

  while (l > left && r < right) {
    l = leftEnc.readRawData();
    r = rightEnc.readRawData();
    diffl = l - left;
    diffr = r - right;
    var diff = diffl + diffr * c;

    rightM.setPower((-v1 + K * diff) / c);
    leftM.setPower((-v1 - K * diff) );
    
    script.wait(retPeriod);
  } 
} */

function moveBack(left, right) {
  var K = 0.7;
  var v1 = 70;
  var int = 0;
  var ci = 0.7;

  var leftEnc = brick.encoder("B1");
  var rightEnc = brick.encoder("B2");

  var leftM = brick.motor(M1);
	var rightM = brick.motor(M2);

	leftM.setPower(0);
	rightM.setPower(0);

  var l = leftEnc.readRawData();  
  var r = rightEnc.readRawData();
  var diffl = l - left;
  var diffr = r - right;

  while (l > left && r < right) {
    l = leftEnc.readRawData();
    r = rightEnc.readRawData();
    diffl = left - l;
    diffr = right - r;
    var diff = diffl + diffr;

    int += ci * diff;
    var u = K * diff + int;
    rightM.setPower(-v1 + u);
    leftM.setPower(-v1 - u);
    
    script.wait(retPeriod);
    l = leftEnc.readRawData();
    r = rightEnc.readRawData();
  } 

  leftM.setPower(0);
  rightM.setPower(0);
} 


function stop() {
  print("Stopped!");
  var leftM = brick.motor(M1);
	var rightM = brick.motor(M2);

	while (true) {
	  leftM.setPower(0);
	  rightM.setPower(0);
	}
}
  
var main = function()
{
  __interpretation_started_timestamp__ = Date.now();

  var sens = brick.lineSensor("video0");
  sens.init(true);
  while (!brick.keys().wasPressed(KeysEnum.Enter)) {
    script.wait(100);
  }
  sens.detect();
	
  var oldx = sens.read()[0];
  var leftEnc = brick.encoder("B1");
  var rightEnc = brick.encoder("B2");
  leftEnc.reset();
  rightEnc.reset();

  var leftM = brick.motor(M1);
	var rightM = brick.motor(M2);

  while (true) {
    left = leftEnc.readRawData();
    right = rightEnc.readRawData();
    x = sens.read()[0];
    var line = sens.read()[2];
    if (line < 2) {
      k += 0.05;
      script.wait(1000);
      moveBack(left, right);
      print("now k is : " + k);
    } 

    u = k * x + k1 * (x - oldx);
    rightM.setPower(v - u);
    leftM.setPower(v + u);
    oldx = x;
    script.wait(10);
  }
}

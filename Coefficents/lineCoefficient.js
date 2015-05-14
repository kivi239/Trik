var __interpretation_started_timestamp__;
var k = 0;
var k1 = 0;
var v = 70;
var kturn = 0;

function returnToTheLine(left, right) {
  var K = 0.2;
  
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
    print("coordinate of line: " + x);
    var line = sens.read()[2];
    if (line < 2) {
      print("Lost the line :(");
      script.wait(1000);
      returnToTheLine(left, right);
      k += 0.05;
      print("now k is : " + k);
    } 
    //print(x + " : " + oldx)	
    u = k * x + k1 * (x - oldx);
    rightM.setPower(v - u);
    leftM.setPower(v + u);
    oldx = x;
    script.wait(10);
  }
}

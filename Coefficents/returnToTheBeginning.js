var __interpretation_started_timestamp__;
var k = 0.6;
var k1 = 1.8;
var v = 70;
var kturn = 0.8;

function returnToTheLine(left, right) {
  var K = 0.1;
  var v1 = 35;
  
  var leftEnc = brick.encoder("B1");
  var rightEnc = brick.encoder("B2");

  var leftM = brick.motor(M1);
	var rightM = brick.motor(M2);

  var l = leftEnc.readRawData();  
  var r = rightEnc.readRawData();
  var diffl = l - left;
  var diffr = right - r;
  var c = diffl * 1.0 / diffr;

  print("coef: " + c);
  while (l > left && r < right) {
    l = leftEnc.readRawData();
    r = rightEnc.readRawData();
    var diff = l + r * c;
    print(l + ", " + r);
    rightM.setPower(-v1 + K * diff);
    leftM.setPower((-v1 - K * diff) / c);
    
    script.wait(5);
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
	
	var ls = [];
	var rs = [];
	ls.push(0);
	rs.push(0);
  var oldx = sens.read()[0];
  var leftEnc = brick.encoder("B1");
  var rightEnc = brick.encoder("B2");
  leftEnc.reset();
  rightEnc.reset();

  var leftM = brick.motor(M1);
	var rightM = brick.motor(M2);

  for (var i = 0; i < 100; i++) { 
    left = leftEnc.readRawData();
    right = rightEnc.readRawData();
    ls.push(left);
    rs.push(right);
    x = sens.read()[0];
    u = k * x + k1 * (x - oldx);
    rightM.setPower(v - u);
    leftM.setPower(v + u);
    oldx = x;
    script.wait(50);
  }

  for (var i = 0; i < 100; i++) {
    var l = leftEnc.readRawData(), r = rightEnc.readRawData();
    print("now: " + l + ", " + r + "; wanted: " + ls[ls.length - 1] + ", " + rs[rs.length - 1]); 
    print("  now: " + leftEnc.readRawData() + ", " + rightEnc.readRawData() + "; wanted: " + ls[ls.length - 1] + ", " + rs[rs.length - 1]); 
    leftM.setPower(0);
    rightM.setPower(0);
    returnToTheLine(ls[ls.length - 1], rs[rs.length - 1])
    ls.pop();
    rs.pop();
  }
}

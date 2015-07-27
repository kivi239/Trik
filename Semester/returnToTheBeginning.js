var __interpretation_started_timestamp__;
var k = 0.6;
var k1 = 1.8;
var v = 70;
var kturn = 0.8;

var period = 40;
var encPeriod = 400;
var retPeriod = 10;

function returnToTheLine(left, right) {
  var K = 0.4;
  var v1 = 30;
  
  var leftEnc = brick.encoder("B1");
  var rightEnc = brick.encoder("B2");

  var leftM = brick.motor(M1);
	var rightM = brick.motor(M2);

	leftM.setPower(0);
	rightM.setPower(0);
	//script.wait(1500);

  var l = leftEnc.readRawData();  
  var r = rightEnc.readRawData();
  var diffl = l - left;
  var diffr = right - r;
  var c = diffl * 1.0 / diffr;

  print("coef: " + c);
  while (l > left && r < right) {
    l = leftEnc.readRawData();
    r = rightEnc.readRawData();
    diffl = l - left;
    diffr = r - right;
    var diff = diffl + diffr * c;

    print(diffl + ", " + diffr);
    print("speed: " + (-v + K * diff) / c + ", " + ((-v1 - K * diff)) + " , diff: " + diff);
    rightM.setPower((-v1 + K * diff) / c);
    leftM.setPower((-v1 - K * diff) );
    
    script.wait(retPeriod);
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

	var time = 0;
  for (var i = 0; i < 250; i++) { 
    left = leftEnc.readRawData();
    right = rightEnc.readRawData();
    x = sens.read()[0];
    u = k * x + k1 * (x - oldx);
    rightM.setPower(v - u);
    leftM.setPower(v + u);
    oldx = x;
    script.wait(period);
    if (time % encPeriod == 0) {
    	ls.push(left);
      rs.push(right);
    }
    time += period;
  }
  print("finished");
  while (ls.length > 0) {
    var l = leftEnc.readRawData(), r = rightEnc.readRawData();
    print("now: " + l + ", " + r + "; wanted: " + ls[ls.length - 1] + ", " + rs[rs.length - 1]); 
    returnToTheLine(ls[ls.length - 1], rs[rs.length - 1])
    ls.pop();
    rs.pop();
  }
}

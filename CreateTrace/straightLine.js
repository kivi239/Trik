var __interpretation_started_timestamp__;
var k = 0;
var k1 = 0;
var v = 70;
var kturn = 0.8;
var retPeriod = 10;

function move(left, right) {
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

  while (l < left && r > right) {
    l = leftEnc.readRawData();
    r = rightEnc.readRawData();
    diffl = left - l;
    diffr = right - r;
    var diff = diffl + diffr;

    int += ci * diff;
    var u = K * diff + int;
    rightM.setPower(v1 - u);
    leftM.setPower(v1 + u);
    
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

  var leftEnc = brick.encoder("B1");
  var rightEnc = brick.encoder("B2");
  leftEnc.reset();
  rightEnc.reset();

  var leftM = brick.motor(M1);
	var rightM = brick.motor(M2);


  var lines = [50, -50, 100, -100, 150, -150, 200, -200, 300, -300, 400, -400, 500, -500, 600, -600, 700, -700, 800, -800, 900, -900, 950, -950, 1000, -1000, 1100, -1100];
  for (var i = 0; i < lines.length; i += 2) {
     move(lines[i], lines[i + 1]);
  }

  leftM.setPower(0);
  rightM.setPower(0);

}

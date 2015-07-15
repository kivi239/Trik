var __interpretation_started_timestamp__;
var pi = 3.14159265;
var u;
var k = 0.15;
var ci = 0.03;
var cd = 0.3;
var v = 30;
var tV = 40;
var time = 0;

function min0(a, b) {
  if (a < 0 || b < 0)
  	return 0;
  if (a < b)
  	return a;
  return b;
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

	var lArr = [], rArr = [];
	var uArr = [];
	var lSpeed = [], rSpeed = [];

	var leftM = brick.motor(M4);
	var rightM = brick.motor(M3);
	var leftEnc = brick.encoder(B4);
	var rightEnc = brick.encoder(B3);
	leftEnc.reset();
	rightEnc.reset();
	var l = 0, r = 0;
	var P = 0, I = 0, D = 0;
	var x = 0;
	var oldX = sens.read()[0];
	while (time < 6000) {
		while (sens.read()[2] < 5) {
		  print("lost the line!:(");
		  leftM.setPower(101);
		  rightM.setPower(101);
		  if (x > 0) {
		  	leftM.setPower(tV);
		    lSpeed.push(tV);
		  } else {
		  	rightM.setPower(tV);
		  	rSpeed.push(tV);
		  }
		  script.wait(30);
		  time += 30;
		  l = leftEnc.readRawData();
		  r = rightEnc.readRawData();
		  
		  lArr.push(l);
	    rArr.push(r);
	    uArr.push(0);
		}
		var x = sens.read()[0];
		print("camera: " + x);
		P = k * x;
		I += ci * x;
		D = cd * (x - oldX);
		u = P + I + D;
		print(I + ", " + P + ", " + D);
		rightM.setPower(min0(100, v - u));
		leftM.setPower(min0(100, v + u));
		script.wait(30);
		time += 30;
		l = leftEnc.readRawData();
		r = rightEnc.readRawData();
		oldX = x;

		lArr.push(l);
	  rArr.push(r);
	  uArr.push(u);
	  lSpeed.push(min0(100, v + u));
	  rSpeed.push(min0(100, v - u));
  }

  script.writeToFile("scripts/trace1.txt", "size = " + lArr.length + "\n");
  script.writeToFile("scripts/trace1.txt", "lArr = [" + lArr + "];\nrArr = [" + rArr + "];\n");
  script.writeToFile("scripts/trace1.txt", "uArr = [" + uArr + "];\n");
  script.writeToFile("scripts/trace1.txt", "lSpeed = [" + lSpeed + "];\nrSpeed = [" + rSpeed + "];\n");
}

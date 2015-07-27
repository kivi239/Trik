var __interpretation_started_timestamp__;
var pi = 3.14159265;
var u;
var k = 0.15;
var ci = 0.03;
var cd = 0.3;
var v = 30;
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
	var timeArr = [];

	var us = [];
	var n = 0;

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
	var t0 = script.time();
	var t = script.time();
	while (time < 50000) {
		while (sens.read()[2] < 5) {
		  print("lost the line :(");
		  var newT = script.time();
		  timeArr.push(newT - t);
		  t = newT;

		  if (x > 0) {
		  	u = v - 10; 
		  	us.push(u);
		  	leftM.setPower(v + us[n]);
		    rightM.setPower(v - us[n]);
		    uArr.push(u);
		  } else {
		    u = -v + 10;
		    us.push(u);
		    leftM.setPower(v + us[n]);
		  	rightM.setPower(v - us[n]);
		  	uArr.push(u);
		  }
		  script.wait(30);
		  time += 30;
		  l = leftEnc.readRawData();
		  r = rightEnc.readRawData();
		  
		  lArr.push(l);
	    rArr.push(r);
	    n++;
		}
		
		var x = sens.read()[0];
		P = k * x;
		I += ci * x;
		D = cd * (x - oldX);
		u = P + I + D;
		us.push(u);
		
		var newT = script.time();
		timeArr.push(newT - t);
		t = newT;
		
		rightM.setPower(min0(100, v - us[n]));
		leftM.setPower(min0(100, v + us[n]));
		n++;
		script.wait(30);
		time += 30;
		l = leftEnc.readRawData();
		r = rightEnc.readRawData();
		oldX = x;

		lArr.push(l);
	  rArr.push(r);
	  uArr.push(u);                                                    
  }

  timeArr.push(script.time() - t);
  leftM.setPower(101);
  rightM.setPower(101);

  print("all time: " + (script.time() - t0));

  script.writeToFile("scripts/trace1.txt", "size = " + lArr.length + "\n");
  script.writeToFile("scripts/trace1.txt", "lArr = [" + lArr + "];\nrArr = [" + rArr + "];\n");
  script.writeToFile("scripts/trace1.txt", "uArr = [" + uArr + "];\n");
  script.writeToFile("scripts/trace1.txt", "timeArr = [" + timeArr + "]\n\n");
}

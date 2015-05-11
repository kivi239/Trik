var __interpretation_started_timestamp__;
var k = 0.5;
var k1 = 0;//1.5;
var v = 50;

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
  var e3 = brick.encoder("B1");
  var e4 = brick.encoder("B2");
  e3.reset();
  e4.reset();

  var leftM = brick.motor(M1);
	var rightM = brick.motor(M2);

  while (true) {
    left = e3.readRawData();
    right = e4.readRawData();
    x = sens.read()[0];
    print(x + " : " + oldx)	
    u = k * x + k1 * (x - oldx);
    rightM.setPower(v - u);
    leftM.setPower(v + u);
    oldx = x;
    script.wait(10);

  }
	
	var leftM = brick.motor(M1);
	var rightM = brick.motor(M2);
	while (true) {
		u = k * brick.lineSensor("video0").read()[0];
		rightM.setPower(25 - u);
		leftM.setPower(25 + u);
		script.wait(30);
	}


}

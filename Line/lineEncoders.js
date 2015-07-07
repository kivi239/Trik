var __interpretation_started_timestamp__;
var k = 0.4;
var k1 = 1.5;
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
    //print(x + " : " + oldx)	
    print(left + ", " + right);
    u = k * x + k1 * (x - oldx);
    rightM.setPower(v - u);
    leftM.setPower(v + u);
    oldx = x;
    script.wait(10);

  }
}

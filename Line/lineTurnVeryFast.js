var __interpretation_started_timestamp__;
var k = 0.8;
var k1 = 2;
var v = 85;
var kturn = 1.0;

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
      print("Lost the line :(");
      print("Last pos: " + oldx);
      if (oldx > 0) {
        print("power left: " + oldx * kturn);
        leftM.setPower(oldx * kturn);
        rightM.setPower(0);
      }
      else {
        leftM.setPower(0);
        rightM.setPower(-oldx * kturn);
      }
      script.wait(10);
      continue;
    } 
    print(x + " : " + oldx)	
    u = k * x + k1 * (x - oldx);
    rightM.setPower(v - u);
    leftM.setPower(v + u);
    oldx = x;
    script.wait(10);
  }

}

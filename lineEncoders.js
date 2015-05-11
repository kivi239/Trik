var __interpretation_started_timestamp__;
var k = 0.5;
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
	
  var oldx = 0;
  var e3 = brick.encoder("B3");
  var e4 = brick.encoder("B4");
  e3.reset();
  e4.reset();

  while (true) {
    left = brick.encoder(B3).readRawData();
    right = brick.encoder(B4).readRawData();
    x = sens.read()[0];
	
    u = k * x + k1 * (x - oldx);
    brick.motor(M3).setPower(v + u);
    brick.motor(M4).setPower(v - u);
    oldx = x;
    script.wait(10);

  }
}

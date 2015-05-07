var __interpretation_started_timestamp__;
var k = 0,5;
var k1 = 2;
var v = 50;

var main = function()
{
	__interpretation_started_timestamp__ = Date.now();

  brick.lineSensor("video1").init(true);
  while (!brick.keys().wasPressed(KeysEnum.Enter)) {
  	script.wait(100);
  }

 	var oldx = 0;

  while (true) {
  	left = brick.encoder(B3).readRawData();
  	right = brick.encoder(B4).readRawData();
  	x = brick.lineSensor("video1")
	
		u = k * x + k1 * (x - oldx);
		brick.motor(M3).setPower(v + u);
		brick.motor(M4).setPower(v - u);
		oldx = x;
		script.wait(30);

	}
}

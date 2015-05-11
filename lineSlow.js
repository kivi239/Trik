var __interpretation_started_timestamp__;
var pi = 3.14159265;
var u;
var k = 0.3;

var main = function()
{
	__interpretation_started_timestamp__ = Date.now();

	brick.lineSensor("video0").init(true);
	while (!brick.keys().wasPressed(KeysEnum.Enter)) {
		script.wait(100);
	}

	brick.lineSensor("video0").detect();
	
	var leftM = brick.motor(M1);
	var rightM = brick.motor(M2);
	while (true) {
		u = k * brick.lineSensor("video0").read()[0];
		rightM.setPower(25 - u);
		leftM.setPower(25 + u);
		script.wait(30);
	}
}

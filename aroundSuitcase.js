var __interpretation_started_timestamp__;  
var k = 0.3;


var main = function()
{
  __interpretation_started_timestamp__ = Date.now();


  brick.keys().buttonPressed.connect(
   	function(code, value) {
   		if (code == KeysEnum.Enter && value == 1) {
   			print("'Enter' pressed, exiting");
   			script.quit();
   		}
   	}
  );


  var idealS = brick.sensor("A1").read();
  brick.motor("M3").setPower(80);
  brick.motor("M4").setPower(75);
  while (true) {
  	var S  = brick.sensor("A1").read();
  	var delta = S - idealS;
  	var speed1 = brick.motor("M4").power() + delta * k;
  	var speed2 = brick.motor("M3").power() - delta * k;
  	brick.motor("M3").setPower(speed1);
  	brick.motor("M4").setPower(speed2);

  }
}


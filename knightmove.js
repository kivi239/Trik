var __interpretation_started_timestamp__;

var main = function() 
{
	__interpretation_started_timestamp__ = Date.now();
	var t = script.time();
	while (script.time() < t + 2000) {
		brick.motor("M3").setPower(80);
		brick.motor("M4").setPower(76);	



	}
	
	t = script.time();
	while (script.time() < t + 1200) {
		brick.motor("M4").setPower(-100);
		brick.motor("M3").setPower(0);		
	}

	t = script.time();
	while (script.time() < t + 1500) {
		brick.motor("M3").setPower(80);
		brick.motor("M4").setPower(76);
	}
	
} 

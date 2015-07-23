var __interpretation_started_timestamp__;

var main = function() 
{
	
	__interpretation_started_timestamp__ = Date.now;

	brick.motor(M3).setPower(80);
	brick.motor(M4).setPower(80);

	while (brick.sensor(A1).read() < 50)
	{
		script.wait(100);	
	}

	brick.motor(M3).powerOff();
	brick.motor(M4).powerOff();


}	
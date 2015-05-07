var __interpretation_started_timestamp__;  
var k = 0.3;


var main = function()
{
  __interpretation_started_timestamp__ = Date.now();

  brick.motor("M3").setPower(49);
  brick.motor("M4").setPower(50);
  script.wait(2000);
  brick.motor("M3").setPower(-49);
  brick.motor("M4").setPower(-50);
  script.wait(2000);
  while (true) {
    brick.motor("M3").setPower(0);
    brick.motor("M4").setPower(0);
  }
}


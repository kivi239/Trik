var __interpretation_started_timestamp__;  
var k = 0.3;


var main = function()
{
  __interpretation_started_timestamp__ = Date.now();
  
  brick.encoder("B3").reset();
  brick.encoder("B4").reset();
  brick.motor("M3").setPower(50);
  brick.motor("M4").setPower(50);
  for (var i = 0; i < 130; i++) {
    script.wait(30);
    script.system("echo " + brick.encoder("B3").read() + ", " + brick.encoder("B4").read() + " >> /scripts/encoders.txt");
  }
  
  while (true) {
    brick.motor("M3").setPower(0);
    brick.motor("M4").setPower(0);
  }

  file.close();
}


var __interpretation_started_timestamp__;  

var k = 0.1;


var main = function()
{
  __interpretation_started_timestamp__ = Date.now();
  
  script.system("rm scripts/encoders.txt");
  var encL = [];
  var encR = [];
  
  brick.encoder("B3").reset();
  brick.encoder("B4").reset();
  brick.motor("M3").setPower(50);
  brick.motor("M4").setPower(50);
  
  while (true) {
    
    //script.system("echo " + brick.encoder("B3").read() + ", " + brick.encoder("B4").read() + " >> scripts/encoders.txt");
    var l = brick.encoder("B3").readRawData();
    var r = brick.encoder("B4").readRawData();
    encL.push(l);
    encR.push(r);
    var diff = l + r;
    //script.system("echo " + diff + " >> scripts/encoders.txt");
    //var speedl = brick.motor("M3").power();
    //var speedr = brick.motor("M4").power();
    brick.motor("M3").setPower(50 - k * diff);
    brick.motor("M4").setPower(50 + k * diff);
    script.wait(20);
  }
}


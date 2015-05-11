var __interpretation_started_timestamp__;  

var k = 0.1;


var main = function()
{
  __interpretation_started_timestamp__ = Date.now();
  
  var encL = [];
  var encR = [];
  
  var e3 = brick.encoder("B2");
  var e4 = brick.encoder("B1");
  e3.reset();
  e4.reset();

  var m3 = brick.motor("M2");
  var m4 = brick.motor("M1");
  m3.setPower(50);
  m4.setPower(50);
  
  var time = 0;
  var l = 0;
  var r = 0;
  while (time < 1600) {
    l = e3.readRawData();
    r = e4.readRawData();
    print(l + " " + r);
    encL.push(l);
    encR.push(r);
    var diff = l + r;
    m3.setPower(50 + k * diff);
    m4.setPower(50 - k * diff);
    script.wait(20);
    time += 20;
  }
  print("here");
  while (l <= 0 && r >= 0) {
    l = e3.readRawData();
    r = e4.readRawData();
    var diff = l + r;
    m3.setPower(-50 + k * diff);
    m4.setPower(-50 - k * diff);
    script.wait(20);
  }
}


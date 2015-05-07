var __interpretation_started_timestamp__;  

var k = 1.0;
var period = 100;

var main = function()
{
  __interpretation_started_timestamp__ = Date.now();
  
  var encL = [];
  var encR = [];
  
  var e3 = brick.encoder("B3");
  var e4 = brick.encoder("B4");
  e3.reset();
  e4.reset();

  var m3 = brick.motor("M3");
  var m4 = brick.motor("M4");
  m3.setPower(50);
  m4.setPower(50);
  
  var time = 0;
  var l = 0;
  var r = 0;
  while (time < 4500) {
    l = e3.readRawData();
    r = e4.readRawData();
    encL.push(l);
    encR.push(r);
    var diff = l + r;
    print(k * diff);
    m3.setPower(50 - k * diff);
    m4.setPower(50 + k * diff);
    script.wait(period);
    time += period;
  }

  print("\n");
  while (l >= 0 && r <= 0) {
    l = e3.readRawData();
    r = e4.readRawData();
    var diff = l + r;
    print(l);
    if (l < 200) {
        m3.setPower(abs(l) * 0.01 * (-50 - k * diff));
        m4.setPower(abs(l) * 0.01 * (-50 + k * diff));
    } else {
        m3.setPower(-50 - k * diff);
        m4.setPower(-50 + k * diff);
    }
    script.wait(period);
  }
}


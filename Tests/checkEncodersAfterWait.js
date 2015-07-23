var __interpretation_started_timestamp__;
var v = 50;                
var retPeriod = 10;
var diffEncs = 200;

/*function returnToTheLine(left, right) {
  var K = 0.1;
  
  var leftEnc = brick.encoder("B1");
  var rightEnc = brick.encoder("B1");

  var leftM = brick.motor(M1);
	var rightM = brick.motor(M1);

  var l = leftEnc.readRawData();  
  var r = rightEnc.readRawData();
  var diffl = l - left;
  var diffr = right - r;
  var c = diffl * 1.0 / diffr;

  while (l > left && r < right) {
    l = leftEnc.readRawData();
    r = rightEnc.readRawData();
    var diff = l + r * c;
    rightM.setPower(-v + K * diff);
    leftM.setPower((-v - K * diff) / c);
    
    script.wait(10);
  } 
} */

function moveBack(left, right, l, r) {
  var K = 0.75;
  var v1 = 60;
  var int = 0;
  var ci = 0.05;
  var sV = 30;

  var leftEnc = brick.encoder("B4");
  var rightEnc = brick.encoder("B3");

  var leftM = brick.motor(M4);
	var rightM = brick.motor(M3);

	leftM.setPower(101);
	rightM.setPower(101);

  var l = leftEnc.readRawData();  
  var r = rightEnc.readRawData();
  
  var diffl = l - left;
  var diffr = right - r;
  var cl = 0, cr = 0;
    
  if (diffl < diffr) { 
    cl = diffl * 1.0 / diffr;
    cr = 1;
  } else {
  	cl = 1;
  	cr = diffr * 1.0 / diffl;
  } 

  print("coeff: " + cl + ", " + cr);

  while (l > left && r < right) {
    l = leftEnc.readRawData();
    r = rightEnc.readRawData();
    diffl = l - left;
    diffr = r - right;
    var diff = diffl * cr + diffr * cl;
    print("diff: " + diff);

    //int += ci * diff;
   // print("integral:" + int);
    var u = K * diff + int;
   // print("left - " + (-v1 - u) + ", right - " + (-v1 + u));

    if (l - left + right - r <= diffEncs) {
      rightM.setPower((-v1 + u) / 2);
      leftM.setPower((-v1 - u) / 2);
    } else {
      rightM.setPower(-v1 + u);
      leftM.setPower(-v1 - u);
    }
    script.wait(retPeriod);
    l = leftEnc.readRawData();
    r = rightEnc.readRawData();
    //print("enc: " + l + ", " + r);
  }

  leftM.setPower(101);
  rightM.setPower(101);
  print("here");
  while (l > left) {
    if (l - left <= diffEncs)
    	leftM.setPower(-sV);
    else
      leftM.setPower(-v1);
    script.wait(retPeriod);
    l = leftEnc.readRawData();
  } 
  while (r < right) {
    if (right - r <= diffEncs)
    	rightM.setPower(-sV);
    else
      rightM.setPower(-v1);
    script.wait(retPeriod);
    r = rightEnc.readRawData();
  } 
  print("final enc: " + l + ", " + r);

  leftM.setPower(0);
  rightM.setPower(101);
  script.wait(1000);
  l = leftEnc.readRawData();
  r = rightEnc.readRawData();

  print("final enc: " + l + ", " + r);
} 

var main = function()
{
  __interpretation_started_timestamp__ = Date.now();

  var leftEnc = brick.encoder("B4");
  var rightEnc = brick.encoder("B3");
  
  leftEnc.reset();
  rightEnc.reset();
  
  var leftM = brick.motor(M4);
	var rightM = brick.motor(M3);

  rightM.setPower(90);
  leftM.setPower(30);
  script.wait(3000);
  
  var l = leftEnc.readRawData();
  var r = rightEnc.readRawData();
  print("encoders:                " + l + ", " + r);

  rightM.setPower(101);
  leftM.setPower(101);
  
  l = leftEnc.readRawData();
  r = rightEnc.readRawData();
  print("encoders after setPower: " + l + ", " + r);

  script.wait(1000);
  
  var l1 = leftEnc.readRawData();
  var r1 = rightEnc.readRawData();
  print("encoders after wait:     " + l + ", " + r);

  moveBack(0, 0, l, r);
}

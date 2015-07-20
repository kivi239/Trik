var __interpretation_started_timestamp__;
var k = 0;
var k1 = 0;
var v = 70;
var kturn = 0.8;
var retPeriod = 30;
var diffEncs = 30;	
var leftArr = [];
var rightArr = [];

function min0(a, b) {
  if (a < 0 || b < 0)
  	return 0;
  if (a < b)
  	return a;
  return b;
}

function move(left, right) {
  var K = 0.6;
  var v1 = 60;
  var int = 0;
  var ci = 0.05;
  var sV = 50;

  var leftEnc = brick.encoder("B4");
  var rightEnc = brick.encoder("B3");

  var leftM = brick.motor(M4);
	var rightM = brick.motor(M3);

	//leftM.setPower(101);
	//rightM.setPower(101);

  var l = leftEnc.readRawData();  
  var r = rightEnc.readRawData();
  
  var diffl = left - l;
  var diffr = r - right;
  var cl = 0, cr = 0;
    
  if (diffl < diffr) { 
    cl = diffl * 1.0 / diffr;
    cr = 1;
  } else {
  	cl = 1;
  	cr = diffr * 1.0 / diffl;
  } 

  while (l < left && r > right) {
    l = leftEnc.readRawData();
    r = rightEnc.readRawData();
    diffl = left - l;
    diffr = right - r;
    var diff = diffl * cr + diffr * cl;

    var u = K * diff + int;

    rightM.setPower(min0(100, v1 - u));
    leftM.setPower(min0(100, v1 + u));
    
    script.wait(retPeriod);
    l = leftEnc.readRawData();
    r = rightEnc.readRawData();
    leftArr.push(l);
    rightArr.push(r);
  }

  while (l < left) {
    rightM.setPower(0);
    if (l - left <= diffEncs)
    	leftM.setPower(sV);
    else
      leftM.setPower(v1);
    script.wait(retPeriod);
    l = leftEnc.readRawData();
    leftArr.push(l);
    rightArr.push(rightEnc.readRawData());
  } 
  while (r > right) {
	  leftM.setPower(0);
    if (right - r <= diffEncs)
    	rightM.setPower(sV);
    else
      rightM.setPower(v1);
    script.wait(retPeriod);
    r = rightEnc.readRawData();
    rightArr.push(r);
    leftArr.push(leftEnc.readRawData());
  } 
  //leftM.setPower(0);
  //rightM.setPower(0);
} 

function moveStraight(left, right) {
  var K = 0.7;
  var v1 = 70;
  var int = 0;
  var ci = 0.7;

  var leftEnc = brick.encoder("B4");
  var rightEnc = brick.encoder("B3");

  var leftM = brick.motor(M4);
	var rightM = brick.motor(M3);

	leftM.setPower(0);
	rightM.setPower(0);

  var l = leftEnc.readRawData();  
  var r = rightEnc.readRawData();
  var diffl = l - left;
  var diffr = r - right;

  while (l < left && r > right) {
    l = leftEnc.readRawData();
    r = rightEnc.readRawData();
    diffl = left - l;
    diffr = right - r;
    var diff = diffl + diffr;

    int += ci * diff;
    var u = K * diff + int;
    rightM.setPower(v1 - u);
    leftM.setPower(v1 + u);
    
    script.wait(retPeriod);
    l = leftEnc.readRawData();
    r = rightEnc.readRawData();
  } 

  leftM.setPower(0);
  rightM.setPower(0);
} 

function stop() {
  print("Stopped!");
  var leftM = brick.motor(M1);
	var rightM = brick.motor(M2);

	while (true) {
	  leftM.setPower(0);
	  rightM.setPower(0);
	}
}
  
var main = function()
{
  __interpretation_started_timestamp__ = Date.now();
  print("Hello");

  var leftEnc = brick.encoder("B4");
  var rightEnc = brick.encoder("B3");
  leftEnc.reset();
  rightEnc.reset();

  var leftM = brick.motor(M4);
	var rightM = brick.motor(M3);

	//var lArr = [0,0,0,0,0,4,23,45,72,95,124,164,193,223,239,244,249,267,307,334,366,401,448,480,501,508,512,514,535,572,596,623,641,660,682,707,735,763,786,801,818,838,874,921,954,985,1011,1037,1057,1080,1101,1123,1141,1168,1196,1226,1250,1278,1304,1329,1363,1390,1413,1434,1452,1468,1493,1524,1549,1580,1615,1654,1685,1710,1734,1769,1799,1827,1850,1876,1904,1933,1964,1991,2020,2046,2071,2096,2122,2149,2177,2205,2234,2263,2292,2316,2342,2366,2398,2430,2460,2493,2520,2547,2575,2603,2629,2658,2684,2713,2744,2774,2801,2833,2872,2908,2946,2972,2990,3008,3028,3046,3061,3076,3086,3093,3109,3134,3164,3187,3217,3252,3288,3337,3377,3421,3465,3503,3541,3577,3608,3639,3669,3685,3688,3688,3688,3688,3693,3718,3755,3815,3874,3911,3944,3958,3961,3963,3963,3967,3985,4023,4070,4120,4155,4183,4210,4235,4262,4297,4325,4360,4386,4419,4451,4475,4499,4520,4540,4554,4570,4588,4610,4636,4661,4688,4711,4735,4760,4783,4806,4833,4858,4883,4903,4931,4952,4979,4999,5018,5035,5053,5072,5097,5123,5145,5171,5192,5212,5227,5248,5269,5297,5332,5361,5385,5402,5422,5437,5455,5471,5487,5505,5526,5542,5564,5588,5608,5631,5655,5679,5708,5733,5760,5783,5809,5834,5860,5885,5909,5932,5942,5945,5949,5949,5949,5949,5949,5949,5949,5949,5949,5949,5949,5949,5949,5949,5949,5949,5949,5949,5949,5949,5949,5949,5949,5949,5949,5949,5949,5949,5949,5949,5949,5952,5970,5989,6023,6034,6035,6035,6036,6036,6036];
  //var rArr = [-4,-12,-25,-38,-56,-85,-109,-119,-123,-125,-125,-128,-143,-165,-203,-243,-290,-336,-367,-378,-384,-387,-390,-409,-448,-481,-521,-573,-612,-650,-663,-670,-673,-674,-677,-689,-708,-736,-772,-806,-843,-870,-901,-933,-958,-988,-1012,-1041,-1067,-1092,-1114,-1134,-1150,-1174,-1200,-1234,-1262,-1296,-1322,-1343,-1372,-1401,-1432,-1465,-1499,-1527,-1562,-1590,-1610,-1632,-1658,-1688,-1714,-1737,-1753,-1774,-1802,-1835,-1866,-1895,-1918,-1942,-1967,-1988,-2011,-2034,-2056,-2080,-2103,-2128,-2151,-2175,-2198,-2220,-2240,-2256,-2273,-2286,-2302,-2315,-2334,-2361,-2390,-2415,-2437,-2458,-2475,-2495,-2512,-2531,-2552,-2573,-2590,-2611,-2636,-2657,-2678,-2691,-2695,-2698,-2698,-2698,-2698,-2698,-2698,-2698,-2703,-2716,-2732,-2746,-2763,-2782,-2797,-2811,-2819,-2824,-2833,-2843,-2858,-2871,-2885,-2899,-2915,-2929,-2945,-2967,-2989,-3011,-3043,-3062,-3073,-3075,-3077,-3091,-3109,-3127,-3145,-3165,-3193,-3232,-3255,-3275,-3289,-3296,-3302,-3319,-3340,-3364,-3388,-3412,-3430,-3449,-3467,-3491,-3514,-3535,-3558,-3578,-3607,-3633,-3658,-3684,-3712,-3734,-3749,-3765,-3785,-3807,-3831,-3852,-3872,-3896,-3919,-3938,-3957,-3980,-3999,-4026,-4053,-4085,-4117,-4148,-4174,-4198,-4220,-4239,-4269,-4303,-4343,-4370,-4407,-4436,-4461,-4489,-4510,-4530,-4552,-4576,-4597,-4622,-4644,-4662,-4684,-4705,-4721,-4743,-4768,-4792,-4818,-4847,-4877,-4912,-4942,-4974,-5001,-5034,-5065,-5094,-5124,-5150,-5178,-5193,-5209,-5230,-5251,-5266,-5281,-5296,-5307,-5316,-5325,-5334,-5344,-5353,-5365,-5376,-5388,-5398,-5412,-5424,-5439,-5450,-5460,-5471,-5482,-5493,-5508,-5524,-5540,-5553,-5568,-5585,-5603,-5624,-5664,-5690,-5709,-5727,-5734,-5733,-5734,-5734,-5734,-5734];
  //var lArr = [0,0,0,0,5,27,44,67,86,122,161,193,216,222,224,225,226,239,264,308,357,404,443,472,486,493,496,497,499,516,555,587,622,656,692,719,731,734,736,753,784,822,860,888,909,917,921,922,928,955,983,1007,1028,1048,1076,1112,1141,1155,1157,1161,1180,1206,1245,1295,1335,1365,1388,1397,1398,1398,1401,1414,1449,1497,1539,1568,1581,1584,1585,1587,1602,1631,1663,1696,1723,1739,1758,1779,1795,1819,1849,1873,1905,1932,1951,1961,1970,1986,2004,2031,2070,2114,2147,2169,2183,2201,2220,2248,2271,2296,2318,2342,2371,2392,2408,2421,2435,2455,2490,2526,2562,2589,2618,2642,2667,2694,2728,2770,2810,2847,2887,2910,2933,2947,2962,2972,2986,2996,3007,3014,3031,3049,3074,3102,3132,3153,3172,3188,3206,3231,3263,3310,3359,3396,3431,3464,3504,3542,3573,3607,3640,3671,3696,3726,3754,3781,3804,3826,3850,3873,3894,3913,3932,3958,3984,4011,4041,4070,4103,4123,4142,4156,4170,4189,4210,4238,4269,4296,4320,4341,4366,4390,4416,4442,4463,4488,4509,4530,4551,4574,4592,4610,4630,4650,4676,4701,4724,4748,4772,4794,4814,4842,4870,4897,4925,4946,4968,4990,5014,5036,5053,5069,5097,5128,5167,5208,5241,5266,5280,5285,5292,5309,5334,5367,5403,5434,5461,5483,5499,5507,5514,5534,5562,5598,5634,5662,5683,5687,5698,5720,5756,5795,5834,5869,5895,5916,5933,5952,5974,5992,5995,5996,5996,5996,5996,5996,5996,5996,5996,5996,5996,5996,5996,5996,5996,5996,5996,5996,5996,5996,5996,5996,5996,5996,5996,5996,5996,5997,5997,5997,5997,5997,5999];
  //var rArr = [-4,-12,-27,-49,-76,-93,-99,-100,-100,-105,-112,-129,-159,-182,-212,-237,-265,-291,-310,-326,-336,-349,-378,-412,-439,-471,-495,-526,-577,-614,-632,-638,-640,-643,-657,-677,-714,-751,-787,-817,-830,-838,-844,-859,-886,-907,-937,-972,-1017,-1049,-1063,-1068,-1070,-1070,-1070,-1074,-1105,-1152,-1196,-1226,-1256,-1277,-1290,-1300,-1315,-1341,-1374,-1405,-1429,-1453,-1477,-1499,-1515,-1519,-1523,-1541,-1571,-1603,-1640,-1684,-1723,-1741,-1750,-1753,-1756,-1764,-1789,-1819,-1847,-1869,-1886,-1892,-1895,-1910,-1941,-1975,-2008,-2040,-2058,-2068,-2072,-2080,-2098,-2126,-2177,-2217,-2241,-2257,-2263,-2266,-2266,-2268,-2277,-2291,-2316,-2349,-2376,-2397,-2415,-2423,-2433,-2451,-2475,-2501,-2528,-2554,-2582,-2607,-2631,-2646,-2665,-2675,-2681,-2684,-2687,-2689,-2689,-2689,-2689,-2689,-2690,-2703,-2719,-2735,-2751,-2759,-2763,-2766,-2768,-2768,-2769,-2779,-2795,-2812,-2832,-2853,-2875,-2897,-2913,-2932,-2952,-2971,-2988,-3009,-3030,-3051,-3071,-3092,-3118,-3145,-3168,-3189,-3211,-3239,-3266,-3287,-3308,-3329,-3352,-3364,-3369,-3372,-3373,-3374,-3380,-3395,-3413,-3430,-3448,-3463,-3482,-3499,-3517,-3538,-3555,-3578,-3597,-3617,-3637,-3661,-3680,-3698,-3715,-3730,-3749,-3764,-3781,-3799,-3817,-3835,-3852,-3878,-3903,-3930,-3956,-3979,-4002,-4024,-4049,-4077,-4116,-4155,-4202,-4231,-4249,-4263,-4285,-4316,-4368,-4420,-4455,-4487,-4511,-4531,-4543,-4554,-4569,-4588,-4619,-4657,-4693,-4721,-4738,-4753,-4769,-4797,-4839,-4888,-4938,-4971,-4995,-5016,-5042,-5067,-5097,-5126,-5154,-5185,-5210,-5230,-5251,-5270,-5291,-5309,-5327,-5339,-5352,-5364,-5376,-5387,-5399,-5411,-5422,-5432,-5445,-5459,-5474,-5487,-5502,-5517,-5530,-5542,-5552,-5564,-5576,-5588,-5600,-5613,-5623,-5635,-5647,-5661,-5678];
  var lArr = [0,0,0,0,0,3,14,30,53,78,109,132,156,175,189,201,214,224,235,247,256,265,272,281,289,298,308,319,329,339,351,360,370,380,389,399,406,420,434,446,456,468,479,490,502,512,528,540,553,566,579,594,607,618,628,641,651,659,670,679,686,696,703,712,718,727,734,741,748,757,768,779,790,803,814,826,838,851,863,877,889,901,918,934,951,965,985,998,1013,1026,1043,1058,1076,1087,1099,1113,1128,1142,1151,1164,1175,1185,1195,1206,1214,1223,1230,1239,1246,1255,1262,1270,1278,1287,1295,1307,1318,1328,1340,1353,1365,1380,1392,1403,1414,1429,1441,1454,1467,1479,1490,1500,1509,1521,1529,1537,1546,1553,1563,1571,1580,1588,1596,1604,1613,1625,1636,1648,1663,1675,1691,1701,1714,1729,1743,1761,1773,1786,1803,1818,1828,1839,1851,1860,1869,1880,1887,1898,1906,1913,1922,1932,1939,1948,1957,1967,1976,1988,1997,2006,2017,2029,2040,2053,2066,2080,2096,2111,2132,2148,2165,2179,2195,2221,2236,2257,2271,2286,2299,2313,2330,2342,2355,2370,2388,2398,2408,2421,2431,2446,2457,2473,2489,2504,2523,2537,2548,2561,2572,2584,2595,2607,2621,2637,2652,2666,2682,2694,2714,2728,2748,2762,2776,2791,2805,2822,2842,2857,2875,2893,2910,2926,2942,2963,2981,2998,3016,3034,3058,3080,3101,3119,3135,3156,3174,3194,3210,3228,3250,3270,3287,3307,3323,3345,3364,3379,3396,3414,3430,3449,3472,3489,3504,3520,3536,3552,3569,3583,3597,3609,3622,3633,3643,3652,3660,3669,3678,3687,3696,3705,3717,3726,3735,3746,3755,3764,3776,3787,3797,3809,3820,3833,3848,3865,3878,3894,3913,3948,3981,4010,4037,4050,4063,4077,4088,4101,4112,4124,4136,4152,4165,4178,4190,4205,4217,4236,4249,4264,4275,4285,4299,4314,4325,4340];
  var rArr = [-6,-19,-40,-63,-96,-121,-141,-148,-152,-153,-153,-153,-153,-153,-154,-161,-169,-174,-183,-198,-212,-228,-242,-258,-270,-281,-291,-303,-312,-324,-337,-348,-359,-371,-382,-391,-401,-416,-428,-441,-451,-463,-473,-483,-492,-503,-514,-523,-535,-544,-556,-570,-582,-593,-602,-616,-626,-636,-648,-660,-670,-684,-696,-709,-718,-731,-740,-749,-759,-770,-784,-797,-807,-821,-833,-845,-857,-872,-883,-896,-907,-918,-933,-944,-956,-968,-982,-991,-1002,-1012,-1025,-1037,-1054,-1064,-1077,-1092,-1110,-1126,-1138,-1155,-1168,-1181,-1196,-1210,-1222,-1235,-1245,-1259,-1268,-1280,-1290,-1303,-1314,-1323,-1333,-1345,-1355,-1363,-1373,-1382,-1391,-1403,-1411,-1419,-1427,-1438,-1447,-1457,-1467,-1477,-1488,-1499,-1511,-1526,-1537,-1548,-1560,-1571,-1583,-1595,-1606,-1616,-1626,-1637,-1648,-1665,-1679,-1693,-1708,-1719,-1732,-1741,-1749,-1758,-1768,-1777,-1784,-1790,-1798,-1805,-1812,-1821,-1831,-1842,-1852,-1865,-1875,-1888,-1899,-1911,-1923,-1937,-1948,-1961,-1973,-1982,-1992,-2003,-2011,-2020,-2031,-2043,-2053,-2064,-2075,-2085,-2097,-2106,-2119,-2127,-2136,-2144,-2151,-2161,-2168,-2176,-2184,-2194,-2203,-2214,-2228,-2239,-2250,-2264,-2281,-2291,-2301,-2318,-2329,-2346,-2358,-2372,-2384,-2395,-2410,-2420,-2429,-2438,-2446,-2455,-2463,-2471,-2480,-2490,-2500,-2508,-2516,-2524,-2532,-2538,-2547,-2553,-2559,-2566,-2573,-2581,-2591,-2600,-2608,-2618,-2625,-2632,-2640,-2649,-2657,-2663,-2671,-2678,-2685,-2692,-2698,-2703,-2706,-2711,-2715,-2719,-2722,-2727,-2733,-2739,-2745,-2752,-2759,-2767,-2774,-2782,-2789,-2798,-2807,-2818,-2830,-2839,-2847,-2856,-2865,-2875,-2886,-2896,-2906,-2914,-2924,-2934,-2944,-2953,-2963,-2973,-2984,-2994,-3003,-3014,-3027,-3037,-3047,-3059,-3070,-3080,-3094,-3104,-3113,-3124,-3134,-3145,-3159,-3172,-3184,-3193,-3207,-3223,-3230,-3232,-3232,-3234,-3240,-3247,-3253,-3262,-3270,-3280,-3289,-3303,-3313,-3324,-3334,-3345,-3355,-3370,-3380,-3392,-3400,-3407,-3416,-3425,-3432,-3440];

  

  print(lArr.length);

  //var lArr = [100, 200, 400, 800];
  //var rArr = [-100, -200, -400, -800];
  //var lArr = [2000];
  //var rArr = [-2000];

  for (var i = 0; i < lArr.length; i += 7) {
    move(lArr[i], rArr[i]);
  } 

  script.writeToFile("scripts/result_encoders.txt", "size = " + leftArr.length + '\n');
  script.writeToFile("scripts/result_encoders.txt", "leftArr = [" + leftArr + "]\n");
  script.writeToFile("scripts/result_encoders.txt", "rightArr = [" + rightArr + "]\n");

  leftM.setPower(101);
  rightM.setPower(101);
    
  print("end");
}

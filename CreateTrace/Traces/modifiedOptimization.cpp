#include <cstdio>
#include <iostream>
#include <algorithm>
#include <math.h>
#include <algorithm>

using namespace std;

//259
const int size = 436;

//int leftArr[334] = {0,0,0,0,0,0,0,4,12,25,37,51,70,88,106,121,130,138,141,143,144,146,148,150,152,155,161,168,176,184,195,209,221,240,256,268,281,292,305,318,329,339,348,359,368,377,386,395,401,407,414,419,423,425,428,429,430,430,430,431,434,436,439,442,449,457,464,474,484,498,514,531,548,566,580,598,609,618,628,638,649,657,668,677,686,695,702,709,717,724,732,738,743,747,753,760,766,773,779,787,795,804,812,821,830,839,847,855,863,875,883,899,908,918,932,943,954,965,979,987,998,1007,1018,1026,1034,1043,1047,1052,1057,1061,1064,1067,1073,1079,1085,1096,1104,1114,1125,1134,1143,1150,1164,1171,1185,1193,1203,1212,1220,1228,1236,1243,1250,1258,1265,1269,1273,1280,1288,1292,1293,1294,1296,1296,1296,1296,1296,1296,1296,1296,1296,1296,1296,1296,1296,1297,1298,1300,1308,1320,1334,1354,1373,1390,1397,1402,1406,1409,1411,1411,1411,1411,1411,1411,1411,1412,1412,1412,1412,1412,1416,1422,1437,1447,1464,1485,1501,1519,1530,1536,1542,1547,1551,1554,1556,1561,1565,1570,1575,1581,1586,1592,1598,1604,1611,1619,1626,1636,1644,1651,1659,1670,1680,1693,1700,1709,1717,1725,1734,1746,1755,1768,1778,1788,1796,1804,1812,1819,1829,1839,1847,1856,1867,1875,1881,1890,1899,1907,1915,1925,1932,1939,1950,1959,1968,1975,1983,1993,2002,2012,2023,2034,2045,2057,2069,2083,2095,2108,2124,2133,2143,2155,2164,2175,2185,2195,2205,2213,2223,2230,2236,2243,2249,2256,2264,2273,2281,2293,2308,2319,2330,2342,2353,2363,2372,2384,2394,2408,2418,2428,2440,2449,2460,2476,2490,2500,2513,2522,2535,2544,2555,2566,2577,2587,2601,2610,2623,2634,2646,2656,2668,2679,2689,2696};
//int rightArr[334] = {-5,-15,-25,-37,-52,-67,-86,-102,-109,-112,-112,-112,-112,-112,-113,-118,-126,-136,-145,-154,-167,-180,-192,-209,-225,-243,-265,-279,-294,-304,-317,-329,-339,-354,-364,-375,-387,-397,-410,-423,-436,-452,-466,-484,-497,-513,-527,-544,-556,-571,-589,-602,-621,-633,-653,-665,-680,-704,-720,-738,-754,-765,-783,-795,-816,-831,-842,-857,-872,-881,-888,-902,-915,-928,-940,-958,-971,-985,-999,-1014,-1032,-1046,-1064,-1083,-1100,-1116,-1128,-1142,-1156,-1171,-1187,-1202,-1216,-1231,-1246,-1265,-1280,-1293,-1306,-1321,-1336,-1348,-1361,-1374,-1388,-1401,-1413,-1423,-1434,-1448,-1458,-1475,-1485,-1495,-1510,-1522,-1535,-1546,-1563,-1574,-1591,-1605,-1626,-1642,-1656,-1678,-1691,-1707,-1725,-1748,-1765,-1779,-1794,-1809,-1823,-1840,-1852,-1864,-1879,-1889,-1899,-1909,-1921,-1929,-1943,-1951,-1963,-1974,-1985,-1996,-2010,-2022,-2036,-2051,-2071,-2084,-2101,-2119,-2137,-2156,-2172,-2190,-2209,-2227,-2244,-2265,-2282,-2305,-2323,-2338,-2361,-2380,-2400,-2420,-2438,-2454,-2468,-2484,-2494,-2497,-2498,-2498,-2498,-2508,-2519,-2538,-2561,-2574,-2599,-2621,-2644,-2663,-2685,-2700,-2719,-2734,-2756,-2773,-2785,-2798,-2813,-2827,-2834,-2836,-2836,-2836,-2841,-2852,-2864,-2879,-2897,-2920,-2937,-2959,-2980,-3002,-3016,-3033,-3047,-3061,-3074,-3087,-3101,-3113,-3131,-3146,-3160,-3180,-3196,-3209,-3226,-3243,-3259,-3278,-3292,-3308,-3321,-3333,-3347,-3363,-3376,-3395,-3407,-3421,-3433,-3443,-3453,-3463,-3477,-3491,-3503,-3518,-3536,-3549,-3563,-3579,-3595,-3609,-3624,-3640,-3653,-3664,-3682,-3697,-3712,-3723,-3735,-3749,-3761,-3777,-3791,-3803,-3815,-3829,-3840,-3852,-3862,-3872,-3884,-3894,-3904,-3916,-3927,-3940,-3953,-3966,-3979,-3992,-4008,-4023,-4038,-4050,-4062,-4075,-4087,-4099,-4110,-4122,-4137,-4148,-4159,-4170,-4180,-4190,-4199,-4212,-4221,-4237,-4246,-4257,-4268,-4278,-4289,-4305,-4321,-4330,-4344,-4354,-4368,-4377,-4389,-4401,-4414,-4423,-4438,-4448,-4460,-4472,-4486,-4498,-4512,-4519,-4530,-4536};
//int diff[334];

const int d = 15;

int main()
{
	double leftArr[size] = {4,22,39,56,74,99,121,142,166,187,215,238,262,291,313,334,356,380,400,420,438,461,481,497,510,527,548,569,593,614,636,657,689,712,734,754,794,814,837,870,891,913,943,966,990,1028,1052,1076,1107,1130,1160,1185,1209,1236,1258,1280,1302,1327,1349,1371,1401,1426,1444,1468,1488,1504,1524,1545,1565,1585,1606,1625,1646,1667,1693,1716,1736,1762,1785,1808,1833,1865,1890,1915,1952,1976,1996,2027,2051,2071,2091,2121,2141,2162,2183,2208,2230,2252,2273,2294,2318,2338,2359,2381,2400,2419,2446,2466,2488,2507,2526,2545,2570,2591,2612,2631,2650,2668,2693,2710,2727,2744,2762,2778,2805,2825,2847,2867,2885,2905,2924,2945,2962,2978,2994,3011,3027,3041,3056,3078,3097,3116,3133,3149,3167,3183,3196,3213,3228,3240,3254,3269,3282,3297,3310,3323,3342,3359,3378,3397,3416,3436,3454,3478,3498,3515,3533,3549,3564,3580,3598,3612,3628,3642,3657,3672,3685,3699,3711,3722,3738,3748,3759,3772,3784,3796,3809,3823,3836,3850,3863,3880,3895,3908,3918,3927,3934,3942,3954,3971,3989,4008,4024,4044,4066,4083,4102,4117,4132,4147,4161,4181,4197,4213,4229,4242,4253,4261,4269,4280,4292,4305,4319,4335,4351,4368,4391,4407,4423,4439,4454,4469,4493,4511,4530,4543,4553,4562,4569,4579,4594,4606,4621,4635,4650,4665,4680,4699,4716,4733,4745,4761,4775,4793,4810,4827,4851,4869,4889,4908,4925,4949,4966,4985,5005,5021,5040,5056,5075,5092,5118,5137,5158,5178,5197,5223,5244,5261,5277,5303,5318,5330,5340,5347,5359,5372,5388,5402,5421,5438,5457,5473,5486,5502,5521,5537,5553,5566,5577,5592,5611,5624,5634,5643,5652,5666,5680,5697,5718,5739,5763,5783,5805,5829,5850,5870,5886,5900,5917,5927,5935,5942,5948,5959,5975,5990,6009,6029,6054,6077,6102,6122,6162,6185,6207,6223,6238,6253,6264,6274,6282,6289,6294,6298,6303,6305,6307,6308,6308,6308,6308,6308,6308,6308,6308,6308,6308,6308,6308,6308,6308,6308,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309,6309};
	double rightArr[size] = {-5,-21,-40,-57,-76,-103,-124,-147,-172,-192,-218,-240,-264,-290,-311,-332,-349,-369,-388,-407,-426,-453,-475,-494,-513,-539,-560,-584,-608,-629,-652,-673,-702,-726,-748,-768,-804,-824,-847,-879,-900,-921,-950,-973,-996,-1032,-1056,-1080,-1113,-1136,-1166,-1192,-1216,-1245,-1267,-1290,-1314,-1340,-1363,-1385,-1416,-1440,-1459,-1487,-1507,-1525,-1552,-1573,-1593,-1612,-1638,-1658,-1679,-1700,-1727,-1750,-1768,-1794,-1815,-1837,-1862,-1892,-1918,-1942,-1978,-2001,-2019,-2047,-2068,-2085,-2101,-2124,-2141,-2160,-2176,-2196,-2216,-2235,-2251,-2265,-2283,-2304,-2321,-2339,-2354,-2367,-2388,-2405,-2424,-2440,-2454,-2469,-2488,-2508,-2524,-2537,-2550,-2560,-2576,-2587,-2595,-2602,-2609,-2615,-2627,-2637,-2653,-2665,-2675,-2685,-2692,-2699,-2705,-2710,-2714,-2717,-2719,-2720,-2720,-2727,-2741,-2756,-2770,-2781,-2792,-2801,-2809,-2816,-2823,-2828,-2832,-2836,-2840,-2842,-2845,-2846,-2854,-2868,-2883,-2901,-2919,-2936,-2950,-2971,-2991,-3005,-3017,-3030,-3041,-3051,-3062,-3070,-3076,-3082,-3086,-3089,-3091,-3093,-3095,-3097,-3097,-3097,-3097,-3097,-3097,-3097,-3097,-3097,-3097,-3097,-3097,-3103,-3116,-3127,-3143,-3159,-3176,-3197,-3216,-3233,-3249,-3262,-3273,-3283,-3290,-3295,-3298,-3301,-3301,-3302,-3302,-3308,-3320,-3333,-3352,-3372,-3393,-3413,-3433,-3455,-3470,-3481,-3490,-3500,-3506,-3512,-3517,-3521,-3523,-3525,-3526,-3526,-3534,-3549,-3567,-3585,-3606,-3627,-3648,-3673,-3688,-3700,-3710,-3717,-3722,-3725,-3726,-3731,-3740,-3753,-3767,-3787,-3804,-3823,-3839,-3852,-3872,-3888,-3904,-3919,-3933,-3949,-3966,-3984,-4005,-4023,-4048,-4070,-4093,-4112,-4146,-4167,-4188,-4206,-4220,-4241,-4253,-4262,-4269,-4286,-4299,-4312,-4327,-4341,-4359,-4378,-4398,-4415,-4444,-4462,-4483,-4501,-4519,-4544,-4564,-4584,-4603,-4622,-4642,-4666,-4685,-4704,-4725,-4743,-4760,-4783,-4801,-4820,-4838,-4855,-4873,-4889,-4909,-4932,-4953,-4973,-4992,-5011,-5036,-5055,-5073,-5089,-5105,-5132,-5153,-5172,-5192,-5209,-5233,-5253,-5278,-5299,-5339,-5364,-5383,-5404,-5424,-5447,-5464,-5484,-5500,-5515,-5531,-5546,-5564,-5577,-5591,-5605,-5618,-5631,-5645,-5659,-5674,-5688,-5703,-5720,-5736,-5753,-5771,-5788,-5805,-5825,-5846,-5863,-5878,-5893,-5908,-5923,-5937,-5953,-5966,-5979,-5992,-6004,-6015,-6029,-6041,-6053,-6073,-6087,-6099,-6102,-6103,-6103,-6104,-6104,-6104,-6104,-6106,-6106,-6106,-6106,-6106,-6106,-6107,-6107,-6107,-6107,-6107,-6107,-6107,-6107,-6107,-6107,-6111,-6112,-6112,-6112,-6112,-6112,-6112,-6112,-6112,-6112,-6112,-6112,-6112,-6112,-6112,-6112,-6112,-6112,-6112,-6113,-6113,-6113,-6113,-6113,-6115,-6115,-6115,-6115,-6115,-6115,-6115,-6116};

	//double leftArr[size] = {0,0,5,16,27,42,54,64,72,79,89,102,112,126,139,152,165,178,190,205,219,235,250,265,284,299,314,330,350,367,383,401,424,444,465,486,510,531,557,576,605,625,646,664,693,713,728,746,762,779,794,811,829,846,864,887,906,927,948,967,990,1010,1032,1050,1068,1090,1107,1127,1147,1166,1188,1206,1224,1240,1257,1274,1290,1306,1319,1336,1350,1365,1385,1403,1421,1440,1457,1482,1501,1521,1547,1568,1587,1603,1625,1644,1661,1677,1697,1718,1737,1755,1778,1797,1815,1832,1846,1868,1884,1902,1918,1940,1957,1974,1989,2007,2023,2039,2056,2077,2095,2113,2133,2152,2173,2190,2207,2224,2241,2257,2272,2291,2307,2324,2339,2355,2368,2382,2400,2414,2430,2446,2462,2487,2506,2526,2546,2563,2587,2605,2623,2641,2657,2680,2695,2711,2727,2741,2755,2769,2789,2805,2822,2836,2850,2862,2875,2891,2906,2921,2937,2951,2964,2977,2991,3004,3020,3033,3045,3057,3069,3083,3095,3106,3119,3131,3143,3160,3174,3189,3205,3221,3234,3249,3263,3277,3294,3307,3320,3332,3344,3356,3367,3379,3391,3402,3416,3429,3444,3461,3476,3493,3509,3524,3544,3560,3578,3596,3612,3626,3644,3664,3679,3696,3716,3732,3749,3767,3793,3811,3830,3846,3870,3889,3909,3931,3949,3967,3986,4008,4027,4043,4057,4072,4086,4100,4114,4132,4146,4159,4171,4183,4195,4214,4230,4246,4262,4279,4295};
	//double rightArr[size] = {-3,-8,-25,-40,-58,-78,-96,-117,-134,-154,-174,-183,-190,-196,-200,-203,-205,-206,-206,-211,-221,-232,-243,-253,-268,-283,-298,-315,-338,-357,-375,-394,-418,-439,-459,-481,-506,-527,-554,-572,-599,-619,-639,-654,-677,-698,-714,-737,-755,-774,-791,-815,-833,-853,-872,-895,-914,-935,-955,-975,-998,-1018,-1038,-1054,-1067,-1085,-1105,-1124,-1144,-1160,-1181,-1199,-1217,-1235,-1257,-1275,-1293,-1310,-1327,-1350,-1366,-1384,-1406,-1423,-1442,-1460,-1476,-1497,-1515,-1534,-1560,-1580,-1600,-1617,-1646,-1666,-1686,-1704,-1732,-1758,-1777,-1795,-1816,-1832,-1847,-1859,-1870,-1885,-1898,-1913,-1924,-1940,-1956,-1971,-1987,-2008,-2024,-2041,-2059,-2082,-2100,-2119,-2138,-2154,-2172,-2191,-2205,-2219,-2230,-2241,-2250,-2264,-2275,-2280,-2284,-2288,-2292,-2295,-2305,-2320,-2335,-2352,-2370,-2398,-2416,-2435,-2453,-2468,-2487,-2503,-2517,-2530,-2540,-2557,-2567,-2573,-2579,-2584,-2589,-2592,-2599,-2609,-2618,-2625,-2632,-2638,-2643,-2653,-2666,-2675,-2683,-2689,-2696,-2701,-2706,-2711,-2715,-2718,-2721,-2723,-2725,-2726,-2726,-2727,-2727,-2727,-2727,-2733,-2745,-2753,-2760,-2769,-2776,-2783,-2789,-2794,-2801,-2805,-2809,-2812,-2814,-2816,-2818,-2818,-2819,-2819,-2824,-2837,-2849,-2864,-2877,-2888,-2898,-2905,-2919,-2933,-2945,-2956,-2964,-2971,-2982,-2998,-3009,-3017,-3031,-3046,-3061,-3079,-3106,-3125,-3145,-3161,-3183,-3201,-3219,-3238,-3253,-3267,-3279,-3295,-3304,-3312,-3319,-3325,-3330,-3334,-3338,-3342,-3345,-3347,-3349,-3351,-3351,-3358,-3372,-3386,-3402,-3420,-3436};
	//double leftArr[size] = {2,6,14,21,28,35,42,51,62,73,85,98,108,122,132,144,154,164,177,188,198,208,218,230,240,251,262,272,282,293,307,318,327,339,350,359,370,381,392,401,413,424,433,444,457,466,476,485,494,503,515,524,533,545,555,565,576,586,597,605,614,622,630,640,650,659,669,680,689,702,712,725,735,747,758,768,781,792,803,815,829,842,854,864,876,890,901,912,922,931,946,957,968,981,991,1003,1013,1021,1030,1041,1049,1057,1068,1075,1082,1091,1099,1108,1117,1125,1135,1146,1154,1161,1169,1175,1184,1191,1202,1209,1217,1228,1236,1246,1258,1267,1277,1288,1297,1311,1323,1335,1345,1355,1366,1381,1393,1405,1419,1430,1442,1453,1464,1473,1484,1493,1503,1513,1525,1537,1549,1562,1573,1584,1592,1599,1611,1621,1630,1642,1651,1662,1674,1687,1698,1711,1721,1734,1743,1756,1764,1776,1787,1797,1810,1821,1834,1846,1856,1866,1878,1887,1896,1906,1914,1923,1933,1946,1959,1973,1997,2018,2041,2061,2082,2100,2118,2134,2148,2164,2173,2183,2191,2199,2207,2214,2224,2234,2250,2269,2290,2310,2330,2349,2372,2391,2414,2430,2442,2451,2462,2470,2481,2489,2500,2509,2520,2533,2546,2563,2582,2603,2619,2640,2656,2671,2683,2696,2709,2721,2740,2761,2780,2798,2814,2830,2846,2863,2879,2891,2904,2918,2933,2945,2962,2977,2992,3006,3024,3039,3053,3070,3087,3103,3118,3140,3158,3175,3196,3216,3231,3247,3266,3282,3297,3312,3331,3347,3360,3377,3391,3411,3425,3440,3450,3463,3473,3485,3494,3503,3514,3525,3537,3551,3564,3580,3597,3613,3626,3641,3656,3671,3686,3704,3722,3738,3756,3775,3791,3805,3823,3840,3856,3871,3886,3902,3915,3928,3945,3961,3980,3994,4009,4027,4040,4054,4072,4088,4104,4121,4138,4151,4169,4185,4198,4214,4227,4239,4251,4263,4278,4291,4307,4318,4329,4342,4357,4367,4378,4391,4402,4414,4424,4437,4450,4462,4478,4491,4504,4517,4532,4550,4564,4577,4591,4604,4620,4638,4658,4678,4692,4708,4724,4739,4758,4771,4783,4795,4809,4822,4834,4848,4859,4870,4878,4887,4895,4904,4912,4921,4932,4940,4949,4955,4964,4972,4982,4993,5003,5012};
	//double rightArr[size] = {-6,-12,-18,-25,-34,-45,-55,-65,-77,-88,-99,-112,-122,-132,-142,-150,-158,-167,-177,-186,-195,-203,-212,-221,-230,-242,-251,-261,-270,-282,-296,-308,-319,-332,-345,-356,-369,-382,-394,-405,-417,-427,-436,-447,-459,-468,-478,-486,-495,-503,-515,-525,-536,-546,-558,-567,-578,-589,-601,-610,-623,-632,-642,-654,-663,-673,-682,-692,-701,-713,-723,-736,-747,-759,-771,-782,-793,-803,-813,-825,-839,-852,-864,-874,-886,-901,-911,-923,-935,-944,-958,-969,-982,-993,-1004,-1013,-1023,-1031,-1041,-1049,-1057,-1065,-1076,-1084,-1091,-1101,-1110,-1119,-1128,-1137,-1146,-1158,-1167,-1175,-1185,-1194,-1206,-1215,-1227,-1235,-1243,-1251,-1259,-1268,-1279,-1287,-1296,-1306,-1316,-1328,-1338,-1350,-1359,-1369,-1379,-1394,-1406,-1419,-1434,-1447,-1460,-1474,-1488,-1500,-1514,-1526,-1537,-1548,-1560,-1571,-1581,-1593,-1602,-1612,-1621,-1631,-1642,-1652,-1661,-1671,-1679,-1687,-1696,-1704,-1712,-1719,-1728,-1738,-1747,-1758,-1766,-1778,-1789,-1801,-1816,-1829,-1842,-1854,-1865,-1875,-1888,-1897,-1909,-1924,-1937,-1953,-1971,-1994,-2014,-2032,-2046,-2051,-2054,-2055,-2055,-2055,-2059,-2070,-2079,-2100,-2117,-2139,-2160,-2180,-2205,-2225,-2243,-2259,-2271,-2276,-2280,-2282,-2282,-2282,-2283,-2285,-2294,-2301,-2311,-2323,-2341,-2359,-2385,-2403,-2425,-2438,-2451,-2459,-2462,-2465,-2467,-2467,-2467,-2469,-2477,-2488,-2501,-2515,-2532,-2547,-2568,-2588,-2602,-2610,-2614,-2617,-2620,-2621,-2621,-2623,-2627,-2634,-2641,-2647,-2658,-2667,-2675,-2682,-2691,-2698,-2704,-2711,-2718,-2724,-2729,-2736,-2741,-2746,-2752,-2756,-2759,-2762,-2766,-2769,-2773,-2776,-2783,-2790,-2797,-2804,-2812,-2824,-2833,-2844,-2853,-2864,-2876,-2890,-2903,-2916,-2928,-2940,-2954,-2970,-2980,-2997,-3012,-3025,-3036,-3046,-3055,-3062,-3065,-3068,-3071,-3071,-3071,-3071,-3076,-3082,-3088,-3098,-3110,-3122,-3135,-3148,-3158,-3168,-3183,-3195,-3209,-3219,-3229,-3242,-3251,-3259,-3270,-3279,-3288,-3298,-3308,-3316,-3327,-3336,-3344,-3354,-3363,-3371,-3380,-3389,-3399,-3410,-3421,-3430,-3440,-3451,-3464,-3474,-3486,-3496,-3508,-3519,-3531,-3541,-3553,-3563,-3577,-3587,-3597,-3607,-3618,-3631,-3642,-3651,-3660,-3669,-3680,-3690,-3703,-3715,-3725,-3734,-3745,-3755,-3767,-3775,-3783,-3791,-3801,-3810,-3818,-3830,-3839,-3848,-3856,-3866,-3875,-3886,-3897,-3908,-3921,-3934,-3945,-3956,-3971,-3985,-4002,-4017,-4028,-4037};
	double diff[size];

	for (int i = 0; i < size; i++)
		diff[i] = leftArr[i] + rightArr[i];

	int monSize = 0;

	int mon[size];

	if (diff[0] < diff[1])
		mon[0] = 1;
	else
		mon[0] = -1;

	for (int i = 0; i < size; i++)
	{
		if (diff[i] == diff[i + 1])
			mon[i] = 0;

		if (diff[i] < diff[i + 1])
			if (mon[monSize] < 0)
			{
				monSize++;
				mon[monSize] = 1;
			}
			else
				mon[monSize]++;

		if (diff[i] > diff[i + 1])
			if (mon[monSize] > 0)
			{
				monSize++;
				mon[monSize] = -1;
			}
			else
				mon[monSize]--;
	}

	int tmp = 0;

	int i = 0;
	int j = abs(mon[tmp]) + abs(mon[tmp + 1]);

	while (tmp < monSize - 3)
	{
		if (abs(mon[tmp]) > 30 || abs(mon[tmp + 1]) > 30)
			//if (false)
		{
			i = j;

			j += abs(mon[tmp + 2]) + abs(mon[tmp + 3]);

			tmp = tmp + 2;

		}
		else
		{
			for (int k = i + 1; k < j; k++)
			{
				leftArr[k] = leftArr[i] + (leftArr[j] - leftArr[i]) * (k - i) / (j - i);
				rightArr[k] = rightArr[i] + (rightArr[j] - rightArr[i]) * (k - i) / (j - i);
			}

			/*double lengthOfPolygon = 0;

			for (int k = i; k < j; k++)
			{
				lengthOfPolygon += sqrt((leftArr[k] - leftArr[k + 1]) * (leftArr[k] - leftArr[k + 1]) + (rightArr[k + 1] - rightArr[k]) * (rightArr[k + 1] - rightArr[k]));
			}

			double lengthOfLine = sqrt((leftArr[i] - leftArr[j]) * (leftArr[i] - leftArr[j]) + (rightArr[i] - rightArr[j]) * (rightArr[i] - rightArr[j]));

			double koef = lengthOfLine  / lengthOfPolygon;

			if (koef >= 1)
				break;

			double oldL = leftArr[j];
			double oldR = rightArr[j];

			leftArr[j] = leftArr[j] * koef;
			rightArr[j] = rightArr[j] * koef;

			double diffL = oldL - leftArr[j];
			double diffR = oldR - rightArr[j];

			for (int k = j + 1; k < size; k++)
			{
				leftArr[k] = leftArr[k] - diffL;
				rightArr[k] = rightArr[k]  - diffR;
			}

			for (int k = i + 1; k < j; k++)
			{
				leftArr[k] = leftArr[i] + (leftArr[j] - leftArr[i]) * (k - i) / (j - i);
				rightArr[k] = rightArr[i] + (rightArr[j] - rightArr[i]) * (k - i) / (j - i);

			}*/

			i = j;

			j += abs(mon[tmp + 2]) + abs(mon[tmp + 3]);

			tmp = tmp + 2;

		}
	}

	freopen("super_opt_encoders.txt", "w", stdout);
	printf("var lArr = [");
	for (int i = 0; i < size; i++)
		printf((i ==  size - 1  ? "%.5lf" : "%.5lf, "), leftArr[i]);
	printf("]\n");

	printf("var rArr = [");
	for (int i = 0; i < size; i++)
		printf((i == size - 1 ? "%.5lf" : "%.5lf, "), rightArr[i]);
	printf("]\n");

	return 0;
}

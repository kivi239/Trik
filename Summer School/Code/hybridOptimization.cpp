#include <cstdio>
#include <iostream>
#include <algorithm>

#include "cubic_spline.h"

using namespace std;


int main()
{
	const int size = 515;
	const int d = 15;

	double leftArr[size] = {3,11,20,27,36,47,58,74,87,103,119,130,141,154,169,181,197,211,224,238,248,260,270,281,293,305,317,328,339,350,361,371,380,391,399,409,417,426,435,446,454,467,478,489,502,514,526,537,549,562,576,587,598,609,624,635,649,662,676,686,698,710,724,738,752,768,780,792,806,819,829,840,852,860,871,882,893,903,916,926,936,946,956,965,975,992,1003,1015,1024,1035,1043,1053,1062,1071,1080,1089,1097,1107,1117,1126,1139,1149,1161,1172,1186,1196,1208,1220,1234,1246,1262,1271,1286,1299,1313,1323,1335,1346,1357,1367,1376,1385,1393,1403,1411,1419,1425,1432,1438,1446,1454,1465,1474,1482,1490,1502,1513,1522,1537,1550,1564,1581,1594,1604,1617,1630,1644,1654,1665,1676,1686,1699,1711,1722,1734,1747,1758,1773,1783,1798,1811,1822,1833,1846,1856,1869,1880,1890,1901,1911,1923,1939,1948,1962,1972,1986,1995,2007,2020,2036,2049,2060,2073,2086,2101,2113,2124,2138,2154,2165,2182,2194,2205,2220,2237,2250,2275,2290,2305,2327,2346,2361,2383,2401,2419,2437,2458,2483,2501,2525,2538,2557,2572,2593,2608,2627,2641,2656,2672,2691,2705,2723,2739,2758,2771,2791,2807,2827,2845,2864,2883,2906,2930,2955,2971,2989,3006,3021,3044,3064,3085,3105,3127,3152,3168,3188,3207,3226,3246,3269,3284,3303,3319,3333,3350,3374,3389,3405,3423,3438,3457,3472,3490,3509,3528,3548,3572,3590,3613,3638,3658,3678,3703,3719,3736,3758,3784,3801,3817,3836,3853,3870,3880,3883,3885,3886,3886,3889,3898,3910,3937,3957,3986,4010,4039,4070,4095,4115,4134,4145,4150,4154,4154,4154,4154,4161,4174,4190,4216,4239,4262,4281,4300,4317,4336,4358,4376,4394,4405,4424,4437,4455,4465,4468,4471,4472,4475,4483,4491,4513,4536,4558,4578,4602,4626,4650,4666,4677,4689,4696,4700,4702,4711,4716,4723,4734,4749,4763,4782,4808,4825,4851,4866,4878,4893,4905,4914,4923,4937,4946,4954,4964,4973,4981,4992,5000,5011,5021,5032,5042,5061,5073,5088,5103,5126,5140,5154,5171,5187,5200,5214,5225,5239,5252,5265,5274,5283,5285,5286,5287,5287,5287,5289,5296,5303,5316,5328,5347,5359,5373,5388,5399,5409,5420,5429,5440,5449,5457,5467,5476,5489,5502,5512,5522,5534,5547,5557,5568,5583,5596,5609,5626,5642,5661,5681,5698,5715,5731,5749,5761,5773,5783,5792,5800,5805,5811,5817,5823,5826,5829,5832,5834,5837,5842,5852,5861,5873,5887,5902,5915,5931,5946,5965,5979,5996,6013,6028,6044,6057,6073,6088,6102,6117,6130,6142,6155,6162,6165,6168,6170,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6171,6174};
	double rightArr[size] = {-4,-12,-20,-28,-38,-48,-60,-76,-89,-106,-119,-129,-140,-152,-165,-175,-190,-204,-216,-229,-238,-251,-259,-269,-279,-290,-302,-314,-326,-339,-352,-363,-374,-389,-401,-414,-425,-439,-451,-466,-475,-488,-496,-505,-516,-527,-538,-547,-558,-569,-581,-590,-601,-610,-623,-633,-650,-660,-674,-684,-698,-709,-725,-743,-756,-773,-786,-799,-813,-826,-836,-847,-859,-868,-879,-889,-899,-910,-923,-933,-944,-956,-967,-976,-988,-1008,-1020,-1034,-1044,-1056,-1064,-1074,-1083,-1093,-1102,-1110,-1118,-1127,-1136,-1145,-1156,-1165,-1176,-1186,-1198,-1207,-1219,-1231,-1245,-1258,-1273,-1283,-1297,-1310,-1324,-1333,-1347,-1358,-1369,-1380,-1389,-1399,-1409,-1421,-1430,-1440,-1448,-1457,-1465,-1476,-1486,-1500,-1510,-1522,-1531,-1545,-1556,-1565,-1578,-1591,-1602,-1617,-1630,-1638,-1649,-1661,-1672,-1682,-1691,-1700,-1710,-1721,-1731,-1740,-1750,-1761,-1771,-1785,-1796,-1811,-1826,-1839,-1852,-1866,-1878,-1893,-1905,-1916,-1927,-1935,-1946,-1958,-1966,-1977,-1985,-1995,-2002,-2010,-2019,-2031,-2041,-2051,-2062,-2073,-2086,-2096,-2106,-2118,-2132,-2143,-2156,-2166,-2175,-2186,-2199,-2208,-2226,-2237,-2247,-2263,-2275,-2285,-2299,-2312,-2325,-2338,-2354,-2371,-2385,-2402,-2413,-2429,-2440,-2457,-2468,-2482,-2493,-2503,-2515,-2526,-2535,-2546,-2555,-2565,-2575,-2583,-2592,-2601,-2610,-2620,-2628,-2638,-2648,-2657,-2664,-2670,-2677,-2682,-2690,-2697,-2705,-2713,-2721,-2732,-2738,-2745,-2752,-2760,-2769,-2780,-2787,-2799,-2809,-2817,-2828,-2843,-2853,-2864,-2876,-2887,-2899,-2909,-2921,-2935,-2947,-2960,-2974,-2985,-2998,-3010,-3018,-3024,-3031,-3035,-3038,-3041,-3043,-3045,-3051,-3057,-3062,-3069,-3079,-3094,-3113,-3135,-3157,-3173,-3190,-3203,-3213,-3217,-3218,-3218,-3218,-3218,-3219,-3224,-3232,-3240,-3261,-3280,-3304,-3323,-3349,-3375,-3394,-3408,-3421,-3430,-3432,-3432,-3432,-3432,-3432,-3435,-3441,-3449,-3456,-3466,-3476,-3487,-3506,-3524,-3545,-3567,-3590,-3605,-3616,-3630,-3637,-3640,-3642,-3642,-3643,-3649,-3659,-3668,-3679,-3690,-3709,-3724,-3742,-3761,-3779,-3794,-3804,-3811,-3814,-3815,-3816,-3823,-3831,-3840,-3854,-3867,-3880,-3894,-3916,-3928,-3941,-3957,-3972,-3987,-4007,-4021,-4038,-4054,-4067,-4080,-4098,-4108,-4119,-4127,-4136,-4143,-4151,-4161,-4168,-4173,-4181,-4188,-4199,-4210,-4225,-4236,-4251,-4262,-4274,-4291,-4304,-4318,-4335,-4346,-4359,-4373,-4381,-4389,-4396,-4407,-4419,-4432,-4444,-4460,-4475,-4493,-4509,-4523,-4541,-4560,-4582,-4605,-4621,-4638,-4658,-4677,-4690,-4704,-4722,-4735,-4746,-4760,-4773,-4784,-4795,-4804,-4814,-4825,-4839,-4849,-4861,-4873,-4886,-4898,-4908,-4918,-4933,-4947,-4960,-4973,-4988,-5001,-5017,-5035,-5051,-5063,-5074,-5085,-5098,-5109,-5122,-5133,-5147,-5160,-5174,-5188,-5202,-5216,-5230,-5246,-5261,-5277,-5295,-5312,-5329,-5348,-5363,-5378,-5397,-5413,-5430,-5449,-5472,-5495,-5510,-5529,-5543,-5559,-5576,-5592,-5609,-5625,-5642,-5659,-5677,-5697,-5717,-5735,-5753,-5777,-5796,-5819,-5843,-5858,-5879,-5895,-5913,-5930,-5944,-5958,-5977,-5994,-6008,-6026,-6042,-6057,-6075,-6091,-6110,-6115,-6116,-6116,-6117,-6118,-6118};

	double diff[size];

	for (int i = 0; i < size; i++)
		diff[i] = leftArr[i] + rightArr[i];

	bool turningPoints[size];

	turningPoints[0] = true;
	turningPoints[size - 1] = true;

	for (int i = 1; (i < (size - 2)); i++)
		if (((diff[i] < diff[i + 1]) && (diff[i] < diff[i - 1])) || ((diff[i] > diff[i + 1]) && (diff[i] > diff[i - 1])))
			turningPoints[i] = true;

	cubic_spline *spline;

	double *x;
	double *y;

	for (int i = 0; i < size; i++)
	{
		for (int j = i + 2; j < i + 30 && j < size; j++)
			if (abs(diff[i] - diff[j]) < d)
			{
				int oldI = i;
				int oldJ = j;
				while (!turningPoints[i])
					i--;

				while (!turningPoints[j])
					j++;

				if (j - i < 7)
				{
					i = oldI;
					j = oldJ;

					break;
				}
				/*for (int k = i + 1; k < j; k++)
				{
					leftArr[k] = leftArr[i] + (leftArr[j] - leftArr[i]) * (k - i) / (j - i);
					rightArr[k] = rightArr[i] + (rightArr[j] - rightArr[i]) * (k - i) / (j - i);
				}*/

				spline = new cubic_spline();


				//				std::size_t n = j - i + 1;

				//				x = new double[n];
				//				y = new double[n];

				//				for (int k = i; k <= j; k++)
				//				{
				//					x[k - i] = k;
				//					y[k - i] = diff[k];
				//				}

				std::size_t n = 8;

				x = new double[n];
				y = new double[n];

				x[0] = i; x[1] = i + 1; x[2] = j - 1; x[3] = j; x[4] = i + 2; x[5] = j - 2; x[6] = i + 3; x[7] = j - 3;
				y[0] = diff[i]; y[1] = diff[i + 1]; y[2] = diff[j - 1]; y[3] = diff[j]; y[4] = diff[i + 2]; y[5] = diff[j - 2]; y[6] = diff[i + 3]; y[7] = diff[j - 3];

				spline->build_spline(x, y, n);


				for (int k = i + 1; k < j; k++)
				{
					diff[k] = spline->f(k);
					/*double tmp1 = spline->f(k);
					double tmp2 = spline->f(k - 1);
					double koef = tmp1 - tmp2;
					if (koef != 0 && koef != 1)
					{
						leftArr[k] = leftArr[i] + koef;
						rightArr[k] = rightArr[i] * koef;
					}*/
				}

				delete spline;

				delete x;
				delete y;


				i = oldI;
				j = oldJ;

				break;
			}

	}

	freopen("hybridEncoders.txt", "w", stdout);
	//printf("var lArr = [");
	for (int i = 0; i < size; i++)
		printf((i == size - 1 ? "%.5lf" : "%.5lf, "), diff[i]);
		//printf((i == size - 1 ? "%.5lf" : "%.5lf, "), leftArr[i]);
	printf("]\n");

	/*printf("var rArr = [");
	for (int i = 0; i < size; i++)
		printf((i == size - 1 ? "%.5lf" : "%.5lf, "), rightArr[i]);
	printf("]\n");*/

	return 0;
}

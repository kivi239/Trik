#include <iostream>
#include <fstream>

using namespace std;

const int size = 1933;

int main()
{
	double x[size];
	double y[size];
	ifstream in;
	in.open("C:/traces/trace.txt", ios::in);

	for (int i = 0; i < size; i++)
	{
		in >> x[i] >> y[i];
		cerr << x[i] << ' '<< y[i] << endl;
	}
	in.close();

	freopen("C:/traces/truetrace.txt", "w", stdout);
	printf("x = [");
	for (int i = 0; i < size; i++)
		printf((i == size - 1 ? "%.5lf" : "%.5lf, "), x[i]);
	printf("]\n");

	printf("y = [");
	for (int i = 0; i < size; i++)
		printf((i == size - 1 ? "%.5lf" : "%.5lf, "), y[i]);
	printf("]\n");


	return 0;
}


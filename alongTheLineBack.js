var __interpretation_started_timestamp__;

var pi = 3.14159265;
var u;
var lineSize;

var main = function()
{
    __interpretation_started_timestamp__ = Date.now();

    brick.lineSensor("video0").init(true);
    while (!brick.keys().wasPressed(KeysEnum.Enter)) {
        script.wait(100);
    }

    var speedsLeft = [];
    var speedsRight = [];

    brick.lineSensor("video0").detect();
    while (true) {
        lineSize = brick.lineSensor("video0").read()[2];
        if (lineSize < 5)
        {
            var id = speedsLeft.length - 1;
            while (lineSize < 5 && id >= 0)
            {
                brick.motor(M3).setPower(-speedsLeft[id]);
                brick.motor(M4).setPower(-speedsRight[id]);
		
                id--;
                lineSize = brick.lineSensor("video0").read()[2];
            }

            if (u < 0)
            {
                id++;
                brick.motor(M3).setPower(speedsLeft[id] * 1.5);
                brick.motor(M4).setPower(speedsRight[id] * 0.5);
                speedsLeft[id] *= 1.5;
                speedsRight[id] *= 0.5;
                for (var i = id + 1; i < speedsLeft.length; i++) 
                {
                  speedsLeft.pop();
                  speedsRight.pop();
                }
            }
            else
            {
                id++;
                brick.motor(M3).setPower(speedsLeft[id] * 0.5);
                brick.motor(M4).setPower(speedsRight[id] * 1.5);
                speedsLeft[id] *= 0.5;
                speedsRight[id] *= 1.5;
                for (var i = id + 1; i < speedLeft.length; i++)
                {
                    speedsLeft.pop();
                    speedsRight.pop(); 
                } 
            }
             
            /*while (true) {
                brick.motor(M3).setPower(0);
                brick.motor(M4).setPower(0);
            }*/
        }
        u = brick.lineSensor("video0").read()[0];
        print(u);
        brick.motor(M3).setPower(24 + u * 0.25);
        brick.motor(M4).setPower(25 - u * 0.25);
        speedsLeft.push(24 + u * 0.25);
        speedsRight.push(25 - u * 0.25);
        script.wait(20);
    }
}


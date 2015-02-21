var Ball   = require('./ball'),
    Border = require('./border');

function Table() {
    this.borders = [new Border({x: 50,   y: 0  }, {x: 0,   y: 500}),
                    new Border({x: 0,   y: 500}, {x: 500, y: 500}),
                    new Border({x: 500, y: 500}, {x: 500, y: 0}),
                    new Border({x: 500, y: 0  }, {x: 50,   y: 0})];

    this.ball_radius = 10;
    this.ball_mass = 1;
    this.balls = [];
}

Table.prototype.addBalls = function() {
    var x, y, ball, emptySpace, offset, i, j,
        startx = 200,
        starty = 250;

    for (i = 1; i <= 10; i++) {
        emptySpace = 100 - 20 * i;
        offset     = emptySpace / 2;

        for(j = 1; j <= i; j++) {
            offset += this.ball_radius;

            x = offset + startx;
            y = starty + i * 20;

            ball = new Ball({ x: x, y: y,
                              radius: this.ball_radius,
                              mass: this.ball_mass,
                              velocity: { x: 0, y: 0 }});

            offset += this.ball_radius;;

            this.balls.push(ball);
        }
    }
};

Table.prototype.addWhiteBall = function(x,y) {
    var the_ball = new Ball({x: 250.1, y: 50, radius: 10, mass: 1, velocity: { x: 0, y: 10 }});
    this.balls.push(the_ball);
};

Table.prototype.updateBalls = function() {
    this.balls.forEach(function(ball) {
        // ball.velocity.x -= ( ball.velocity.x*friction);
        // ball.velocity.y -= ( ball.velocity.y*friction);
        ball.move();
    });
};

Table.prototype.handleBorderCollision = function() {
    this.balls.forEach(function(ball) {
        if ((ball.x + ball.radius > theCanvas.width - 50)  ||
            (ball.y + ball.radius > theCanvas.height - 50) ||
            (ball.x - ball.radius < 50) ||
            (ball.y - ball.radius < 50)) {

            this.borders.forEach(function(border) {
                if(border.overlaps(ball) && ball.movesTowardsBorder(border.normal()))
                {
                    ball.reflect(border.normal());
                }
            });
        }
    }.bind(this));
};

Table.prototype.handleBallsCollision = function() {
    var b1, b2, i, j;

    for (i = 0; i < this.balls.length; i++) {
        b1 = this.balls[i];

        for (j = i+1; j < this.balls.length; j++) {
            b2 = this.balls[j];

            if (b1.overlaps(b2) && b1.movesTowardsBall(b2)) {
                {
                    b1.collideWithBall(b2);
                }
            }
        }
    }
};

Table.prototype.tick = function() {
    this.updateBalls();
    this.handleBorderCollision();
    this.handleBallsCollision();
};

module.exports = Table;

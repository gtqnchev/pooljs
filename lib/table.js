var Ball   = require('./ball'),
    Border = require('./border'),
    Geometry = require('./geometry'),
    _      = require('underscore'),
    EventEmitter = require('event-emitter');

function Table() {
    this.offset = 20;
    this.ball_radius = 10;
    this.ball_mass = 1;
    this.friction = 0.005;
    this.balls = [];
    this.borders = [];
    this.pockets = [];

    this.addWhiteBall();
    this.addBalls();
    this.addPockets();
    this.createBorders();
}

EventEmitter(Table.prototype);

Table.prototype.addBalls = function() {
    var x, y, ball, emptySpace, offset, i, j,
        startx = 500,
        starty = 150;

    for (i = 1; i <= 5; i++) {
        emptySpace = 100 - 20 * i;
        offset     = emptySpace / 2;

        for(j = 1; j <= i; j++) {
            offset += this.ball_radius;

            y = offset + starty;
            x = startx + i * 20;

            ball = new Ball({ x: x, y: y,
                              radius: this.ball_radius,
                              mass: this.ball_mass,
                              dir: { x: 0, y: 0 },
                              speed: 0});

            offset += this.ball_radius;;

            this.balls.push(ball);
        }
    }
};

Table.prototype.addWhiteBall = function(x,y) {
    var the_ball = new Ball({x: 200, y: 200, radius: 10, mass: 1.2, speed: 0, dir: { x: 1, y: 0 }});
    this.balls.push(the_ball);
};

Table.prototype.updateBalls = function() {
    this.balls.forEach(function(ball) {
        ball.move(this.friction);
    }.bind(this));
};

Table.prototype.handleBorderCollision = function() {
    this.balls.forEach(function(ball) {
            this.borders.forEach(function(border) {
                if(border.overlaps(ball) && ball.movesTowardsBorder(border.normal()))
                {
                    ball.reflect(border.normal());
                }
            });
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

Table.prototype.handleBallsInPockets = function() {
    this.pockets.forEach(function(pocket) {
        this.balls.forEach(function(ball) {
            if(ball.inPocket(pocket, 20))
            {
                ball.finished = true;
            }
        }.bind(this));
    }.bind(this));

    this.balls = _.reject(this.balls, function(ball) {
        return ball.finished;
    });
};

Table.prototype.tick = function() {
    this.updateBalls();
    this.handleBorderCollision();
    this.handleBallsCollision();
    this.handleBallsInPockets();
};

Table.prototype.checkAllBalls = function() {
    var all_balls_at_rest = _.every(this.balls, function(ball) {
        return ball.speed == 0;
    });

    if(all_balls_at_rest) {
        this.emit('table-at-rest');
    }
};

Table.prototype.strikeWhiteBall = function(from) {
    this.balls[0].strike(from);

    this.balls.forEach(function(ball) {
        ball.on('ball-at-rest', function() {
            this.checkAllBalls();
        }.bind(this));
    }.bind(this));
};

Table.prototype.createBorders = function() {
    this.borders.push(new Border({x: 40,  y: 20}, {x: 60,  y: 30})); // borderTopLeftLeftSlope
    this.borders.push(new Border({x: 60,  y: 30}, {x: 380, y: 30})); // borderTopLeft
    this.borders.push(new Border({x: 380, y: 30}, {x: 400, y: 20})); // borderTopLeftRightSlope

    this.borders.push(new Border({x: 440, y: 20}, {x: 460, y: 30})); // borderTopRightLeftSlope
    this.borders.push(new Border({x: 460, y: 30}, {x: 780, y: 30})); // borderTopRight
    this.borders.push(new Border({x: 780, y: 30}, {x: 800, y: 20})); // borderTopRightRightSlope

    this.borders.push(new Border({x: 820, y: 40}, {x: 810, y: 60})); // borderRightUpperSlope
    this.borders.push(new Border({x: 810, y: 60}, {x: 810, y: 380})); // borderRight
    this.borders.push(new Border({x: 810, y: 380},{x: 820, y: 400})); // borderRightBottomSlope

    this.borders.push(new Border({x: 800, y: 420}, {x: 780, y: 410})); // borderBottomRightRightSlope
    this.borders.push(new Border({x: 780, y: 410}, {x: 460, y: 410})); // borderBottomRight
    this.borders.push(new Border({x: 460, y: 410}, {x: 440, y: 420})); // borderBottomRightLeftSlope

    this.borders.push(new Border({x: 400, y: 420}, {x: 380, y: 410})); // borderBottomLeftRightSlope
    this.borders.push(new Border({x: 380, y: 410}, {x: 60, y: 410})); // borderBottomLeft
    this.borders.push(new Border({x: 60,  y: 410}, {x: 40, y: 420})); // borderBottomLeftLeftSlope

    this.borders.push(new Border({x: 20, y: 400}, {x: 30, y: 380})); // borderRightBottomSlope
    this.borders.push(new Border({x: 30, y: 380}, {x: 30, y: 60})); // borderRight
    this.borders.push(new Border({x: 30,  y: 60}, {x: 20, y: 40})); // borderRightUpperSlope
};

Table.prototype.addPockets = function() {
    this.pockets = [{x: 20, y: 20  }, {x: 420, y: 20  }, {x: 820, y: 20 },
                    {x: 20, y: 420}, {x: 420, y: 420}, {x: 820, y: 420}];
};
module.exports = Table;

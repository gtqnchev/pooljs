var Geometry = require('./lib/geometry'),
    canvas_width = 840,
    canvas_height = 440;

function UI(table, context) {
    this.mouse = {};
    this.locked = false;
    this.table = table;
    this.context = context;
}

UI.prototype.drawTable = function() {
    this.context.fillStyle = '#0D6636';
    this.context.fillRect(0, 0, canvas_width, canvas_height);

    this.context.strokeStyle = '#000000';
    this.context.strokeRect(1,  1, canvas_width-2, canvas_height-2);
};

UI.prototype.drawStick = function() {
    if(!this.locked) {
        this.context.strokeStyle = "#000000";
        this.context.beginPath();
        this.context.moveTo(this.table.balls[0].x, this.table.balls[0].y);
        this.context.lineTo(this.mouse.x, this.mouse.y);
        this.context.lineWidth = 5;
        this.context.lineCap = 'butt';
        this.context.closePath();
        this.context.stroke();
    }
};

UI.prototype.drawDirection = function() {
    if(!this.locked) {
        direction = Geometry.subtractVectors(this.table.balls[0], this.mouse);
        this.context.strokeStyle = "yellow";
        this.context.lineWidth = 1;
        this.context.beginPath();
        this.context.moveTo(this.table.balls[0].x, this.table.balls[0].y);
        this.context.lineTo(direction.x * 10 + this.mouse.x, direction.y * 10 + this.mouse.y);
        this.context.closePath();
        this.context.stroke();

    }
};

UI.prototype.drawBalls = function() {
    this.table.balls.forEach(function(ball, index) {
        if(index == 0) {
            this.context.fillStyle = "#FFFFFF";
        }
        else {
            this.context.fillStyle = "#B91401";
        }

        this.context.beginPath();
        this.context.arc(ball.x,ball.y,ball.radius,0,Math.PI*2,true);
        this.context.closePath();
        this.context.fill();
    }.bind(this));
};

UI.prototype.drawCushions = function() {
    this.context.fillStyle = "#561E02";
    this.context.beginPath();
    this.context.moveTo(20,40);
    this.context.lineTo(30,60);
    this.context.lineTo(30, 380);
    this.context.lineTo(20, 400);
    this.context.lineTo(0, 400);
    this.context.lineTo(0,40);
    this.context.fill();

    this.context.beginPath();
    this.context.moveTo(820,40);
    this.context.lineTo(810,60);
    this.context.lineTo(810,380);
    this.context.lineTo(820,400);
    this.context.lineTo(840,400);
    this.context.lineTo(840,40);
    this.context.fill();

    this.context.beginPath();
    this.context.moveTo(40, 440);
    this.context.lineTo(400,440);
    this.context.lineTo(400,420);
    this.context.lineTo(380,410);
    this.context.lineTo(60,410);
    this.context.lineTo(40,420);
    this.context.fill();

    this.context.beginPath();
    this.context.moveTo(440,440);
    this.context.lineTo(800,440);
    this.context.lineTo(800,420);
    this.context.lineTo(780,410);
    this.context.lineTo(460,410);
    this.context.lineTo(440,420);
    this.context.fill();

    this.context.beginPath();
    this.context.moveTo(40,0);
    this.context.lineTo(40,20);
    this.context.lineTo(60,30);
    this.context.lineTo(380, 30);
    this.context.lineTo(400, 20);
    this.context.lineTo(400, 0);
    this.context.fill();

    this.context.beginPath();
    this.context.moveTo(440,0);
    this.context.lineTo(440,20);
    this.context.lineTo(460,30);
    this.context.lineTo(780, 30);
    this.context.lineTo(800, 20);
    this.context.lineTo(800, 0);
    this.context.fill();
};

UI.prototype.drawPockets = function(){
    this.context.fillStyle = "#000000";

    this.table.pockets.forEach(function(pocket) {
        this.context.beginPath();
        this.context.arc(pocket.x, pocket.y, 20, 0, Math.PI*2, true);
        this.context.closePath();
        this.context.fill();
    }.bind(this));
};

UI.prototype.render = function() {
    this.drawTable();
    this.drawPockets();
    this.drawCushions();
    this.drawBalls();
    this.drawStick();
    this.drawDirection();
};

module.exports = UI;

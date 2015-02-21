var Geometry = require('./geometry');

function Ball(params) {
    this.x = params.x;
    this.y = params.y;
    this.radius = params.radius;
    this.mass = params.mass || 1;
    this.velocity = { x: params.velocity.x,
                      y: params.velocity.y };
};

Ball.prototype.center = function() {
    return { x: this.x, y: this.y };
};

Ball.prototype.move = function () {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
};

Ball.prototype.applyFriction = function () {
    // this.x += this.velocity.x;
    // this.y += this.velocity.y;
};

Ball.prototype.reflect = function(normal) {
    this.velocity = Geometry.reflection(this.velocity, normal);
};

Ball.prototype.radian = Math.PI/180;

Ball.prototype.overlaps = function (ball) {
    var distance_vector = Geometry.subtractVectors(this, ball),
        distance = Geometry.vectorLength(distance_vector);

    return (distance <= (this.radius + ball.radius));
};

Ball.prototype.collideWithBall = function(ball) {
    var b1 = this,
        b2 = ball;

    var distance_vector = Geometry.subtractVectors(b1, b2);
    collision_angle = Geometry.vectorDirection(distance_vector);

    var speed1 = Geometry.vectorLength(b1.velocity);
    var speed2 = Geometry.vectorLength(b2.velocity);

    var direction1 = Geometry.vectorDirection(b1.velocity);
    var direction2 = Geometry.vectorDirection(b2.velocity);

    // New coordinates compound velocities

    var velocityx_1 = speed1 * Math.cos(direction1 - collision_angle);
    var velocityy_1 = speed1 * Math.sin(direction1 - collision_angle);
    var velocityx_2 = speed2 * Math.cos(direction2 - collision_angle);
    var velocityy_2 = speed2 * Math.sin(direction2 - collision_angle);

    var final_velocityx_1 = ((b1.mass - b2.mass) * velocityx_1 +
                             (b2.mass + b2.mass) * velocityx_2)/(b1.mass + b2.mass);
    var final_velocityx_2 = ((b1.mass + b1.mass) * velocityx_1 +
                             (b2.mass - b1.mass) * velocityx_2)/(b1.mass + b2.mass);

    var final_velocityy_1 = velocityy_1;
    var final_velocityy_2 = velocityy_2;

    // Back to original coordinates

    var ninety_degree = Math.PI/2;

    b1.velocity.x = Math.cos(collision_angle) * final_velocityx_1 +
        Math.cos(collision_angle + ninety_degree) * final_velocityy_1;

    b1.velocity.y = Math.sin(collision_angle) * final_velocityx_1 +
        Math.sin(collision_angle + ninety_degree) * final_velocityy_1;

    b2.velocity.x = Math.cos(collision_angle) * final_velocityx_2 +
        Math.cos(collision_angle + ninety_degree) * final_velocityy_2;

    b2.velocity.y = Math.sin(collision_angle) * final_velocityx_2 +
        Math.sin(collision_angle + ninety_degree) * final_velocityy_2;
};

Ball.prototype.movesTowardsBall = function(ball) {
    var velocity_vector = Geometry.subtractVectors(this.velocity, ball.velocity),
        distance_vector = Geometry.subtractVectors(ball, this);

    return Geometry.dotProduct(velocity_vector, distance_vector) > 0;
};

Ball.prototype.movesTowardsBorder = function(normal) {
    return Geometry.dotProduct(normal, this.velocity) < 0;
};

module.exports = Ball;

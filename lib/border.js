var Geometry = require('./geometry');

function Border(from, to) {
    this.from = from;
    this.to = to;
}

Border.prototype.normal = function() {
    var borderline = Geometry.subtractVectors(this.to, this.from),
        perpendicular = Geometry.perpendicularOf(borderline);

    return Geometry.normalize(perpendicular);;
};

Border.prototype.reversed_normal = function() {
    return Geometry.reverseVector(this.normal);
};

Border.prototype.overlaps = function(ball) {
    var closest_point = Geometry.closestPointFromSegment(this.from, this.to, ball),
        distance_vector = Geometry.subtractVectors(ball, closest_point);

    return Geometry.vectorLength(distance_vector) < ball.radius;
};

module.exports = Border;

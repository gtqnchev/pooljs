module.exports = (function() {
    function sumVectors(v1,v2) {
        return { x: v1.x + v2.x,
                 y: v1.y + v2.y };
    }

    function subtractVectors(v1,v2) {
        return { x: v1.x - v2.x,
                 y: v1.y - v2.y };
    }

    function reverseVector(v) {
        return scaleVector(v, -1);
    }

    function vectorLength(v) {
        return Math.sqrt(dotProduct(v,v));
    }

    function scaleVector(v,s) {
        return { x: v.x * s,
                 y: v.y * s };
    }

    function perpendicularOf(v) {
        return { x: v.y, y: -v.x };
    }

    function dotProduct(v1, v2) {
        return (v1.x * v2.x) + (v1.y * v2.y);
    }

    function normalize(v) {
        var length = vectorLength(v);
        return { x: v.x / length,
                 y: v.y / length };
    }

    function reflection(v, normal) {
        var factor        = -2 * dotProduct(v, normal),
            scaled_normal = scaleVector(normal, factor);

        return sumVectors(v, scaled_normal);
    }

    function closestPointFromSegment(s1, s2, p) {
        var segment_vector     = subtractVectors(s2, s1),
            point_vector       = subtractVectors(p, s1),
            normalized_segment = normalize(segment_vector),
            projection         = dotProduct(normalized_segment, point_vector);

        if(projection < 0) return s1;
        if(projection >= vectorLength(segment_vector)) return s2;
        return sumVectors(s1, scaleVector(normalized_segment, projection));
    }

    function vectorDirection(vector) {
        return Math.atan2(vector.y, vector.x);
    }

    return {
        sumVectors: sumVectors,
        reverseVector: reverseVector,
        subtractVectors: subtractVectors,
        scaleVector: scaleVector,
        perpendicularOf: perpendicularOf,
        dotProduct: dotProduct,
        normalize: normalize,
        reflection: reflection,
        closestPointFromSegment: closestPointFromSegment,
        vectorDirection: vectorDirection,
        vectorLength: vectorLength
    };
})();

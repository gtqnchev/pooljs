var Table = require('./lib/table'),
    _ = require('underscore');

window.addEventListener('load', eventWindowLoaded, false);

function eventWindowLoaded() {
    startGame();
}

function startGame(){
    theCanvas = document.getElementById("canvasOne");
    context = theCanvas.getContext("2d");

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    // theCanvas.addEventListener('mousemove', function(evt) {
    //     var mousePos = getMousePos(theCanvas, evt);
    //     var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    //     console.log(message);
    // }, false);

    table = new Table();
    table.addBalls();
    table.addPockets();
    table.createBorders();
    table.addWhiteBall();

    function drawTable() {
        context.fillStyle = '#0D6636';
        context.fillRect(0, 0, theCanvas.width, theCanvas.height);
        //Box
        context.strokeStyle = '#000000';
        context.strokeRect(1,  1, theCanvas.width-2, theCanvas.height-2);

    }

    function drawBalls() {
        context.fillStyle = "#FFFFFF";

        table.balls.forEach(function(ball) {
            context.beginPath();
            context.arc(ball.x,ball.y,ball.radius,0,Math.PI*2,true);
            context.closePath();
            context.fill();
        });
    }

    function drawCushions() {
        context.fillStyle = "#561E02";
        context.beginPath();
        context.moveTo(20,40);
        context.lineTo(30,60);
        context.lineTo(30, 380);
        context.lineTo(20, 400);
        context.lineTo(0, 400);
        context.lineTo(0,40);
        context.fill();

        context.beginPath();
        context.moveTo(820,40);
        context.lineTo(810,60);
        context.lineTo(810,380);
        context.lineTo(820,400);
        context.lineTo(840,400);
        context.lineTo(840,40);
        context.fill();

        context.beginPath();
        context.moveTo(40, 440);
        context.lineTo(400,440);
        context.lineTo(400,420);
        context.lineTo(380,410);
        context.lineTo(60,410);
        context.lineTo(40,420);
        context.fill();

        context.beginPath();
        context.moveTo(440,440);
        context.lineTo(800,440);
        context.lineTo(800,420);
        context.lineTo(780,410);
        context.lineTo(460,410);
        context.lineTo(440,420);
        context.fill();

        context.beginPath();
        context.moveTo(40,0);
        context.lineTo(40,20);
        context.lineTo(60,30);
        context.lineTo(380, 30);
        context.lineTo(400, 20);
        context.lineTo(400, 0);
        context.fill();

        context.beginPath();
        context.moveTo(440,0);
        context.lineTo(440,20);
        context.lineTo(460,30);
        context.lineTo(780, 30);
        context.lineTo(800, 20);
        context.lineTo(800, 0);
        context.fill();
    }

    function drawPockets() {
        context.fillStyle = "#000000";

        table.pockets.forEach(function(pocket) {
            context.beginPath();
            context.arc(pocket.x, pocket.y, 20, 0, Math.PI*2, true);
            context.closePath();
            context.fill();
        });
    }

    function render() {
        drawTable();
        drawPockets();
        drawCushions();
        drawBalls();

    };

    function gameLoop() {
        window.setTimeout(gameLoop, 20);
        table.tick();
        render();
    }

    gameLoop();
};

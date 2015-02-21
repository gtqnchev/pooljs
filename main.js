var Table = require('./lib/table');

window.addEventListener('load', eventWindowLoaded, false);

function eventWindowLoaded() {
    startGame();
}

function startGame(){
    theCanvas = document.getElementById("canvasOne");
    context = theCanvas.getContext("2d");

    table = new Table();
    table.addBalls();
    table.addWhiteBall();

    function drawTable() {
        context.fillStyle = '#EEEEEE';
        context.fillRect(0, 0, theCanvas.width, theCanvas.height);
        //Box
        context.strokeStyle = '#000000';
        context.strokeRect(1,  1, theCanvas.width-2, theCanvas.height-2);

    }

    function drawBalls() {
        context.fillStyle = "#000000";

        table.balls.forEach(function(ball) {
            context.beginPath();
            context.arc(ball.x,ball.y,ball.radius,0,Math.PI*2,true);
            context.closePath();
            context.fill();
        });
    }

    function render() {
        drawTable();
        drawBalls();
    };

    function gameLoop() {
        window.setTimeout(gameLoop, 2);
        table.tick();
        render();
    }

    gameLoop();
};

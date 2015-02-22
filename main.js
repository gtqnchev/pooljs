var Table = require('./lib/table'),
    theCanvas = document.getElementById("canvasOne"),
    context = theCanvas.getContext("2d"),
    UI = require('./ui');

window.addEventListener('load', eventWindowLoaded, false);

function eventWindowLoaded() {
    startGame();
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function setupUserActions(ui) {
    theCanvas.addEventListener('mousemove', function(evt){
        var mousePos = getMousePos(theCanvas, evt);
        ui.mouse = { x: mousePos.x, y: mousePos.y };
    });

    theCanvas.addEventListener('mouseup', function(evt){
        if(!ui.locked) {
            ui.table.strikeWhiteBall({x: ui.mouse.x, y: ui.mouse.y });
            ui.locked = true;

            ui.table.on('table-at-rest', function() {
                ui.locked = false;
            });
        };
    });
}

function startGame(){
    ui = new UI(new Table(), context);
    setupUserActions(ui);

    function gameLoop() {
        window.setTimeout(gameLoop, 20);
        ui.table.tick();
        ui.render();
    }

    gameLoop();
};

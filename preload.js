const { ipcRenderer } = require('electron')

ipcRenderer.on('change-character', (event, character) => {
    let path = null;
    let path2 = null;
    switch (character) {
        case 'dino':
            path = 'images/default_100_percent/offline/100-offline-sprite.png';
            path2 = 'images/default_200_percent/offline/200-offline-sprite.png';
            break;
        default:
            return;
    }
    document.getElementById('offline-resources-1x').src = path;
    document.getElementById('offline-resources-2x').src = path2;
});

function insertJS(text) {
    var script = document.createElement('script');
    script.textContent = text;
    document.body.appendChild(script);
}

window.addEventListener('load', function () {
    insertJS("var bot_interval = null;");
    ipcRenderer.on('change-botstatus', (event, status) => {
        if (status === 'start') {
            function startBot() {
                bot_interval = setInterval(function() {
                    var tRex = Runner.instance_.tRex;
                    var obstacles = Runner.instance_.horizon.obstacles;
                    if (!tRex.jumping && (obstacles.length > 0) && (obstacles[0].xPos + obstacles[0].width) <= ((parseInt(Runner.instance_.currentSpeed) - 5) * 26 + 120) && (obstacles[0].xPos + obstacles[0].width) > 20) {
                        tRex.startJump(Runner.instance_.currentSpeed);
                    }
                }, 1);
            }
            insertJS("(" + startBot + ")();");
        } else if (status === 'stop') {
            insertJS("clearInterval(bot_interval);");
        }
    });
});

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
})

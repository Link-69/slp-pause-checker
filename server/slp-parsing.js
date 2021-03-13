const { default: SlippiGame } = require('@slippi/slippi-js');

const getPlayersPauses = (fileBuffer) => {
    const { frames, totalFrames, gameDuration } = getFramesFromSlpFile(fileBuffer);

    const gameLog = new Array();
    gameLog.push(gameDuration);
    gameLog.push('-');
    for (var i = 0; i < totalFrames; i++) {
        const frame = i;
        const frameInSeconds = frame / 60;
        const minuteFrame = (Math.floor(frameInSeconds / 60)).toFixed(0);
        const secondFrame = (frameInSeconds - minuteFrame * 60).toFixed(2);

        const buttonP1 = frames[i].players[0].pre.physicalButtons;
        const buttonP2 = frames[i].players[1].pre.physicalButtons;

        if (buttonP1 == 4096) {
            gameLog.push(`P1 pauses at ${minuteFrame}:${secondFrame} (frame ${frame})`);
        }
        if (buttonP2 == 4096) {
            gameLog.push(`P2 pauses at ${minuteFrame}:${secondFrame} (frame ${frame})`);
        }
    }
    return gameLog;
}

const getFramesFromSlpFile = (file) => {
    const game = new SlippiGame(file);

    // Get game settings – stage, characters, etc
    // const settings = game.getSettings();
    // const metadata = game.getMetadata();

    // Get computed stats - openings / kill, conversions, etc
    // const stats = game.getStats();

    const totalFrames = game.getLatestFrame().frame;
    const gameInSeconds = totalFrames / 60;
    const minutes = (Math.floor(gameInSeconds / 60)).toFixed(0);
    const seconds = (gameInSeconds - minutes * 60).toFixed(2);
    const frames = game.getFrames();

    const gameDuration = `Game duration : ${minutes}min ${seconds}sec (${totalFrames} frames)`;
    return { frames, totalFrames, gameDuration };
}

module.exports = {
    getPlayersPauses
}
const { default: SlippiGame } = require('@slippi/slippi-js');

const getPlayersPauses = (fileBuffer) => {
    const { frames, totalFrames, gameDuration } = getFramesFromSlpFile(fileBuffer);

    const gameLog = new Array();
    gameLog.push(gameDuration);
    for (var i = 0; i < totalFrames; i++) {
        const frame = i;
        const frameInSeconds = frame / 60;
        const minuteFrame = Math.floor(frameInSeconds / 60);
        const secondFrame = frameInSeconds - minuteFrame * 60;

        const buttonP1 = frames[i].players[0].pre.physicalButtons;
        const buttonP2 = frames[i].players[1].pre.physicalButtons;

        if (buttonP1 == 4096) {
            // console.log(`player 1 pressed start on frame ${frame} | ${minuteFrame} minutes ${secondFrame} seconds`);
            gameLog.push(`player 1 pressed start on frame ${frame} | ${minuteFrame} minutes ${secondFrame} seconds`);
        }
        if (buttonP2 == 4096) {
            // console.log(`player 2 pressed start on frame ${frame} | ${minuteFrame} minutes ${secondFrame} seconds`);
            gameLog.push(`player 2 pressed start on frame ${frame} | ${minuteFrame} minutes ${secondFrame} seconds`);
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
    const minutes = Math.floor(gameInSeconds / 60);
    const seconds = gameInSeconds - minutes * 60;
    const frames = game.getFrames();

    const gameDuration = `Game lasted ${totalFrames} frames | ${minutes} minutes ${seconds} seconds`;
    return { frames, totalFrames, gameDuration };
}

module.exports = {
    getPlayersPauses
}
const { default: SlippiGame } = require('@slippi/slippi-js');

const getPlayersPauses = (fileBuffer) => {
    const { frames, totalFrames, p1tag, p2tag, gameDuration } = getDatasFromSlpFile(fileBuffer);
    let gameLog = { gameDuration, pauses: [] };

    for (var i = 0; i < totalFrames; i++) {
        const frame = i;
        const frameInSeconds = frame / 60;
        const minuteFrame = (Math.floor(frameInSeconds / 60)).toFixed(0);
        const secondFrame = (frameInSeconds - minuteFrame * 60).toFixed(0);

        const buttonP1 = frames[i].players[0].pre.physicalButtons;
        const buttonP2 = frames[i].players[1].pre.physicalButtons;

        if (buttonP1 == 4096 || buttonP2 == 4096) {
            gameLog.pauses.push({
                player: buttonP1 == 4096 ? p1tag : p2tag,
                minute: minuteFrame,
                second: secondFrame,
                frame
            });
        }
    }
    return clearPausesLog(gameLog);
}

const getDatasFromSlpFile = (file) => {
    const game = new SlippiGame(file);

    // Get game settings – stage, characters, etc
    // const settings = game.getSettings();

    const metadata = game.getMetadata();

    const p1tag = metadata.players[0].names.netplay || "P1";
    const p2tag = metadata.players[1].names.netplay || "P2";

    // Get computed stats - openings / kill, conversions, etc
    // const stats = game.getStats();

    const totalFrames = game.getLatestFrame().frame;
    const gameInSeconds = totalFrames / 60;
    const minutes = (Math.floor(gameInSeconds / 60)).toFixed(0);
    const seconds = Math.round((gameInSeconds - minutes * 60));
    const frames = game.getFrames();

    const gameDuration = {
        minutes: twoDigitsString(minutes),
        seconds: twoDigitsString(seconds),
        frames: totalFrames
    };
    return { frames, totalFrames, p1tag, p2tag, gameDuration };
}

const clearPausesLog = (gameLog) => {
    let pauses = [];
    for (var i = 1; i < gameLog.pauses.length; i++) {
        if (gameLog.pauses[i].frame - gameLog.pauses[i - 1].frame > 20) {
            pauses.push(gameLog.pauses[i]);
        }
    }
    return {
        ...gameLog,
        pauses: pauses
    };
}

const twoDigitsString = (number) => {
    var dec = number - Math.floor(number);
    number = number - dec;
    var formattedNumber = ("0" + number).slice(-2) + dec.toString().substr(1);
    return formattedNumber;
}

module.exports = {
    getPlayersPauses
}
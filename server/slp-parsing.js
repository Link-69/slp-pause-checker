const { default: SlippiGame } = require('@slippi/slippi-js');
const { timeMinutesFromFrame, timeSecondsFromFrame, twoDigitsString } = require('./helpers');

const getPlayersPauses = (fileBuffer) => {
    const { frames, totalFrames, p1tag, p2tag, gameDuration } = getDatasFromSlpFile(fileBuffer);
    let gameLog = { gameDuration, pauses: [] };

    for (var i = 0; i < totalFrames; i++) {
        const minuteFrame = timeMinutesFromFrame(i);
        const secondFrame = timeSecondsFromFrame(i);

        const buttonP1 = frames[i].players[0].pre.physicalButtons;
        const buttonP2 = frames[i].players[1].pre.physicalButtons;

        if (buttonP1 == 4096 || buttonP2 == 4096) {
            gameLog.pauses.push({
                player: buttonP1 == 4096 ? p1tag : p2tag,
                minute: twoDigitsString(minuteFrame),
                second: twoDigitsString(secondFrame),
                frame: i
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
    const minutes = timeMinutesFromFrame(totalFrames);
    const seconds = timeSecondsFromFrame(totalFrames);
    const frames = game.getFrames();

    const gameDuration = {
        minutes: twoDigitsString(minutes),
        seconds: twoDigitsString(seconds),
        frames: totalFrames
    };
    return { frames, totalFrames, p1tag, p2tag, gameDuration };
}

const clearPausesLog = (gameLog) => {
    let pauses = [gameLog.pauses[0]];
    for (var i = 2; i < gameLog.pauses.length; i++) {
        if (gameLog.pauses[i].frame - gameLog.pauses[i - 1].frame > 20) {
            pauses.push(gameLog.pauses[i]);
        }
    }
    return {
        ...gameLog,
        pauses: pauses
    };
}

module.exports = {
    getPlayersPauses
}
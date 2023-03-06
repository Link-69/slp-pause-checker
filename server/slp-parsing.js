const { SlippiGame } = require('@slippi/slippi-js');
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

// TODO - should be optimized to not loop twice on file parsing results
const getDigitalPlayers = (fileBuffer) => {
    const { frames, totalFrames, p1tag, p2tag } = getDatasFromSlpFile(fileBuffer);
    const p1Angles = new Array();
    const p2Angles = new Array();

    for (var i = 0; i < totalFrames; i++) {
        const GetAngle = (x, y) => p1X === 0 && p1Y === 0
            ? 0
            : (2 * Math.atan(y / (x + Math.sqrt((x ^ 2) + (y ^ 2))))) * (180 / Math.PI);

        const p1X = Math.abs(frames[i].players[0].pre.joystickX);
        const p1Y = Math.abs(frames[i].players[0].pre.joystickY);
        const p1Angle = GetAngle(p1X, p1Y);

        p1Angles.push(p1Angle);

        const p2X = Math.abs(frames[i].players[1].pre.joystickX);
        const p2Y = Math.abs(frames[i].players[1].pre.joystickY);
        const p2Angle = GetAngle(p2X, p2Y);

        p2Angles.push(p2Angle);
    }

    console.log(`P1 angles count`, p1Angles.length);
    const uniqueAnglesP1 = [...new Set(p1Angles.map(angle => angle))];
    console.log(`P1 angles`, uniqueAnglesP1.length);

    console.log(`P2 angles count`, p2Angles.length);
    const uniqueAnglesP2 = [...new Set(p2Angles.map(angle => angle))];
    console.log(`P2 angles`, uniqueAnglesP2.length);

    const isDigital = (angles) => angles.length <= 13;

    return { p1: { tag: p1tag, isDigital: isDigital(uniqueAnglesP1) }, p2: { tag: p2tag, isDigital: isDigital(uniqueAnglesP2) } };
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
    if (gameLog?.pauses?.length) {
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
    return gameLog;
}

module.exports = {
    getPlayersPauses,
    getDigitalPlayers
}
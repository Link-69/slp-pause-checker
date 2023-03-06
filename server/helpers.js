const twoDigitsString = (number) => {
    var dec = number - Math.floor(number);
    number = number - dec;
    var formattedNumber = ("0" + number).slice(-2) + dec.toString().substring(1);
    return formattedNumber;
}

const frameToSeconds = (frame) => frame / 60;

const timeMinutesFromFrame = (frame) => (Math.floor(frameToSeconds(frame) / 60)).toFixed(0);
const timeSecondsFromFrame = (frame) => Math.round((frameToSeconds(frame) - (timeMinutesFromFrame(frame) * 60)));

module.exports = {
    twoDigitsString,
    timeMinutesFromFrame,
    timeSecondsFromFrame
}
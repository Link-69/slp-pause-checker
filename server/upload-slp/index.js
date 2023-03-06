const slpParser = require('../slp-parsing.js');
const multipart = require('parse-multipart');

// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// }

const extractFile = (req) => {
    // encode body to base64 string
    const bodyBuffer = Buffer.from(req.body);
    // get boundary for multipart data e.g. ------WebKitFormBoundaryDtbT5UpPj83kllfw
    const boundary = multipart.getBoundary(req.headers['content-type']);
    // parse the body
    const parts = multipart.Parse(bodyBuffer, boundary);

    return parts[0];
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    try {
        const slpFile = extractFile(req);

        if (!slpFile || slpFile.data.length <= 0) {
            context.res = {
                status: 400,
                body: 'No files were uploaded.'
            };
        }
        else {
            const playersPauses = slpParser.getPlayersPauses(slpFile.data);
            const digitalPlayers = slpParser.getDigitalPlayers(slpFile.data);
            context.res = {
                body: { ...playersPauses, ...digitalPlayers }
            };
        }
    } catch (error) {
        context.res = {
            status: 400,
            body: 'Error while parsing file'
        }
    }
}
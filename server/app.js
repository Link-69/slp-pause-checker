const express = require('express');
const fileUpload = require('express-fileupload');
const slpParser = require('./slp-parsing.js');
const app = express();
const port = 3000;

app.use(fileUpload());

app.post('/upload-slp', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    const slpFile = req.files.slpFile;
    const playersPauses = slpParser.getPlayersPauses(slpFile.data);
    res.send(playersPauses);
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
const express = require('express');
const fileUpload = require('express-fileupload');
const helmet = require('helmet')
const compression = require('compression')
const cors = require('cors')
const slpParser = require('./slp-parsing.js');

const app = express();
const port = process.env.PORT || port;

const corsOptions = {
  origin: 'http://localhost:5000' // TODO - en prod : https://slp-pause-checker.netlify.app/
};

app.use(helmet());
app.use(compression());
app.use(cors(corsOptions));
app.use(fileUpload());

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

app.post('/upload-slp', (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    const slpFile = req.files.slpFile;
    const playersPauses = slpParser.getPlayersPauses(slpFile.data);
    res.send(playersPauses);
  } catch (error) {
    res.status(400).send('Error while parsing file');
  }
});

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const ejs = require('ejs');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // Set EJS as the template engine

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/generate-dockerfile', (req, res) => {
  const { appName, portNumber, imageName, imageVersion, copySource, copyDestination, dockerfileType, customDockerfileType } = req.body;

  // Server-side validation
  if (!appName || !portNumber || !imageName || !imageVersion || !copySource || !copyDestination || !dockerfileType) {
    return res.status(400).send('All fields are required.');
  }

  // Validate Dockerfile type
  let validatedDockerfileType;
  if (dockerfileType === 'flat') {
    // If "Flat (Custom)" is selected, use the customDockerfileType
    if (!customDockerfileType) {
      return res.status(400).send('Custom Dockerfile Type is required for "Flat" option.');
    }
    validatedDockerfileType = customDockerfileType;
  } else {
    // If a predefined type is selected, use it
    validatedDockerfileType = dockerfileType;
  }

  // Render the Dockerfile template using EJS
  ejs.renderFile('views/dockerfile.ejs', { appName, portNumber, imageName, imageVersion, copySource, copyDestination, dockerfileType: validatedDockerfileType }, (err, str) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error rendering Dockerfile template.');
    }

    // Write the rendered Dockerfile to the file system
    fs.writeFileSync('Dockerfile', str);

    // Send the rendered Dockerfile content to the client
    res.send(str);
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const spawn = require("child_process").spawn;

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

// Put all API endpoints under '/api'
app.post("/api/analysis", (req, res) => {
  const text = req.body.text;
  const age = req.body.age;
  const gender = req.body.gender;
  const insomnia = req.body.insomnia;
  const ratioEmailRead = req.body.ratioEmailRead;
  const seasonality = req.body.seasonality;
  const ls = spawn("python", [
    "../ML/prova04.py",
    insomnia,
    gender,
    age,
    ratioEmailRead,
    seasonality
  ]);
  const response = 0.5;

  ls.stdout.on("data", data => {
    console.log(`stdout: ${data}`);
  });
  ls.stderr.on("data", data => {
    console.log(`stderr: ${data}`);
  });

  ls.on("close", code => {
    console.log(`child process exited with code ${code}`);
  });
  let result = {
    description: "",
    urls: []
  };
  if ((response <= 0, 5 && response > 0.25)) {
    result.description =
      "Hey, \nWhat about taking a break for a couple of seconds. We have a lot of daily tips available for you. Would you like to try our platform with exercises for your eyes? We also have a relaxation program you could like.";
    result.urls = [
      {
        description: "Eyes",
        url:
          "https://play.google.com/store/apps/details?id=com.eyeexamtest.eyecareplus&utm_source=www.eyeexamtest.com&utm_campaign=main-app&utm_medium=install_button&utm_content=apps"
      },
      { description: "Yoga", url: "https://www.myyogaworks.com/" }
    ];
  } else if (response <= 0.75 && response > 0.5) {
    result.description =
      "Hey, \nWhat about empowering yourself to create change in your job? What about taking a step back in your position? You could be willing to take some vacation or plan a feedback meeting with your manager.";
    result.urls = [];
  } else if (response <= 1 && response > 0.75) {
    result.description =
      "Hey, \nYou seem to be overwhelmed these days. Would you like to be connected with advisors? Here is a list of people that could help you in your career development or to take time for yourself.";
    result.urls = [
      {
        description: "Coaching",
        url: "https://www.wellsanfrancisco.com/therapist/individual-therapy/"
      },
      {
        description: "Meditation",
        url: "https://www.aurahealth.io/"
      }
    ];
  } else {
    result.description = "No sign of burn out";
  }
  res.json(result);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`WAW listening on ${port}`);

const router = require("express").Router();
const { google } = require("googleapis");
const oAuth2Client = require("../../GoogAPI/oauth");
const { PicnicEvent, googEventCreator } = require("../../GoogAPI/event.js");

//  this route creates url for google auth pages and requests an Access Token from Google. It stores the ID of a picnic as
// a state so that data can persist throughout the authorization be passed to googEventCreator as an argument.
router.get("/token/:id", async (req, res) => {
  // get a toke
  console.log(req.params.id);

  // generate a url that asks permissions forGoogle Calendar scope
  // 'online' (default) or 'offline' (gets refresh_token)
  // If you only need one scope you can pass it as a string
  const scopes = ["https://www.googleapis.com/auth/calendar"];
  const url = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    state: `${req.params.id}`,
    scope: scopes,
  });
  res.status(302).redirect(url);
});

router.get("/callback", async (req, res) => {
  console.log(req.query.state);
  const ID = req.query.state;

  const { tokens } = await oAuth2Client.getToken(req.query.code);
  oAuth2Client.setCredentials(tokens);
  // console.log(tokens);
  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
  // calls the event creator to handle the DB query and create the event
  // the ID argument comes back from google as a state which was defined inside of the previous route (/token/:id).
  const event = await googEventCreator(ID);
  console.log(
    "----------- ROUTER\n-----------------\nThis Object sent to Google\n"
  );
  console.log(event);

  calendar.events.insert(
    {
      auth: oAuth2Client,
      calendarId: "primary",
      resource: event,
    },
    function (err, event) {
      if (err) {
        console.log(
          "There was an error contacting the Calendar service: " + err
        );
        return;
      }
      console.log("Event created: %s", event.data);
      res.status(302).redirect(event.data.htmlLink);
    }
  );
});

module.exports = router;

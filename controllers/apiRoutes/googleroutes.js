const router = require("express").Router();
const { google } = require("googleapis");
const oAuth2Client = require("../../GoogAPI/oauth");
const { PicnicEvent, googEventCreator } = require("../../GoogAPI/event.js");
const {
  User,
  Picnic,
  Food,
  PicnicUser,
  FoodPicnicUser,
} = require("../../models");

//  this route creates url for google auth pages
router.get("/token/:id", async (req, res) => {
  // get a token from the google
  console.log(req.params.id);

  // generate a url that asks permissions for Blogger and Google Calendar scopes
  const scopes = ["https://www.googleapis.com/auth/calendar"];

  const url = oAuth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: "offline",

    state: `${req.params.id}`,

    // If you only need one scope you can pass it as a string
    scope: scopes,
  });

  res.status(302).redirect(url);
});

router.get("/callback", async (req, res) => {
  console.log(req.query.state);
  const ID = req.query.state;

  const { tokens } = await oAuth2Client.getToken(req.query.code);
  oAuth2Client.setCredentials(tokens);
  console.log(tokens);
  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
  const event = await googEventCreator(ID);
  console.log("----------- ROUTER\n");
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

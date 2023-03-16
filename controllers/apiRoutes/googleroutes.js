const router = require("express").Router();
const { google } = require("googleapis");
const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  // redirect URL
  process.env.GOOGLE_REDIRECT
);

//  this route creates url for google auth pages
router.get("/token", async (req, res) => {
  // get a token from the google

  // generate a url that asks permissions for Blogger and Google Calendar scopes
  const scopes = ["https://www.googleapis.com/auth/calendar"];

  const url = oAuth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: "offline",

    // If you only need one scope you can pass it as a string
    scope: scopes,
  });
  console.log(url);
  res.status(302).redirect(url);
});

router.get("/callback", async (req, res) => {
  console.log(req.query);
  const { tokens } = await oAuth2Client.getToken(req.query.code);
  oAuth2Client.setCredentials(tokens);
  console.log(tokens);
  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
  const event = {
    'summary': 'Google I/O 2015',
    'location': '800 Howard St., San Francisco, CA 94103',
    'description': 'A chance to hear more about Google\'s developer products.',
    'start': {
      'dateTime': '2023-05-28T09:00:00-07:00',
      'timeZone': 'America/Los_Angeles',
    },
    'end': {
      'dateTime': '2023-05-28T17:00:00-07:00',
      'timeZone': 'America/Los_Angeles',
    },
    'recurrence': [
      'RRULE:FREQ=DAILY;COUNT=2'
    ],
    'attendees': [
      {'email': 'lpage@example.com'},
      {'email': 'sbrin@example.com'},
    ],
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
      ],
    },
  };

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
  // const response = await calendar.events.list({
  //   calendarId: "primary",
  //   timeMin: new Date().toISOString(),
  //   maxResults: 10,
  //   singleEvents: true,
  //   orderBy: "startTime",
  // });
  // const events = response.data.items;
  // if (!events || events.length === 0) {
  //   console.log("No upcoming events found.");
  //   return;
  // }
  // console.log("Upcoming 10 events:");
  // events.map((event, i) => {
  //   const start = event.start.dateTime || event.start.date;
  //   console.log(`${start} - ${event.summary}`);
  // });
});
module.exports = router;

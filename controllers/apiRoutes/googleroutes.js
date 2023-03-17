const router = require("express").Router();
const { google } = require("googleapis");
const oAuth2Client = require('../../GoogAPI/oauth'); 
const {PicnicEvent, buildParams,createEndTime,convertDateTime} = require('../../GoogAPI/event.js')
const { User, Picnic, Food, PicnicUser, FoodPicnicUser } = require('../../models');


router.get('/newtab', async (req, res) =>{
  res.send('<html><body><a href="http://localhost:3001/api/goog/token" target="_blank">add to calendar</a></body></html>');
});

//  this route creates url for google auth pages
router.get("/token/:id", async (req, res) => {
  // get a token from the google
  // console.log(req.body)
  console.log(req.params.id)

  // generate a url that asks permissions for Blogger and Google Calendar scopes
  const scopes = ["https://www.googleapis.com/auth/calendar"];

  const url = oAuth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: "offline",
    // state: 3,
    state:`${req.params.id}`,

    // If you only need one scope you can pass it as a string
    scope: scopes,
  });
  // console.log(url);
  
  res.status(302).redirect(url) ;
});

router.get("/callback", async (req, res) => {
  // console.log(req)
  console.log(req.query.state)
  const ID = req.query.state;
  
  const { tokens } =  await oAuth2Client.getToken(req.query.code);
  oAuth2Client.setCredentials(tokens);
  console.log(tokens);
  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
  const myPicnics =  Picnic.findAll({
    include: {
        model: User,
        through: PicnicUser,
    },
    where: {
        id: ID
    },
    order: [['start_time', 'DESC']],
    
})
 
const event1 = myPicnics.then((data)=>{
  const thisPicnic = data[0].dataValues
  const summary = thisPicnic.event_name;
  const location = thisPicnic.address;
  const description = summary
  const start = {
    'dateTime':`${convertDateTime(new Date(thisPicnic.start_time).toISOString())}`,
    'timeZone': 'America/New_York'
  }
  const end ={
    'dateTime':`${convertDateTime(createEndTime(thisPicnic.start_time))}`,
    'timeZone': 'America/New_York'} 
  const attending =thisPicnic.users
  const attendees = []
  // console.log(attending)
  for (invited of attending){
    // const first =invited.dataValues.first_name;
    // const last = invited.dataValues.last_name;
    // const attendee = first.concat(` ${last}`)
    const email = invited.dataValues.email
    attendees.push(`{'email': '${email}'}`)
  }
  const event = new PicnicEvent(summary, location,description, start, end /*attendees*/)

  calendar.events.insert(
    {
      auth: oAuth2Client,
      calendarId: "primary",
      resource:event ,
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
    })
  });
  
  module.exports = router;
  
    // const event3 = 
  //   {
  //         'summary': 'Google I/O 2015',
  //         'location': '800 Howard St., San Francisco, CA 94103',
  //         'description': 'A chance to hear more about Google\'s developer products.',
  //         'start': {
  //             'dateTime': '2023-03-14T23:04:56.000Z',
  //             'timeZone': 'America/New_York',
  //           },
  //           'end': {
  //               'dateTime': '2023-03-14T23:04:56.000Z',
  //               'timeZone': 'America/New_York',
  //             },
  //             'recurrence': [
  //                 'RRULE:FREQ=DAILY;COUNT=2'
  //               ],
  //               'attendees': [
  //                   {'email': 'lpage@example.com'},
  //       {'email': 'sbrin@example.com'},
  //     ],
  //     'reminders': {
  //         'useDefault': false,
  //         'overrides': [
  //             {'method': 'email', 'minutes': 24 * 60},
  //             {'method': 'popup', 'minutes': 10},
  //           ],
  //      },
  //    };
  //    console.log(event3)
    
  //   const event =
  //    {
  //    summary: 'Food Time',
  //    location: '3451 Walnut Street Philadelphia, PA 19104',
  //    description: 'Food Time',
  //    start: {
  //          'dateTime': '2023-05-28T09:00:00-04:00',
  //          'timeZone': 'America/New_York',
  //        },
  //    end: {
  //          'dateTime': '2023-05-28T17:00:00-04:00',
  //          'timeZone': 'America/New_York',
  //        }
  //  }
  //   {
  //    'summary': 'Google I/O 2015',
  //    'location': '800 Howard St., San Francisco, CA 94103',
  //    'description': 'A chance to hear more about Google\'s developer products.',
  //    'start': {
  //      'dateTime': '2023-05-28T09:00:00-07:00',
  //      'timeZone': 'America/New_York',
  //    },
  //    'end': {
  //      'dateTime': '2023-05-28T17:00:00-07:00',
  //      'timeZone': 'America/New_York',
  //    }
  //  }
  
  //   console.log(event)
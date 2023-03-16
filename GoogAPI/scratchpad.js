// code I need to figure out how to deploy to gethub without exposing secrets 
const {google} = require ('googleapis');
const {OAuth2} = google.auth;

const oAuth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID,process.env.GOOGLE_CLIENT_SECRET)
// consider access token, read docs again dummy SDK
oAuth2Client.setCredentials({refresh_token: process.env.GOOGLE_REFRESH_TOKEN})
const calendar = google.calendar({version:'v3', auth: oAuth2Client})

const eventStartTime = new Date()
// sets date for TOMORROW
eventStartTime.setDate(eventStartTime.getDay() + 2)


const eventEndTime = new Date()
// set end time to same day
eventEndTime.setDate(eventEndTime.getDay() + 2)
// set minutes to 45 minutes
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

// minimum requirements for  event object
const event = {
    summary: 'Picnic with the Bunch',
    location: '1327 Snyder Ave, Philadelphia, PA 19148',
    description: 'have a picnic with all your friends!',
    start: {
        dateTime: eventStartTime,
        timeZone: 'America/Denver'
    },
    end: { eventEndTime,
        timeZone: 'America/Denver'
    },
    // optional color id
    colorId:1
}
// free busy query (no way we'll need this for MVP)
calendar.freebusy.query({
    resource: {
        // are there any prescheduled events in this time block?
        timeMin: eventStartTime,
        timeMax: eventEndTime,
        timeZone: 'America/Denver',
        // array of all calendars to query. if user has more than primary calendar, insert list of all calendar ID's
        items: [{id:'primary'}]
    }
}, (err, res) =>{
    if (err) return console.error('query error', err)
    // events is an array 
    const events = res.data.calendars.primary.busy
    if (events.length === 0 ) return calendar.events.insert({calendarID: 'primary', resource: 'event'} ,(err)=> {
        if (err) return console.error('error', err)

        return console.log('event created')
    })
    return console.log('sorry, busy')
} )

//  look at code below to see if you will need. if heroku can .env without exposing secrets this will not be necessary. See 
// ref: https://stackoverflow.com/questions/43405331/how-can-i-use-google-default-credentials-on-heroku-without-the-json-file

// cloud services appear to expect a json object that looks like 
// {
//     "type": "service_account",
//     "project_id": "project-00000000",
//     "private_key_id": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
//     "private_key": "-----BEGIN PRIVATE KEY-----xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-----END PRIVATE KEY-----\n",
//     "client_email": "xxxxxxxxxxxxxxxxx@xxxxxxxx.iam.gserviceaccount.com",
//     "client_id": "xxxxxxxxxxxxxxxxx",
//     "auth_uri": "xxxxxxxxxxxxxxxxx",
//     "token_uri": "xxxxxxxxxxxxxxxxx",
//     "auth_provider_cert_url": "xxxxxxxxxxxxxxxxx",
//     "client_cert_url": "xxxxxxxxxxxxxxxxx"
//   }

// this code might work here too
// const GoogleAuth = require('google-auth-library');

// function authorize() {
//     return new Promise(resolve => {
//         const authFactory = new GoogleAuth();
//         const jwtClient = new authFactory.JWT(
//             process.env.GOOGLE_CLIENT_EMAIL, // defined in Heroku
//             null,
//             process.env.GOOGLE_PRIVATE_KEY, // defined in Heroku
//             ['https://www.googleapis.com/auth/calendar']
//         );

//         jwtClient.authorize(() => resolve(jwtClient));
//     });
// }
// const fs = require('fs');

// async function createJSONFile() {

//   //Replace '\' in environment variable .env file before JSON.stringify() 
//   //so that stringify does not turn it into '\\'
//   //https://stackoverflow.com/a/36439803/13604562
//   jsonFile.private_key = process.env.GCS_JSON_private_key.replace(/\\n/g, '\n');

//   let data = JSON.stringify(jsonFile);
//   //CHECK IF JSON KEYFILE FOR GCS EXISTS. IF NOT, CREATES FILE
//   if (!fs.existsSync(`./${process.env.GCS_KEYFILE}`)) {
//     await fs.writeFile(`./${process.env.GCS_KEYFILE}`, data, function (err) {
//       if (err) {
//         return res.status(400).json(err);
//       }
//     });
//   }
// }

// //JSON file template
// let jsonFile = {
//   type: `${process.env.GCS_JSON_type}`,
//   project_id: `${process.env.GCS_JSON_project_id}`,
//   private_key_id: `${process.env.GCS_JSON_private_key_id}`,
//   private_key: `${process.env.GCS_JSON_private_key}`,
//   client_email: `${process.env.GCS_JSON_client_email}`,
//   client_id: `${process.env.GCS_JSON_client_id}`,
//   auth_uri: `${process.env.GCS_JSON_auth_uri}`,
//   token_uri: `${process.env.GCS_JSON_token_uri}`,
//   auth_provider_x509_cert_url: `${process.env.GCS_JSON_auth_provider_x509_cert_url}`,
//   client_x509_cert_url: `${process.env.GCS_JSON_client_x509_cert_url}`,
// };

// createJSONFile();
//  ref: https://dev.to/sylviapap/setting-heroku-config-vars-with-google-cloud-json-file-on-rails-4dnf


// 

// const Translate = require('@google-cloud/translate');
// const projectId = 'your project id here';

// const translate = new Translate({
//   projectId: projectId,
//   credentials: {
//     private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//     client_email: process.env.GOOGLE_CLIENT_EMAIL
//   }
// });
// const oAuth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID,process.env.GOOGLE_CLIENT_SECRET)
// // consider access token, read docs again dummy SDK
// oAuth2Client.setCredentials({refresh_token: process.env.GOOGLE_REFRESH_TOKEN})
// const calendar = google.calendar({version:'v3', auth: oAuth2Client})

// const eventStartTime = new Date()
// // sets date for TOMORROW
// eventStartTime.setDate(eventStartTime.getDay() + 2)


// const eventEndTime = new Date()
// // set end time to same day
// eventEndTime.setDate(eventEndTime.getDay() + 2)
// // set minutes to 45 minutes
// eventEndTime.setMinutes(eventEndTime.getMinutes() + 60)

// // minimum requirements for  event object
// const event = {
//     summary: 'Picnic with the Bunch',
//     location: '1327 Snyder Ave, Philadelphia, PA 19148',
//     description: 'have a picnic with all your friends!',
//     start: {
//         dateTime: eventStartTime,
//         timeZone: 'America/Denver'
//     },
//     end: { dateTime:eventEndTime,
//         timeZone: 'America/Denver'
//     },
//     // optional color id
//     colorId:1
// }
// // free busy query (no way we'll need this for MVP)
// calendar.freebusy.query({
//     resource: {
//         // are there any prescheduled events in this time block?
//         timeMin: eventStartTime,
//         timeMax: eventEndTime,
//         timeZone: 'America/Denver',
//         // array of all calendars to query. if user has more than primary calendar, insert list of all calendar ID's
//         items: [{id:'primary'}]
//     }
// }, (err, res) =>{
//     if (err) return console.error('query error', err)
//     // events is an array 
//     const events = res.data.calendars.primary.busy
//     if (events.length === 0 ) return calendar.events.insert({calendarId:'primary', resource: event} ,(err)=> {
//         if (err) return console.error('insiide the error message', err)

//         return console.log('event created')
//     })
//     return console.log('sorry, busy ')
// } )

//  datetime format "2023-03-04T16:49:00.827Z"

const fs = require('fs').promises;
// const path = require('path');
// const process = require('process');
// const {authenticate} = require('@google-cloud/local-auth');
// const {google} = require('googleapis');

// // If modifying these scopes, delete token.json.
// const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// // The file token.json stores the user's access and refresh tokens, and is
// // created automatically when the authorization flow completes for the first
// // time.
// const TOKEN_PATH = path.join(process.cwd(), 'token.json');
// const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

// /**
//  * Reads previously authorized credentials from the save file.
//  *
//  * @return {Promise<OAuth2Client|null>}
//  */
// async function loadSavedCredentialsIfExist() {
//   try {
//     const content = await fs.readFile(TOKEN_PATH);
//     const credentials = JSON.parse(content);
//     return google.auth.fromJSON(credentials);
//   } catch (err) {
//     return null;
//   }
// }

// /**
//  * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
//  *
//  * @param {OAuth2Client} client
//  * @return {Promise<void>}
//  */
// async function saveCredentials(client) {
//   const content = await fs.readFile(CREDENTIALS_PATH);
//   const keys = JSON.parse(content);
//   const key = keys.installed || keys.web;
//   const payload = JSON.stringify({
//     type: 'authorized_user',
//     client_id: key.client_id,
//     client_secret: key.client_secret,
//     refresh_token: client.credentials.refresh_token,
//   });
//   await fs.writeFile(TOKEN_PATH, payload);
// }

// /**
//  * Load or request or authorization to call APIs.
//  *
//  */
// async function authorize() {
//   let client = await loadSavedCredentialsIfExist();
//   if (client) {
//     return client;
//   }
//   client = await authenticate({
//     scopes: SCOPES,
//     keyfilePath: CREDENTIALS_PATH,
//   });
//   if (client.credentials) {
//     await saveCredentials(client);
//   }
//   return client;
// }

// /**
//  * Lists the next 10 events on the user's primary calendar.
//  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
//  */
// async function createEvents(auth) {
//   const calendar = google.calendar({version: 'v3', auth});
//   const event = {
//     'summary': 'Google I/O 2015',
//     'location': '800 Howard St., San Francisco, CA 94103',
//     'description': 'A chance to hear more about Google\'s developer products.',
//     'start': {
//       'dateTime': '2015-05-28T09:00:00-07:00',
//       'timeZone': 'America/Los_Angeles',
//     },
//     'end': {
//       'dateTime': '2015-05-28T17:00:00-07:00',
//       'timeZone': 'America/Los_Angeles',
//     },
//     'recurrence': [
//       'RRULE:FREQ=DAILY;COUNT=2'
//     ],
//     'attendees': [
//       {'email': 'lpage@example.com'},
//       {'email': 'sbrin@example.com'},
//     ],
//     'reminders': {
//       'useDefault': false,
//       'overrides': [
//         {'method': 'email', 'minutes': 24 * 60},
//         {'method': 'popup', 'minutes': 10},
//       ],
//     },
//   };
  
//   calendar.events.insert({
//     auth: auth,
//     calendarId: 'primary',
//     resource: event,
//   }, function(err, event) {
//     if (err) {
//       console.log('There was an error contacting the Calendar service: ' + err);
//       return;
//     }
//     console.log('Event created: %s', event.data);
//     fs.writeFile('test.json',JSON.stringify(event),err=> {
//       if(err){
//         console.log(err)
//       }
//      } )
//   });
// }

// authorize().then(createEvents).catch(console.error);


// async function listEvents(auth) {
//   const calendar = google.calendar({version: 'v3', auth});
//   const res = await calendar.events.list({
//     calendarId: 'primary',
//     timeMin: new Date().toISOString(),
//     maxResults: 10,
//     singleEvents: true,
//     orderBy: 'startTime',
//   });
//   const events = res.data.items;
//   if (!events || events.length === 0) {
//     console.log('No upcoming events found.');
//     return;
//   }
//   console.log('Upcoming 10 events:');
//   events.map((event, i) => {
//     const start = event.start.dateTime || event.start.date;
//     console.log(`${start} - ${event.summary}`);
//   });
// }

// authorize().then(listEvents).catch(console.error);
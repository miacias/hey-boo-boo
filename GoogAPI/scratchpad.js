// code I need to figure out how to deploy to gethub without exposing secrets 

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
    return console.log('sorry, busy ')
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

// this code might work here tool
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

const Translate = require('@google-cloud/translate');
const projectId = 'your project id here';

const translate = new Translate({
  projectId: projectId,
  credentials: {
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_CLIENT_EMAIL
  }
});
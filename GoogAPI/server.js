// const path = require ('path')
// const express = require("express");
// const app = express()
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// const PORT = process.env.PORT || 3001;

// app.get('/', (req, res) => {
    //     console.log('page opened')
    //     res.sendFile(path.join(__dirname, 'test.html'));
    //     });
    
    // app.listen(PORT, () => console.log(` Now Listening on port ${PORT}`))
    
    
const {google} = require ('googleapis');
require('dotenv').config()
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
eventEndTime.setMinutes(eventEndTime.getMinutes() + 60)

// minimum requirements for  event object
const event = {
    summary: 'Picnic with the Bunch',
    location: '1327 Snyder Ave, Philadelphia, PA 19148',
    description: 'have a picnic with all your friends!',
    start: {
        dateTime: eventStartTime,
        timeZone: 'America/Denver'
    },
    end: { dateTime:eventEndTime,
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
    if (events.length === 0 ) return calendar.events.insert({calendarId:'primary', resource: event} ,(err)=> {
        if (err) return console.error('insiide the error message', err)

        return console.log('event created')
    })
    return console.log('sorry, busy ')
} )

//  datetime format "2023-03-04T16:49:00.827Z"
// This file will create a class for Calendar events for easy insertion into DB and API requests
const Sequelize = require('sequelize')
const { User, Picnic, Food, PicnicUser, FoodPicnicUser } = require('../models');
const sequelize = require('../config/connection')

class PicnicEvent {
    constructor(summary, location, description, start, end,/*attendees*/){
    this.summary = summary;
    this.location = location;
    this.description = description;
    this.start = start;
    this.end = end
    //this.attendees = attendees
   }

}

// const event = {
// 'summary': 'Google I/O 2015',
// 'location': '800 Howard St., San Francisco, CA 94103',
// 'description': 'A chance to hear more about Google\'s developer products.',
// 'start': {
//   'dateTime': '2023-05-28T09:00:00-07:00',
//   'timeZone': 'America/Los_Angeles',
// },
// 'end': {
//   'dateTime': '2023-05-28T17:00:00-07:00',
//   'timeZone': 'America/Los_Angeles',
// },

// }
 console.log(event)
function buildParams(event){
    const params =[]
for (const key in event){
    params.push(event[key])

}
return params
}
const picnic = new PicnicEvent(...buildParams(event))
// console.log(picnic)

const myPicnics =  Picnic.findAll({
    include: {
        model: User,
        through: PicnicUser,
    },
    where: {
        id: /* this needs to take a dynamic ID... req.session.user_id */  3
    },
    order: [['start_time', 'DESC']],
    
})

function convertDateTime(SQLDateTime){
    const newDateTime = SQLDateTime.slice(0,19);
    const googleDateTime = newDateTime.concat('-04:00')
    return googleDateTime
}
const googleDateTime =convertDateTime(SQLDateTime)


//  used Date to set new time to two hours later.
function createEndTime(startTime){
    const dateTime = new Date(startTime);
    dateTime.setHours(dateTime.getHours() + 2);
    return dateTime.toISOString();
}
// console.log(myPicnics)
 console.log(createEndTime(googleDateTime))
// myPicnics returns a promise, use a .then() to render the resulting object, and assign its properties to variables to be passed into
// the build params function and fed to a new picnic event object to be sent to calendar api.
// IF MYPICNICS IS NOT A PROMISE USE THIS

    // const thisPicnic = myPicnics[0].dataValues
    // const summary = thisPicnic.event_name;
    // const location = thisPicnic.address;
    // const description = summary
    // const start = `{'dateTime':${new Date(thisPicnic.start_time).toISOString()},'timeZone': 'America/New_York',}`
    // const end =`{'dateTime':${createEndTime(thisPicnic.start_time)},'timeZone': 'America/New_York',}` 
    // const attending =thisPicnic.users
    // const newEvent = {summary, location, summary, start, end}
    // const attendees = []
    // // console.log(attending)
    // for (invited of attending){
    //     // const first =invited.dataValues.first_name;
    //     // const last = invited.dataValues.last_name;
    //     // const attendee = first.concat(` ${last}`)
    //     const email = invited.dataValues.email
    //     attendees.push(`{'email': '${email}'}`)
    // }
    // // console.log(attendees)
    // return new PicnicEvent(summary, location, description, start, end, attendees)





// USE BELOW IF MYPICNICS IS A PENDING PROMISE
myPicnics.then((data)=>{
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
    // const start = `{'dateTime':${convertDateTime(new Date(thisPicnic.start_time).toISOString())},'timeZone': 'America/New_York',}`
    // const end =`{'dateTime':${convertDateTime(createEndTime(thisPicnic.start_time))},'timeZone': 'America/New_York',}` 
    const attending =thisPicnic.users
    const newEvent = {summary, location, summary, start, end}
    const attendees = []
    // console.log(attending)
    for (invited of attending){
        // const first =invited.dataValues.first_name;
        // const last = invited.dataValues.last_name;
        // const attendee = first.concat(` ${last}`)
        const email = invited.dataValues.email
        attendees.push(`{'email': '${email}'}`)
    }
    // console.log(attendees)
     console.log(new PicnicEvent(summary, location, description, start, end, attendees))
     return new PicnicEvent(summary, location, description, start, end, attendees)
})





module.exports= {PicnicEvent, buildParams,createEndTime, convertDateTime}



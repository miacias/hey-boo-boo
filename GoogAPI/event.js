// This file will create a class for Calendar events for easy insertion into DB and API requests
const Sequelize = require('sequelize')
const { User, Picnic, Food, PicnicUser, FoodPicnicUser } = require('../models');
const sequelize = require('../config/connection')

class PicnicEvent {
    constructor(summary, location, description, start, end,/*attendees,*/){
    this.summary = summary;
    this.location = location;
    this.description = description;
    this.start = start;
    this.end = end
   }

}

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

}
// console.log(event)
function buildParams(event){
    const params =[]
for (const key in event){
    params.push(event[key])
    // console.log(params)
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
        id: /* req.session.user_id */  3
    },
    order: [['start_time', 'DESC']],
    
})


// const picnics = myPicnics.map((picnic) => {
//     return picnic.get({ plain: true });
// });

// const picnic3 = new PicnicEvent(...buildParams(
    myPicnics.then((data)=>{
    // console.log(data[0])
    const thisPicnic = data[0].dataValues
    const summary = thisPicnic.event_name;
    const location = thisPicnic.address;
    const start = `{'dateTime':${thisPicnic.start_time},'timeZone': 'America/New_York',}`
    const attendees =thisPicnic.users
    const newEvent = {summary, location, summary, start, start}
    console.log(newEvent)
    console.log(new PicnicEvent(summary, location, summary, start, start))
})
// ))



    
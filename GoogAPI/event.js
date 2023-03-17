// This file will create a class for Calendar events for easy insertion into DB and API requests
const Sequelize = require("sequelize");
const { User, Picnic, Food, PicnicUser, FoodPicnicUser } = require("../models");
const sequelize = require("../config/connection");

// create a class for easy transformation of DB information to google Calendar events.
class PicnicEvent {
  constructor(summary, location, description, start, end, attendees) {
    this.summary = summary;
    this.location = location;
    this.description = description;
    this.start = start;
    this.end = end;
    this.attendees = attendees
  }
}
// formats the DateTime  so that the last 6 characters are the timezone offset
// here we are explicitly defining that the TimeZone is Always the EastCoast
// TODO: Make this dynamic
function convertDateTime(SQLDateTime) {
  const newDateTime = SQLDateTime.slice(0, 19);
  const googleDateTime = newDateTime.concat("-04:00");
  return googleDateTime;
}

// The Database only stores information about the start time. Google Requires an End time
// at hey boo boo, our Motto is "stop having fun". So we set the Picnics to last only two hours
// anyone caught picnicking outside their scheduled times is subject to termination from the platform
function createEndTime(startTime) {
  const dateTime = new Date(startTime);
  dateTime.setHours(dateTime.getHours() + 2);
  return dateTime.toISOString();
}

// Function takes in an ID parameter which it uses to query the Database from a picnic who's ID matches.
// Information about that Picnic is transformed using the above functions and stored as a new instance of PicnicEvent. 
// This function is exported to the router where it is called to define the event swent to google.
async function googEventCreator(ID) {
  const myPicnics = Picnic.findAll({
    include: {
      model: User,
      through: PicnicUser,
    },
    where: {
      id: ID,
    },
    order: [["start_time", "DESC"]],
  });

  const event = myPicnics.then((data) => {
    const thisPicnic = data[0].dataValues;
    const summary = thisPicnic.event_name;
    const location = thisPicnic.address;
    const description = summary;
    const start = {
      dateTime: `${convertDateTime(
        new Date(thisPicnic.start_time).toISOString()
      )}`,
      timeZone: "America/New_York",
    };
    const end = {
      dateTime: `${convertDateTime(createEndTime(thisPicnic.start_time))}`,
      timeZone: "America/New_York",
    };
    const attending = thisPicnic.users;
    const attendees = [];
    // console.log(attending)
    for (invited of attending) {
      // const first =invited.dataValues.first_name;
      // const last = invited.dataValues.last_name;
      // const attendee = first.concat(` ${last}`)
      const email = invited.dataValues.email;
      attendees.push({'email': `${email}`});
    }
    const event = new PicnicEvent(
        summary,
        location,
        description,
        start,
        end,
        attendees
        );
        return event;
    })
    return event;
}
module.exports = {
  PicnicEvent,
  googEventCreator,
};

// This file will create a class for Calendar events for easy insertion into DB and API requests
const Sequelize = require("sequelize");
const { User, Picnic, Food, PicnicUser, FoodPicnicUser } = require("../models");
const sequelize = require("../config/connection");


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

function convertDateTime(SQLDateTime) {
  const newDateTime = SQLDateTime.slice(0, 19);
  const googleDateTime = newDateTime.concat("-04:00");
  return googleDateTime;
}

//  used Date to set new time to two hours later.
function createEndTime(startTime) {
  const dateTime = new Date(startTime);
  dateTime.setHours(dateTime.getHours() + 2);
  return dateTime.toISOString();
}


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

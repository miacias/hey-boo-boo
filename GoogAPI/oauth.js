
const {google} = require ('googleapis');
require('dotenv').config()
const {OAuth2} = google.auth;

//  created a new oAuth2 client with the client secrets and a callback URL
const URL = process.env.GOOGLE_REDIRECT ? process.env.GOOGLE_REDIRECT :  "http://localhost:3001/api/goog/callback";
const oAuth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  // redirect URL
  URL
);

module.exports = oAuth2Client
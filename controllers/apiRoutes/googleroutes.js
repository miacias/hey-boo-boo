const router = require('express').Router();

// Create a route for the callback URL
router.get('/callback', async (req, res)=>{
    const { code } = req.query;
    const { tokens } = await oAuth2Client.getToken(code);
    
    // Save the refresh token to the database
    await RefreshToken.create({ token: tokens.refresh_token });
    
    // Redirect the user to a success page
    res.redirect('/success');
});
// Create a route for the user to authorize your application
router.get('/auth', (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar']
  });

  res.redirect(authUrl);
});

// Example route for accessing the user's calendar
router.get('/calendar', async (req, res) => {
  // Retrieve the stored refresh token for the user
  const refreshToken = await RefreshToken.findOne({ where: { id: req.params.id } });

  // Use the refresh token to generate an access token
  oAuth2Client.setCredentials({
    refresh_token: refreshToken.token
  });
  
  // Use the access token to make requests to the Google Calendar API
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
  const events = await calendar.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  });

  res.render('calendar', { events });
});


module.exports= router

// const express = require('express');
// const { google } = require('googleapis');
// const { Sequelize } = require('sequelize');

// const app = express();
// const port = 3000;

// // Create a Sequelize instance to handle database interactions
// const sequelize = new Sequelize('database_name', 'database_user', 'database_password', {
//   host: 'localhost',
//   dialect: 'mysql'
// });

// // Define a model for storing refresh tokens
// const RefreshToken = sequelize.define('refresh_token', {
//   token: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

// // Register your application with Google to obtain oAuth credentials
// const oAuth2Client = new google.auth.OAuth2(
//   'client_id',
//   'client_secret',
//   'http://localhost:3000/callback' // callback URL for your application
// );



// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

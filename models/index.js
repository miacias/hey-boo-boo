const User = require('./User.js');
const Picnic = require('./Picnic.js');
const Food = require('./Food.js');
const PicnicUser = require('./PicnicUser.js');
const FoodPicnicUser = require('./FoodPicnicUser.js');

// many to many - User:Picnic through Food
// User.belongsToMany(Picnic, {
//     through: {
//         model: Food,
//         unique: false
//       },
//       as: 'invitees'
// });

// Picnic.belongsToMany(User, {
//     through: {
//         model: Food,
//         unique: false
//       },
//       as: 'events'
// });

// https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/#the-best-of-both-worlds-the-super-many-to-many-relationship
// team = user
// game = Picnic
// food = player

User.belongsToMany(Picnic, { through: PicnicUser });
Picnic.belongsToMany(User, { through: PicnicUser });
PicnicUser.belongsTo(Picnic);
PicnicUser.belongsTo(User);
Picnic.hasMany(PicnicUser);
User.hasMany(PicnicUser);


Food.belongsToMany(PicnicUser, { through: FoodPicnicUser });
PicnicUser.belongsToMany(Food, { through: FoodPicnicUser });
FoodPicnicUser.belongsTo(Food);
FoodPicnicUser.belongsTo(PicnicUser);
Food.hasMany(FoodPicnicUser);
PicnicUser.hasMany(FoodPicnicUser);




// (async () => {

//   await sequelize.sync();
//   await Player.bulkCreate([
//     { username: 's0me0ne' },
//     { username: 'empty' },
//     { username: 'greenhead' },
//     { username: 'not_spock' },
//     { username: 'bowl_of_petunias' }
//   ]);
//   await Game.bulkCreate([
//     { name: 'The Big Clash' },
//     { name: 'Winter Showdown' },
//     { name: 'Summer Beatdown' }
//   ]);
//   await Team.bulkCreate([
//     { name: 'The Martians' },
//     { name: 'The Earthlings' },
//     { name: 'The Plutonians' }
//   ]);

//   // Let's start defining which teams were in which games. This can be done
//   // in several ways, such as calling `.setTeams` on each game. However, for
//   // brevity, we will use direct `create` calls instead, referring directly
//   // to the IDs we want. We know that IDs are given in order starting from 1.
//   await GameTeam.bulkCreate([
//     { GameId: 1, TeamId: 1 },   // this GameTeam will get id 1
//     { GameId: 1, TeamId: 2 },   // this GameTeam will get id 2
//     { GameId: 2, TeamId: 1 },   // this GameTeam will get id 3
//     { GameId: 2, TeamId: 3 },   // this GameTeam will get id 4
//     { GameId: 3, TeamId: 2 },   // this GameTeam will get id 5
//     { GameId: 3, TeamId: 3 }    // this GameTeam will get id 6
//   ]);

//   // Now let's specify players.
//   // For brevity, let's do it only for the second game (Winter Showdown).
//   // Let's say that that s0me0ne and greenhead played for The Martians, while
//   // not_spock and bowl_of_petunias played for The Plutonians:
//   await PlayerGameTeam.bulkCreate([
//     // In 'Winter Showdown' (i.e. GameTeamIds 3 and 4):
//     { PlayerId: 1, GameTeamId: 3 },   // s0me0ne played for The Martians
//     { PlayerId: 3, GameTeamId: 3 },   // greenhead played for The Martians
//     { PlayerId: 4, GameTeamId: 4 },   // not_spock played for The Plutonians
//     { PlayerId: 5, GameTeamId: 4 }    // bowl_of_petunias played for The Plutonians
//   ]);

//   // Now we can make queries!
//   const game = await Game.findOne({
//     where: {
//       name: "Winter Showdown"
//     },
//     include: {
//       model: GameTeam,
//       include: [
//         {
//           model: Player,
//           through: { attributes: [] } // Hide unwanted `PlayerGameTeam` nested object from results
//         },
//         Team
//       ]
//     }
//   });

//   console.log(`Found game: "${game.name}"`);
//   for (let i = 0; i < game.GameTeams.length; i++) {
//     const team = game.GameTeams[i].Team;
//     const players = game.GameTeams[i].Players;
//     console.log(`- Team "${team.name}" played game "${game.name}" with the following players:`);
//     console.log(players.map(p => `--- ${p.username}`).join('\n'));
//   }

// })();


module.exports = { User, Picnic, Food };
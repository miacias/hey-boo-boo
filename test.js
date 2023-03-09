const axios = require("axios");

const options = {method: 'GET', url: 'https://fatsecret1.p.rapidapi.com/%7BPATH%7D'};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
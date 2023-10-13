const express = require('express');
const app = express();
const port = 3000;
const recipeRouter = require('./src/Routes/recipes');
const mongoose = require("mongoose");


const server = '127.0.0.1:27017';
const database = 'app-db';

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
})

app.use( recipeRouter);

mongoose.connect(`mongodb://${server}/${database}`)
	.then(() => {
		console.log('Database connection successful');
		app.listen(port, () => {
			console.log(`Express app running on port ${port}!`);
		})
	})
	.catch((err) => {
		console.error('Database connection failed');
	});

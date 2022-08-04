// console.log('hello world!')

// const { faker } = require('@faker-js/faker');

// var mysql = require('mysql');

// var connection = mysql.createConnection({
// 	host : 'localhost',
// 	user : 'root',
// 	database : 'join_us'
// });

// var q ='SELECT COUNT(*) AS total FROM users';

// connection.query(q, function (error, results, fields) {
// 	if (error) throw error;
// 	console.log(results[0].total);
// });

// var person = {
// 	email: faker.internet.email(),
// 	created_at: faker.date.past()
// };

// var end_result = connection.query('INSERT INTO users SET ?', person,
// 								 function(err, result) {
// 	if (err) throw err;
// 	console.log(result);
// });

// var q ='INSERT INTO users (email) VALUES ("rusty_the_dog@gmail.com")';

// connection.query(q, function (error, results, fields) {
// 	if (error) throw error;
// 	console.log(results);
// });


// INSERTING LOTS OF DATA
// var data = [];
// for(var i=0; i < 500; i++) {
// data.push([
// 	faker.internet.email(),
// 	faker.date.past()
// ]);
// };

// var q = 'INSERT INTO users (email, created_at) VALUES ?';

// connection.query(q, [data], function(err, result) {
// 	console.log(err);
// 	console.log(result);
// })
// console.log(data);
// connection.end();

// console.log(faker.internet.email());

// console.log(faker.finance.mask());





// WEB APP SECTION
var express = require('express');
var faker = require('faker');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var connection = mysql.createConnection({
	host  : 'localhost',
	user  : 'root',
	database  : 'join_us'
});

app.get("/", function(req, res){
	var q = "SELECT COUNT(*) AS count FROM users";
	connection.query(q, function(err, results){
		if (err) throw err;
		var count = results[0].count;
		// res.send("We have " + count + " users in our db.");
		res.render("home", {data: count});
	});
});

app.post("/register", function(req, res){
	var person = {
		email: req.body.email
	};
	
connection.query('INSERT INTO users SET ?', person, function(err, result){
	if (err) throw err;
	console.log(result);
	res.redirect("/");
	});
});

// app.get("/", function(req, res){
// 	res.send("youve reached the home page!");
// });

app.get("/random-num", function(req, res) {
	var num = Math.floor(Math.random() * 10) + 1;
	res.send("Your lucky number is " + num);
})

app.get("/joke", function(req, res){
	res.send("the only joke here is you.");
});

app.listen(3000, function(){
	console.log('Server running on 3000');
});
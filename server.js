var express = require('express');
var app = express();
var path = require('path');
var router = express.Router();
var nedb = require('nedb-promises')
var	ds = nedb.create({
		filename: 'data/users.db',
		autoload: true
	});


app.listen(3000, function () {
	console.log('Server is running on port 3000');
});

app.use(express.json());

router.get('/', (req, res) => res.sendFile(path.join(__dirname + '/views/index.html')));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/', router);

app.post('/users', (req, res) => {
    let users = req.body;
	ds.insert(users).catch( err => console.log(err));
	res.send('OK');
});

app.get('/users', (req, res) => {
	ds.find()
		.then(user => {
			res.send(user);
			console.log('GET Successful!');
		})
		.catch(err => {
			console.log(err);
		})
});

app.get('/users/:user_id', (req, res) => {
	let user_id = req.params.user_id;
	user_id = parseInt(user_id);
	ds.find({ id: user_id })
		.then(user => {
			res.send(user);
			console.log('GET Successful!');
		})
		.catch(err => {
			console.log(err);
		})
});

app.delete('/users/:user_id', (req, res) => {
	let user_id = req.params.user_id;
	user_id = parseInt(user_id);
	console.log(user_id + ' removed!')
	ds.remove({ id: user_id })
		.then(res.send('OK'))
		.catch(err => console.log(err));
});

app.put('/users/:user_id', (req, res) => {
	let user_id = req.params.user_id;
	user_id = parseInt(user_id);
	console.log(user_id + ' added!');
	ds.update(
		{ id: user_id },
		{ $set: { name: req.body.name } }
	)
	.then(res.send('OK'))
	.catch(err => console.log(err));
});

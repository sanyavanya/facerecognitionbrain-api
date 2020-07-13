const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const id = require('./controllers/id')
const rankup = require('./controllers/rankup')
const gallery = require('./controllers/gallery')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Turns off the SSL requirements. Although not a good solution, this is the only option for completely free Heroku App.
const databaseURL = process.env.DATABASE_URL;
const port = process.env.PORT || 4000;

const db = knex({
  client: 'pg',
  connection: {
    connectionString: databaseURL,
    ssl: true
  }
});

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());

app.get('/', (req, res) => { res.send('connected to facerecognition-api') })

app.post('/signin', (req, res) => signin.handleSignIn(req, res, db, bcrypt))

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt))

app.put('/rankup', (req, res) => rankup.handleRankUp(req, res, db))

app.post('/addimage', (req, res) => rankup.handleAddImage(req, res, db))

app.post('/gallery', (req, res) => gallery.handleGallery(req, res, db))

app.get('/profile/:id', (req, res) => id.handleID(req, res, db))

app.post('/imageurl', (req, res) => rankup.handleAPICall(req, res))

app.listen(port, () =>{
	console.log(`Server is listening on port ${port}.`);
})
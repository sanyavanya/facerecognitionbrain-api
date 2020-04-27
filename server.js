const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const id = require('./controllers/id')
const rankup = require('./controllers/rankup')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'facerecognitionbrain-db'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/signin', (req, res) => signin.handleSignIn(req, res, db, bcrypt))

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt))

app.put('/rankup', (req, res) => rankup.handleRankUp(req,res, db))

app.get('/profile/:id', (req, res) => id.handleID(req,res,db))

app.post('/imageurl', (req, res) => rankup.handleAPICall(req, res))

app.listen(4000, () =>{
	console.log('app is running on port 4000');
})

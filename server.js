const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const id = require('./controllers/id')
const rankup = require('./controllers/rankup')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // idk what exatlty it does, but with this line it all works

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send('it is working')})

app.post('/signin', (req, res) => signin.handleSignIn(req, res, db, bcrypt))

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt))

app.put('/rankup', (req, res) => rankup.handleRankUp(req,res, db))

app.get('/profile/:id', (req, res) => id.handleID(req,res,db))

app.post('/imageurl', (req, res) => rankup.handleAPICall(req, res))

app.listen(process.env.PORT || 4000, () =>{
	console.log(`App is running on port ${process.env.PORT}`);
})

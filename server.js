const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const id = require('./controllers/id')
const rankup = require('./controllers/rankup')

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // idk what exatlty it does, but with this line it all works
const databaseURL = "postgres://lnrwesujnekibu:80412d1885df0107acbedd4ab239db5df9e0e6d9b09a4d57320d9a4494e70742@ec2-54-175-117-212.compute-1.amazonaws.com:5432/ded9lgm8nika9l";
// const databaseURL = process.env.DATABASE_URL;
const port = process.env.PORT || 4000;

const db = knex({
  client: 'pg',
  connection: {
    connectionString: databaseURL,
    ssl: true
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send('Connected to the server.') })

app.post('/signin', (req, res) => signin.handleSignIn(req, res, db, bcrypt))

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt))

app.put('/rankup', (req, res) => rankup.handleRankUp(req,res, db))

app.get('/profile/:id', (req, res) => id.handleID(req,res,db))

app.post('/imageurl', (req, res) => rankup.handleAPICall(req, res))

app.listen(port, () =>{
	console.log(`App is running on port ${port}`);
})
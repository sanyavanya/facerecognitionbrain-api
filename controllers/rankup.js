const Clarifai = require('clarifai');

const app = new Clarifai.App({
   apiKey: 'd7e97c3e763c412a943832bf104ba432'
  });

const handleAPICall = (req, res) => {
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to work with api'))
}



const handleRankUp = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0]);
		})
		.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleRankUp,
	handleAPICall
}
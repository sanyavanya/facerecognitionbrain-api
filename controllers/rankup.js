const Clarifai = require('clarifai');

const app = new Clarifai.App({
   apiKey: process.env.CLARIFAI_API_KEY
  });

const handleAPICall = (req, res) => {
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(406).json("Invalid image link"))
}

const handleRankUp = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0]);
		})
		.catch(err => res.status(500).json('Unable to get entries'))
}

module.exports = {
	handleRankUp,
	handleAPICall
}
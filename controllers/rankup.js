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
	.catch(err => res.status(400).json("Invalid image link"))
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

const handleAddImage = (req, res, db) => {
	const { ownerid, image } = req.body;
	if (ownerid === '' || image === '') return res.status(409).json('Adding image to gallery failed: owner id and image are required');
	console.log(image);
	db.transaction(trx =>{
		trx.insert({
			ownerid: ownerid,
			image: image
		})
		.into('images')
		.returning('image')
		.then(image => res.json(image))// shouldn't actually send the same image in a response, just checking
		.then(trx.commit)
		.catch(err => {trx.rollback; res.status(409).json('Picture not added to gallery')})
	})
	.catch(err => res.status(500).json('There was a problem with our server'))
}

module.exports = {
	handleRankUp,
	handleAPICall,
	handleAddImage
}
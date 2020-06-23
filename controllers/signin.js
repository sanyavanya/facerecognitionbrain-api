const handleSignIn = (req, res, db, bcrypt) => {
	const { email, password } = req.body;
	if (email === '' || password === '') return res.status(401).json('Empty email or password');
	db.select('email', 'hash').from('login')
		.where('email', '=', req.body.email)
		.then(data => {
			const isValid =	bcrypt.compareSync(req.body.password, data[0].hash);
			if (isValid) {
				return db.select('*').from('users').where('email', '=', req.body.email)
				.then(user => res.json(user[0]))
				.catch(err => res.status(500).json('Error logging in'))		
			}
			else res.status(401).json('Wrong username or password');
		})
		.catch(err => res.status(500).json('Error logging in'))
}

module.exports = {
	handleSignIn: handleSignIn
}
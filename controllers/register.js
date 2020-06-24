const handleRegister = (req, res, db, bcrypt) => {
	const { email, name, password } = req.body;
	if (email === '' || name === '' || password === '') return res.status(409).json('All fields are required');
	var hash = bcrypt.hashSync(password);
	db.transaction(trx =>{
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
			.returning('*')
			.insert({
				email: loginEmail[0],
				name: name,
				joined: new Date()
			})
			.then(user => {
				res.json(user[0]);
			})
		})
		.then(trx.commit)
		.catch(err => {trx.rollback; res.status(409).json('A profile with this email already exists')})
	})
	.catch(err => res.status(500).json('There was a problem with our server'))
}

module.exports = {
	handleRegister: handleRegister
}
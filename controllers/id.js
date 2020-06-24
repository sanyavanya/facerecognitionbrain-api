const handleID = (req, res, db) => {
	const { id } = req.params;
	db.select('*').from('users').where({
		id: id
	})
	.then(user => {
		if (user.length === 0) res.status(204).json('No such user');
		else res.json(user[0]);
	})
	.catch(err => res.status(500).json('Error getting user'));
}

module.exports = {
	handleID: handleID
}
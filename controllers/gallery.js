const handleGallery = (req, res, db) => {
  const { ownerid } = req.body;
  db.select('image').from('images').where('ownerid', '=', ownerid)
  .then(stuff => {
    if (stuff.length === 0) res.json('Gallery is empty');
    else res.json(stuff);
  })
  .catch(err => res.status(500).json('Error getting gallery'));
}

module.exports = {
  handleGallery: handleGallery
}
const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('<h1> Oops! 404 Error!<h1> <h2>Try again :)<h2>')
});

module.exports = router;
const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('User route');
})

module.exports = router;
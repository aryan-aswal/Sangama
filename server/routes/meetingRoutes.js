const router = require('express').Router();
const { createToken, fetchMeetingDetails, joinMeeting, fetchMessages } = require('../controllers/Meeting');
const { auth } = require('../middleware/auth');

router.post('/create-token', auth,  createToken);
router.get('/fetch-meeting-details',auth, fetchMeetingDetails);
router.post('/join-meeting',auth, joinMeeting);
router.get('/fetch-messages', auth, fetchMessages);
module.exports = router;
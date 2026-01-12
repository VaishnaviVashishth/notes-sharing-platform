const router = require('express').Router();
const Note = require('../Note');
const User = require('../User');
const ADMIN_ID = process.env.ADMIN_EMAIL;
const ADMIN_PASS = process.env.ADMIN_PASS;

router.post('/login', (req, res) => {
  if (req.body.id === ADMIN_ID && req.body.password === ADMIN_PASS) {
    res.json({ msg: 'Admin login success' });
  } else {
    res.status(401).json({ msg: 'Invalid credentials' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Note deleted' });
});

module.exports = router;
router.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});
router.get('/notes', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

const router = require('express').Router();
const User = require('../User');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);

  await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashed
  });

  res.json({ msg: 'Registered successfully' });
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ msg: 'User not found' });

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(400).json({ msg: 'Wrong password' });

  res.json({ msg: 'Login success', user });
});

module.exports = router;

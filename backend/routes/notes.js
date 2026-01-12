const router = require('express').Router();
const Note = require('../Note');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDF allowed'));
  }
});

router.post('/upload', upload.single('pdf'), async (req, res) => {
  await Note.create({
    title: req.body.title,
    subject: req.body.subject,
    filePath: req.file.filename,   // ✅ ONLY filename
    uploadedBy: req.body.uploadedBy
  });

  res.json({ msg: 'Note uploaded' });
});


router.get('/', async (req, res) => {
  let filter = {};

  if (req.query.subject) filter.subject = req.query.subject;
  if (req.query.search)
    filter.title = { $regex: req.query.search, $options: 'i' };

  const notes = await Note.find(filter);
  res.json(notes);
});

router.post('/like/:id', async (req, res) => {
  const note = await Note.findById(req.params.id);
  note.likes++;
  await note.save();
  res.json({ msg: 'Liked' });
});

module.exports = router;

const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: String,
  subject: String,
  filePath: String,
  uploadedBy: String,
  likes: { type: Number, default: 0 },
  uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', NoteSchema);

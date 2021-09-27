const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = Schema({
  username: { type: String, require: true, trim: true },
  email: { type: String, require: true, unique: true, lowercase: true },
  password: { type: String, required: true, minLength: 8 },
  role: { type: String, default: 'USER' },
  status: { type: String, default: 'ACTIVE' },
  rankingId: { type: Schema.Types.ObjectId },
});

const User = mongoose.model('user', userSchema, 'user');

module.exports = User;

// backend/src/models/Session.js
import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});
export default mongoose.model('Session', sessionSchema);

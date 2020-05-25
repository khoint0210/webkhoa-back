import mongoose, { Schema } from 'mongoose';

const ContactSchema = new Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  engContent: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  isRemoved: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Contact', ContactSchema);

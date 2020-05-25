import mongoose, { Schema } from 'mongoose';

const UtilityDocumentSchema = new Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  engContent: {
    type: String,
    trim: true,
  },
  url: {
    type: String,
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

export default mongoose.model('UtilityDocument', UtilityDocumentSchema);

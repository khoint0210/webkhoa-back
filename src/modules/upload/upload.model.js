import mongoose, { Schema } from 'mongoose';

const UploadModel = new Schema({
  originalname: {
    type: String,
  },
  mimetype: {
    type: String,
  },
  location: {
    type: String,
  },
  fieldname: {
    type: String,
  },
  size: {
    type: Number,
  },
  encoding: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  isRemoved: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Upload', UploadModel);

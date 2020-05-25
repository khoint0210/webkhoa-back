import mongoose, { Schema } from 'mongoose';

const SponsorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    isRemoved: {
      type: Boolean,
      default: false,
    },
  }
);

export default mongoose.model('Sponsor', SponsorSchema);

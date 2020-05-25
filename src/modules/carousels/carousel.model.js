import mongoose, { Schema } from 'mongoose';

const CarouselModel = new Schema({
  image: {
    type: String,
    trim: true,
    required: true,
  },
  title: {
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 100,
  },
  engTitle: {
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 100,
  },
  articleUrl: {
    type: String,
    trim: true,
  },
  engArticleUrl: {
    type: String,
    trim: true,
  },
  active: {
    type: Boolean,
    default: true,
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

export default mongoose.model('Carousel', CarouselModel);

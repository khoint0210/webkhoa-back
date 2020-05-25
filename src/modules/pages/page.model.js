import mongoose, { Schema } from 'mongoose';
import slug from 'slug';

const PageSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [5, 'Title must longer than 5'],
    maxlength: [100, 'Title must shorter than 100'],
  },
  language: {
    type: String,
    trim: true,
    default: 'vi',
  },
  slug: {
    type: String,
    trim: true,
    lowercase: true,
  },
  content: {
    type: String,
    trim: true,
  },
  featuredImage: {
    type: String,
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isRemoved: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

PageSchema.pre('validate', function (next) {
  this.slugify();
  next();
});

PageSchema.methods = {
  slugify() {
    this.slug = slug(this.title);
  },
  toJSON() {
    return {
      _id: this._id,
      title: this.title,
      slug: this.slug,
      language: this.language,
      content: this.content,
      featuredImage: this.featuredImage,
      user: this.user,
      createdAt: this.createdAt,
    };
  },
};

export default mongoose.model('Page', PageSchema);

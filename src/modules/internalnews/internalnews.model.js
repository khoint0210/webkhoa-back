import mongoose, { Schema } from 'mongoose';
import slug from 'slug';

const InternalNewsSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [10, 'Title must longer than 10'],
    maxlength: [100, 'Title must shorter than 100'],
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
  attachments: [
    {
      type: String,
      trim: true,
    },
  ],
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

InternalNewsSchema.pre('validate', function (next) {
  this.slugify();
  next();
});

InternalNewsSchema.statics = {
  createInternalNews(args, user) {
    return this.create({
      ...args,
      user,
    });
  },
  list({ skip = 0, limit = 50 } = {}) {
    return this.find({ isRemoved: false })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user');
  },
};

InternalNewsSchema.methods = {
  slugify() {
    this.slug = slug(this.title);
  },
  toJSON() {
    return {
      _id: this._id,
      title: this.title,
      slug: this.slug,
      content: this.content,
      featuredImage: this.featuredImage,
      attachments: this.attachments,
      user: this.user,
      createdAt: this.createdAt,
    };
  },
};

export default mongoose.model('InternalNews', InternalNewsSchema);

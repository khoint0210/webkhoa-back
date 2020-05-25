import mongoose, { Schema } from 'mongoose';
import slug from 'slug';

const AttachmentSchema = new Schema({
  uid: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    trim: true,
  },
  url: {
    type: String,
    trim: true,
  },
});

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
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
  language: {
    type: String,
    trim: true,
    default: 'vi', // ['vi', 'en']
  },
  highlight: {
    type: Boolean,
    default: false,
  },
  featuredImage: {
    type: String,
    trim: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  attachments: [AttachmentSchema],
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

ArticleSchema.pre('validate', function (next) {
  this.slugify();
  next();
});

ArticleSchema.statics = {
  createArticle(args, user) {
    return this.create({
      ...args,
      user,
    });
  },
  list({ skip = 0, limit = 50, category } = {}) {
    const queries = category ? { isRemoved: false, category } : { isRemoved: false };
    return this.find(queries)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user category');
  },
};

ArticleSchema.methods = {
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
      attachments: this.attachments,
      category: this.category,
      user: this.user,
      createdAt: this.createdAt,
      highlight: this.highlight,
    };
  },
};

// ArticleSchema.index({ title: 'text' }, { default_language: 'en', language_override: 'en' });

export default mongoose.model('Article', ArticleSchema);

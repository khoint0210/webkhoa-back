import mongoose, { Schema } from 'mongoose';
import slug from 'slug';

const CategorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [3, 'Name must longer than 3'],
    maxlength: [30, 'Name must shorter than 30'],
    unique: [true, 'Name must be unique'],
  },
  engName: {
    type: String,
    trim: true,
    minlength: [3, 'English name must longer than 3'],
    maxlength: [30, 'English name must shorter than 30'],
  },
  isAnnouncement: {
    type: Boolean,
    default: false,
  },
  featuredImage: {
    type: String,
    trim: true,
  },
  slug: {
    type: String,
    trim: true,
    lowercase: true,
  },
  widgetPosition: {
    type: Number,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  roles: [{
    type: Number,
    default: 1,
  }],
  isRemoved: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

CategorySchema.pre('validate', function (next) {
  this.slugify();
  next();
});

CategorySchema.methods = {
  slugify() {
    this.slug = slug(this.name);
  },
  toJSON() {
    return {
      _id: this._id,
      name: this.name,
      engName: this.engName,
      featuredImage: this.featuredImage,
      user: this.user,
      createdAt: this.createdAt,
      slug: this.slug,
      widgetPosition: this.widgetPosition,
      isAnnouncement: this.isAnnouncement,
      roles: this.roles,
    };
  },
};

CategorySchema.statics = {
  createCategory(args, user) {
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

export default mongoose.model('Category', CategorySchema);

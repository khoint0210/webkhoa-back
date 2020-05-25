import mongoose, { Schema } from 'mongoose';
import { compareSync, hashSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

import constants from '../../config/constants';

const UserSchema = new Schema({
  lecturerId: {
    type: String,
    required: true,
    unique: [true, 'Lecturer ID must be unique'],
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, 'Fullname must longer than 3'],
    // maxlength: [30, 'Fullname must shorter than 30'],
  },
  position: {
    type: String,
    trim: true,
    // maxlength: [50, 'Position must shorter than 50'],
  },
  degree: {
    type: String,
    trim: true,
    // maxlength: [50, 'Position must shorter than 50'],
  },
  academicRank: {
    type: String,
    trim: true,
    // maxlength: [100, 'Academic rank must shorter than 100'],
  },
  major: {
    type: String,
    trim: true,
    // maxlength: [100, 'Major rank must shorter than 100'],
  },
  department: {
    type: Number,
    default: 0,
  },
  phone: {
    type: String,
    trim: true,
    // maxlength: [20, 'Phone must shorter than 20'],
  },
  role: [{
    type: Number,
  }],
  email: {
    type: String,
    trim: true,
    // unique: true,
  },
  avatar: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
    // minlength: [3, 'Website must longer than 3'],
    // maxlength: [30, 'Website must shorter than 30'],
  },
  background: {
    type: String,
    trim: true,
    // minlength: [10, 'Background must longer than 10'],
    // maxlength: [500, 'Background must shorter than 500'],
  },
  researchField: {
    type: String,
    trim: true,
    // minlength: [10, 'Background must longer than 10'],
    // maxlength: [500, 'Background must shorter than 500'],
  },
  achievements: {
    type: String,
    trim: true,
    // minlength: [10, 'Background must longer than 10'],
    // maxlength: [1000, 'Background must shorter than 1000'],
  },
  journal: {
    type: String,
    trim: true,
    // minlength: [10, 'Background must longer than 10'],
    // maxlength: [1000, 'Background must shorter than 1000'],
  },
  textbook: {
    type: String,
    trim: true,
    // minlength: [10, 'Background must longer than 10'],
    // maxlength: [1000, 'Background must shorter than 1000'],
  },
  project: {
    type: String,
    trim: true,
    // minlength: [10, 'Background must longer than 10'],
    // maxlength: [1000, 'Background must shorter than 1000'],
  },
  fileUrl: {
    type: String,
    trim: true,
  },
  fileName: {
    type: String,
    trim: true,
  },
  isRemoved: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this.hashPassword(this.password);
  }
  return next();
});

UserSchema.methods = {
  hashPassword(password) {
    return hashSync(password);
  },
  authenticateUser(password) {
    return compareSync(password, this.password);
  },
  createToken() {
    return jwt.sign(
      {
        _id: this._id,
      },
      constants.JWT_SECRET,
    );
  },
  toJSON() {
    return {
      _id: this._id,
      lecturerId: this.lecturerId,
      username: this.username,
      fullname: this.fullname,
      role: this.role,
      email: this.email,
      phone: this.phone,
      avatar: this.avatar,
      website: this.website,
      major: this.major,
      background: this.background,
      position: this.position,
      department: this.department,
      degree: this.degree,
      academicRank: this.academicRank,
      researchField: this.researchField,
      journal: this.journal,
      textbook: this.textbook,
      project: this.project,
      achievements: this.achievements,
      fileName: this.fileName,
      fileUrl: this.fileUrl,
    };
  },
  toAuthJSON() {
    return {
      ...this.toJSON(),
      token: `JWT ${this.createToken()}`,
    };
  },
};

export default mongoose.model('User', UserSchema);

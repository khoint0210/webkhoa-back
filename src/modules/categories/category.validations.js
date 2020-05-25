import Joi from 'joi';

export default {
  createCategory: {
    body: {
      name: Joi.string().min(3).max(30).required(),
      engName: Joi.string().min(3).max(30),
      featuredImage: Joi.string(),
      widgetPosition: Joi.number(),
      isAnnouncement: Joi.boolean(),
      roles: Joi.array().items(Joi.number()),
    },
  },
  editCategory: {
    body: {
      name: Joi.string().min(3).max(30),
      featuredImage: Joi.string(),
      engName: Joi.string().min(3).max(30),
      widgetPosition: Joi.number(),
      isAnnouncement: Joi.boolean(),
      roles: Joi.array().items(Joi.number()),
    },
  },
};

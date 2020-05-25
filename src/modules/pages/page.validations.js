import Joi from 'joi';

export default {
  createPage: {
    body: {
      title: Joi.string().min(5).max(100).required(),
      content: Joi.string(),
      language: Joi.string(),
      featuredImage: Joi.string(),
    },
  },
  editPage: {
    body: {
      title: Joi.string().min(5).max(100).required(),
      content: Joi.string(),
      language: Joi.string(),
      featuredImage: Joi.string(),
    },
  },
};

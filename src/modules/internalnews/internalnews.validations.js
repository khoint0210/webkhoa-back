import Joi from 'joi';

export default {
  createInternalNews: {
    body: {
      featuredImage: Joi.string(),
      title: Joi.string().min(10).max(100),
      content: Joi.string(),
      attachments: Joi.array().items(Joi.string()),
    },
  },
  editInternalNews: {
    body: {
      featuredImage: Joi.string(),
      title: Joi.string().min(10).max(100),
      content: Joi.string(),
      attachments: Joi.array().items(Joi.string()),
    },
  },
};

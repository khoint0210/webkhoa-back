import Joi from 'joi';

export default {
  createArticle: {
    body: {
      title: Joi.string().required(),
      content: Joi.string(),
      featuredImage: Joi.string(),
      category: Joi.string(),
      language: Joi.string(),
      attachments: Joi.array(),
      highlight: Joi.boolean(),
    },
  },
  editArticle: {
    body: {
      title: Joi.string().required(),
      content: Joi.string(),
      featuredImage: Joi.string(),
      language: Joi.string(),
      category: Joi.string(),
      attachments: Joi.array(),
      highlight: Joi.boolean(),
    },
  },
};

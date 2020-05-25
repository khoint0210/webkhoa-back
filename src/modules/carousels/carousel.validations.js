import Joi from 'joi';

export default {
  createCarousel: {
    body: {
      image: Joi.string(),
      title: Joi.string().min(5).max(100),
      engTitle: Joi.string().min(5).max(100),
      articleUrl: Joi.string(),
      engArticleUrl: Joi.string(),
      active: Joi.boolean(),
    },
  },
  editCarousel: {
    body: {
      image: Joi.string(),
      title: Joi.string().min(5).max(100),
      engTitle: Joi.string().min(5).max(100),
      articleUrl: Joi.string(),
      engArticleUrl: Joi.string(),
      active: Joi.boolean(),
    },
  },
};

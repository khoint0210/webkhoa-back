import Joi from 'joi';

export default {
  createDocument: {
    body: {
      name: Joi.string(),
      url: Joi.string(),
    },
  },
  editDocument: {
    body: {
      name: Joi.string(),
      url: Joi.string(),
    },
  },
};

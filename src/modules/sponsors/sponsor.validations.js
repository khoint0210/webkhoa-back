import Joi from 'joi';

export default {
  createSponsor: {
    body: {
      name: Joi.string().required(),
      link: Joi.string(),
      image: Joi.string(),
    },
  },
  editSponsor: {
    body: {
      name: Joi.string().required(),
      link: Joi.string(),
      image: Joi.string(),
    },
  },
};

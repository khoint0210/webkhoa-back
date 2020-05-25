import { Router } from 'express';
import validate from 'express-validation';

import * as carouselController from './carousel.controllers';
import carouselValidation from './carousel.validations';
import { authJwt } from '../../services/auth.services';
import { roleAdmin } from '../../services/role.services';

const routes = new Router();

routes.get('/', carouselController.getCarouselList);
routes.post('/', authJwt, roleAdmin, validate(carouselValidation.createCarousel), carouselController.createCarousel);
routes.patch('/:id', authJwt, roleAdmin, validate(carouselValidation.editCarousel), carouselController.updateCarousel);
routes.delete('/:id', authJwt, roleAdmin, carouselController.deleteCarousel);

export default routes;

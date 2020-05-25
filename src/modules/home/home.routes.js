import { Router } from 'express';

import * as homeController from './home.controllers';
import { authJwt } from '../../services/auth.services';
import { roleAdmin } from '../../services/role.services';

const routes = new Router();

routes.get('/', homeController.initial);
routes.get('/contact', homeController.getContact);
routes.post('/search', homeController.search);
routes.post('/contact', authJwt, roleAdmin, homeController.addContact);
routes.patch('/contact/:id', authJwt, roleAdmin, homeController.updateContact);
routes.delete('/contact/:id', authJwt, roleAdmin, homeController.deleteContact);
routes.get('/utility-document', homeController.getUtilityDocument);
routes.post('/utility-document', authJwt, roleAdmin, homeController.addUtilityDocument);
routes.patch('/utility-document/:id', authJwt, roleAdmin, homeController.updateUtilityDocument);
routes.delete('/utility-document/:id', authJwt, roleAdmin, homeController.deleteUtilityDocument);

export default routes;

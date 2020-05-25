import { Router } from 'express';
import validate from 'express-validation';

import * as pageController from './page.controllers';
import pageValidation from './page.validations';
import { authJwt } from '../../services/auth.services';
import { roleAdmin } from '../../services/role.services';

const routes = new Router();

routes.get('/detail/:id', pageController.getPage);
routes.get('/list', authJwt, roleAdmin, pageController.getPageList);
routes.post('/', authJwt, roleAdmin, validate(pageValidation.createPage), pageController.createPage);
routes.patch('/:id', authJwt, roleAdmin, validate(pageValidation.editPage), pageController.updatePage);
routes.delete('/:id', authJwt, roleAdmin, pageController.deletePage);

export default routes;

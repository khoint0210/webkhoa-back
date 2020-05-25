import { Router } from 'express';
import validate from 'express-validation';

import * as internalnewsController from './internalnews.controllers';
import internalnewsValidation from './internalnews.validations';
import { authJwt } from '../../services/auth.services';
import { roleAdmin } from '../../services/role.services';

const routes = new Router();

routes.get('/', authJwt, internalnewsController.getInternalNewsList);
routes.post('/', authJwt, roleAdmin, validate(internalnewsValidation.createInternalNews), internalnewsController.createInternalNews);
routes.patch('/:id', authJwt, roleAdmin, validate(internalnewsValidation.editInternalNews), internalnewsController.updateInternalNews);
routes.delete('/:id', authJwt, roleAdmin, internalnewsController.deleteInternalNews);

export default routes;

import { Router } from 'express';
import validate from 'express-validation';

import * as categoryController from './category.controllers';
import categoryValidation from './category.validations';
import { authJwt } from '../../services/auth.services';

const routes = new Router();

routes.get('/', categoryController.getCategoryList);
routes.get('/:id', categoryController.getCategory);
routes.post('/', authJwt, validate(categoryValidation.createCategory), categoryController.createCategory);
routes.patch('/:id', authJwt, validate(categoryValidation.editCategory), categoryController.updateCategory);
routes.delete('/:id', authJwt, categoryController.deleteCategory);

export default routes;

import { Router } from 'express';
import validate from 'express-validation';

import * as userController from './user.controllers';
import userValidation from './user.validations';
import { authLocal, authJwt } from '../../services/auth.services';

const routes = new Router();

routes.get('/', authJwt, userController.getUserList);
routes.get('/lecturer', userController.getLecturerList);
routes.get('/lecturer/:id', userController.getLecturerDetail);
routes.post('/register', validate(userValidation.register), userController.createUser);
routes.post('/login', authLocal, validate(userValidation.login), userController.authUser);
routes.patch('/:id', authJwt, validate(userValidation.editProfile), userController.updateUser);
routes.delete('/:id', authJwt, userController.deleteUser);

export default routes;

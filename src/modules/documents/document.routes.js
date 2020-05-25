import { Router } from 'express';
import validate from 'express-validation';

import * as documentController from './document.controllers';
import documentValidation from './document.validations';
import { authJwt } from '../../services/auth.services';

const routes = new Router();

routes.get('/', documentController.getDocumentList);
routes.post('/', authJwt, validate(documentValidation.createDocument), documentController.createDocument);
routes.patch('/:id', authJwt, validate(documentValidation.editDocument), documentController.updateDocument);
routes.delete('/:id', authJwt, documentController.deleteDocument);

export default routes;

import { Router } from 'express';

import * as uploadController from './upload.controllers';
import { authJwt } from '../../services/auth.services';
import upload from '../../services/file.services';

const routes = new Router();

routes.get('/', uploadController.getUploadList);
routes.post('/', upload.single('file'), authJwt, uploadController.createUpload);
routes.patch('/:id', upload.single('file'), authJwt, uploadController.updateUpload);
routes.delete('/:id', authJwt, uploadController.deleteUpload);

export default routes;

import { Router } from 'express';
import validate from 'express-validation';

import * as sponsorController from './sponsor.controllers';
import sponsorValidation from './sponsor.validations';
import { authJwt } from '../../services/auth.services';
import { roleAdmin } from '../../services/role.services';

const routes = new Router();

routes.get('/', sponsorController.getSponsorList);
routes.post('/', authJwt, roleAdmin, validate(sponsorValidation.createSponsor), sponsorController.createSponsor);
routes.patch('/:id', authJwt, roleAdmin, validate(sponsorValidation.editSponsor), sponsorController.updateSponsor);
routes.delete('/:id', authJwt, roleAdmin, sponsorController.deleteSponsor);

export default routes;

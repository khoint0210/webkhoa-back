import { Router } from 'express';

import * as dashboardController from './dashboard.controllers';
import { authJwt } from '../../services/auth.services';
import { roleAdmin } from '../../services/role.services';

const routes = new Router();

routes.get('/', authJwt, roleAdmin, dashboardController.getDashboard);

export default routes;

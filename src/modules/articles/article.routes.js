import { Router } from 'express';
import validate from 'express-validation';

import * as articleController from './article.controllers';
import articleValidation from './article.validations';
import { authJwt } from '../../services/auth.services';
import { roleArticleManager } from '../../services/role.services';

const routes = new Router();

// routes.get('/', articleController.getArticleList);
routes.get('/', authJwt, articleController.getUserArticleList);
routes.get('/detail/:id', articleController.getDetailArticle);
routes.get('/list', authJwt, roleArticleManager, articleController.getArticleList);
routes.get('/announcements', articleController.getAnnouncements);
routes.post('/', authJwt, validate(articleValidation.createArticle), articleController.createArticle);
routes.patch('/:id', authJwt, validate(articleValidation.editArticle), articleController.updateArticle);
routes.delete('/:id', authJwt, articleController.deleteArticle);

export default routes;

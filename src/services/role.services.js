import HTTPStatus from 'http-status';

export function roleAdmin(req, res, next) {
  if (req.user.role.indexOf(1) === -1) {
    return res.sendStatus(HTTPStatus.FORBIDDEN);
  }
  return next();
}

export function roleArticleManager(req, res, next) {
  if (req.user.role.indexOf(1) === -1 && req.user.role.indexOf(7) === -1) {
    return res.sendStatus(HTTPStatus.FORBIDDEN);
  }
  return next();
}

export function canManageArticle(role) {
  return (role.indexOf(1) > -1 || role.indexOf(7) > -1);
}

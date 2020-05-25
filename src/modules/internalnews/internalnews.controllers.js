import HTTPStatus from 'http-status';

import InternalNews from './internalnews.model';

export async function getInternalNewsList(req, res) {
  const limit = parseInt(req.query.limit, 0) || 50;
  const skip = parseInt(req.query.skip, 0) || 0;

  try {
    const internalnewses = await InternalNews.list({ limit, skip });

    return res.status(HTTPStatus.OK).json(internalnewses);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function createInternalNews(req, res) {
  try {
    const internalnews = await InternalNews.createInternalNews(req.body, req.user._id);

    return res.status(HTTPStatus.CREATED).json(internalnews);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
}

export async function updateInternalNews(req, res) {
  try {
    const internalnews = await InternalNews.findOne({ _id: req.params.id, isRemoved: false });
    if (!internalnews || !internalnews.user.equals(req.user._id)) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    Object.keys(req.body).forEach(key => {
      internalnews[key] = req.body[key];
    });

    return res.status(HTTPStatus.OK).json(await internalnews.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
}

export async function deleteInternalNews(req, res) {
  try {
    const internalnews = await InternalNews.findOne({ _id: req.params.id, isRemoved: false });
    if (!internalnews || !internalnews.user.equals(req.user._id)) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    internalnews.isRemoved = true;

    return res.status(HTTPStatus.OK).json(await internalnews.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
}

import HTTPStatus from 'http-status';

import Article from './article.model';
import Category from '../categories/category.model';

import { canManageArticle } from '../../services/role.services';

export async function getArticleList(req, res) {
  const limit = parseInt(req.query.limit, 0) || 50;
  const skip = parseInt(req.query.skip, 0) || 0;
  const category = req.query.category;
  try {
    const articles = await Article
      .list({ limit, skip, category });
    const total = await Article.count({ isRemoved: false });

    return res.status(HTTPStatus.OK).json({ articles, total });
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getDetailArticle(req, res) {
  try {
    const article = await Article
      .findOne({ _id: req.params.id, isRemoved: false })
      .populate('user category');
    if (!article) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    return res.status(HTTPStatus.OK).json(article);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getAnnouncements(req, res) {
  const limit = parseInt(req.query.limit, 0) || 50;
  const skip = parseInt(req.query.skip, 0) || 0;

  try {
    let articles = [];
    const category = await Category.findOne({ isAnnouncement: true, isRemoved: false });
    if (category) {
      articles = await Article.list({ limit, skip, category }).sort({ createdAt: -1 });
    }

    return res.status(HTTPStatus.OK).json(articles);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getUserArticleList(req, res) {
  const limit = parseInt(req.query.limit, 0) || 50;
  const skip = parseInt(req.query.skip, 0) || 0;

  try {
    const articles = await Article
      .find({ user: req.user._id, isRemoved: false })
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .populate('category user');
    const total = await Article.count({ user: req.user._id, isRemoved: false });

    return res.status(HTTPStatus.OK).json({ articles, total });
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function createArticle(req, res) {
  try {
    const article = await Article.createArticle(req.body, req.user._id);

    return res.status(HTTPStatus.CREATED).json(article);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
}

export async function updateArticle(req, res) {
  try {
    const article = await Article.findOne({ _id: req.params.id, isRemoved: false });
    if (!article || (!article.user.equals(req.user._id) && !canManageArticle(req.user.role))) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    Object.keys(req.body).forEach(key => {
      article[key] = req.body[key];
    });

    return res.status(HTTPStatus.OK).json(await article.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
}

export async function deleteArticle(req, res) {
  try {
    const article = await Article.findOne({ _id: req.params.id, isRemoved: false });
    if (!article || (!article.user.equals(req.user._id) && !canManageArticle(req.user.role))) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    article.isRemoved = true;

    return res.status(HTTPStatus.OK).json(await article.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
}

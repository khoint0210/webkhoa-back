import HTTPStatus from 'http-status';

import User from './user.model';
import Article from '../articles/article.model';
import Document from '../documents/document.model';

export async function getUserList(req, res) {
  const limit = parseInt(req.query.limit, 0) || 50;
  const skip = parseInt(req.query.skip, 0) || 0;
  try {
    const users = await User.find({ isRemoved: false })
      .sort({ fullname: 1 })
      .skip(skip)
      .limit(limit);
    const total = await User.count();

    return res.status(HTTPStatus.OK).json({ users, total });
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getLecturerList(req, res) {
  try {
    const users = await User.find({ role: 2, isRemoved: false })
      .sort({ fullname: 1 });

    return res.status(HTTPStatus.OK).json(users);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getLecturerDetail(req, res) {
  try {
    const user = await User.findOne({ lecturerId: req.params.id, isRemoved: false });
    if (!user) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }
    const articles = await Article
      .find({ user: user._id, isRemoved: false, category: '5b120b489d20066f49c6559a' })
      .sort({ createdAt: -1 });
    const documents = await Document.find({ user: user._id, isRemoved: false });

    return res.status(HTTPStatus.OK).json({
      ...user.toJSON(),
      articles,
      documents,
    });
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function createUser(req, res) {
  try {
    const user = await User.create({ ...req.body });

    return res.status(HTTPStatus.CREATED).json(user.toAuthJSON());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
}

export async function authUser(req, res, next) {
  try {
    res.status(HTTPStatus.OK).json(req.user.toAuthJSON());

    return next();
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
}

export async function updateUser(req, res) {
  try {
    const user = await User.findOne({ lecturerId: req.params.id, isRemoved: false });
    if (!user) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    Object.keys(req.body).forEach(key => {
      user[key] = req.body[key];
    });

    return res.status(HTTPStatus.OK).json(await user.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
}

export async function deleteUser(req, res) {
  try {
    const user = await User.findOne({ lecturerId: req.params.id, isRemoved: false });
    if (!user) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    user.isRemoved = true;

    return res.status(HTTPStatus.OK).json(await user.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
}

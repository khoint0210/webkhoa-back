import HTTPStatus from 'http-status';

import Page from './page.model';

export async function getPageList(req, res) {
  try {
    const pages = await Page.find({ isRemoved: false }).populate('user');

    return res.status(HTTPStatus.OK).json(pages);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getPage(req, res) {
  try {
    const page = await Page.findOne({ _id: req.params.id, isRemoved: false }).populate('user');

    return res.status(HTTPStatus.OK).json(page);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function createPage(req, res) {
  try {
    const page = await Page.create({ ...req.body, user: req.user._id });

    return res.status(HTTPStatus.CREATED).json(page);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
}

export async function updatePage(req, res) {
  try {
    const page = await Page.findOne({ _id: req.params.id, isRemoved: false });
    if (!page || !page.user.equals(req.user._id)) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    Object.keys(req.body).forEach(key => {
      page[key] = req.body[key];
    });

    return res.status(HTTPStatus.OK).json(await page.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
}

export async function deletePage(req, res) {
  try {
    const page = await Page.findOne({ _id: req.params.id, isRemoved: false });
    if (!page || !page.user.equals(req.user._id)) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    page.isRemoved = true;

    return res.status(HTTPStatus.OK).json(await page.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
}

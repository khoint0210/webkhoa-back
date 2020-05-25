import HTTPStatus from 'http-status';

import Category from './category.model';

export async function getCategoryList(req, res) {
  const limit = parseInt(req.query.limit, 0) || 50;
  const skip = parseInt(req.query.skip, 0) || 0;
  try {
    const categories = await Category.list({ limit, skip });

    return res.status(HTTPStatus.OK).json(categories);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getCategory(req, res) {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    if (!category) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    return res.status(HTTPStatus.OK).json(category);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function createCategory(req, res) {
  try {
    const category = await Category.createCategory(req.body, req.user._id);

    return res.status(HTTPStatus.CREATED).json(category);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function updateCategory(req, res) {
  try {
    const category = await Category.findOne({ _id: req.params.id, isRemoved: false });
    if (!category) {
      throw new Error({ message: 'Not found' });
    }

    Object.keys(req.body).forEach(key => {
      category[key] = req.body[key];
    });

    if (req.body.isAnnouncement) {
      const currentAnnouncement = await Category.findOne({ isAnnouncement: true, isRemoved: false });
      if (currentAnnouncement && currentAnnouncement._id !== category._id) {
        currentAnnouncement.isAnnouncement = false;
        await currentAnnouncement.save();
      }
    }

    if (req.body.widgetPosition) {
      const dupCategory = await Category.findOne({ widgetPosition: req.body.widgetPosition, isRemoved: false });
      if (dupCategory && dupCategory._id !== category._id) {
        dupCategory.widgetPosition = 0;
        await dupCategory.save();
      }
    }

    return res.status(HTTPStatus.OK).json(await category.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function deleteCategory(req, res) {
  try {
    const category = await Category.findOne({ _id: req.params.id, isRemoved: false });
    if (!category || !category.user.equals(req.user._id)) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    category.isRemoved = true;

    return res.status(HTTPStatus.OK).json(await category.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

import HTTPStatus from 'http-status';

import Document from './document.model';

export async function getDocumentList(req, res) {
  try {
    const documents = await Document.find({ isRemoved: false, user: req.query.user });

    return res.status(HTTPStatus.OK).json(documents);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function createDocument(req, res) {
  try {
    const document = await Document.create({
      ...req.body,
      user: req.user._id,
    });

    return res.status(HTTPStatus.CREATED).json(document);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function updateDocument(req, res) {
  try {
    const document = await Document.findOne({ _id: req.params.id, isRemoved: false });
    if (!document) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    Object.keys(req.body).forEach(key => {
      document[key] = req.body[key];
    });

    return res.status(HTTPStatus.OK).json(await document.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function deleteDocument(req, res) {
  try {
    const document = await Document.findOne({ _id: req.params.id, isRemoved: false });
    if (!document) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    document.isRemoved = true;

    return res.status(HTTPStatus.OK).json(await document.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

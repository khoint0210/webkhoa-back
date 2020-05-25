import HTTPStatus from 'http-status';

import Upload from './upload.model';

export async function getUploadList(req, res) {
  try {
    const uploads = await Upload.find({
      isRemoved: false,
    }).populate('user');

    return res.status(HTTPStatus.OK).json(uploads);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function createUpload(req, res) {
  try {
    const upload = await Upload.create({
      ...req.file,
      user: req.user._id,
    });

    return res.status(HTTPStatus.CREATED).json(upload);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function updateUpload(req, res) {
  try {
    const upload = await Upload.findOne({ _id: req.params.id, isRemoved: false });
    if (!upload) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    Object.keys(req.file).forEach(key => {
      upload[key] = req.file[key];
    });

    return res.status(HTTPStatus.OK).json(await upload.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function deleteUpload(req, res) {
  try {
    const upload = await Upload.findOne({ _id: req.params.id, isRemoved: false });
    if (!upload) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    upload.isRemoved = true;

    return res.status(HTTPStatus.OK).json(await upload.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

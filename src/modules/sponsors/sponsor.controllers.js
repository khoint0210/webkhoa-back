import HTTPStatus from 'http-status';

import Sponsor from './sponsor.model';

export async function getSponsorList(req, res) {
  try {
    const sponsors = await Sponsor.find({ isRemoved: false });

    return res.status(HTTPStatus.OK).json(sponsors);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function createSponsor(req, res) {
  try {
    const sponsor = await Sponsor.create({
      ...req.body,
      user: req.user._id,
    });

    return res.status(HTTPStatus.CREATED).json(sponsor);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function updateSponsor(req, res) {
  try {
    const sponsor = await Sponsor.findOne({ _id: req.params.id, isRemoved: false });
    if (!sponsor) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    Object.keys(req.body).forEach(key => {
      sponsor[key] = req.body[key];
    });

    return res.status(HTTPStatus.OK).json(await sponsor.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function deleteSponsor(req, res) {
  try {
    const sponsor = await Sponsor.findOne({ _id: req.params.id, isRemoved: false });
    if (!sponsor) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    sponsor.isRemoved = true;

    return res.status(HTTPStatus.OK).json(await sponsor.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

import HTTPStatus from 'http-status';

import Carousel from './carousel.model';

export async function getCarouselList(req, res) {
  try {
    const query = req.query.inactive
      ? {
        isRemoved: false,
      } : {
        isRemoved: false,
        active: true,
      };
    const carousels = await Carousel.find(query).populate('user');

    return res.status(HTTPStatus.OK).json(carousels);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function createCarousel(req, res) {
  try {
    const carousel = await Carousel.create({
      ...req.body,
      user: req.user._id,
    });

    return res.status(HTTPStatus.CREATED).json(carousel);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function updateCarousel(req, res) {
  try {
    const carousel = await Carousel.findOne({ _id: req.params.id, isRemoved: false });
    if (!carousel) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    Object.keys(req.body).forEach(key => {
      carousel[key] = req.body[key];
    });

    return res.status(HTTPStatus.OK).json(await carousel.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function deleteCarousel(req, res) {
  try {
    const carousel = await Carousel.findOne({ _id: req.params.id, isRemoved: false });
    if (!carousel) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    carousel.isRemoved = true;

    return res.status(HTTPStatus.OK).json(await carousel.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

import HTTPStatus from 'http-status';

import Carousel from '../carousels/carousel.model';
import Sponsor from '../sponsors/sponsor.model';

export async function getDashboard(req, res) {
  try {
    const carousels = await Carousel.find();
    const sponsors = await Sponsor.find();

    const result = {
      carousels,
      sponsors,
    };
    return res.status(HTTPStatus.OK).json(result);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

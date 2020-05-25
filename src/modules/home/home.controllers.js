import HTTPStatus from 'http-status';
import FTS from 'fulltextsearch';

import Sponsor from '../sponsors/sponsor.model';
import Carousel from '../carousels/carousel.model';
import Category from '../categories/category.model';
import Article from '../articles/article.model';
import Contact from './contact.model';
import UtilityDocument from './utilitydocument.model';

export async function initial(req, res) {
  try {
    const sponsors = await Sponsor.find({ isRemoved: false });
    const carousels = await Carousel.find({ isRemoved: false, active: true });
    const widgets = await Category.find({
      widgetPosition: { $gt: 0 },
      isRemoved: false,
    }).sort({ widgetPosition: 1 });
    await Promise.all(widgets.map(async (category, i) => {
      const articles = await Article
        .find({ category: category._id, isRemoved: false })
        .sort({ createdAt: -1 })
        .limit(3);
      widgets[i] = {
        ...category.toJSON(),
        articles,
      };
    }));

    const result = {
      sponsors,
      carousels,
      widgets,
    };
    return res.status(HTTPStatus.OK).json(result);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function search(req, res) {
  try {
    const filter = {
      title: new RegExp(FTS.vi(req.body.text), 'i'),
      isRemoved: false,
    };
    const result = await Article.find(filter);

    return res.status(HTTPStatus.OK).json(result);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getContact(req, res) {
  try {
    const contact = await Contact.find({ isRemoved: false });

    return res.status(HTTPStatus.OK).json(contact);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function addContact(req, res) {
  try {
    const newContact = req.body;
    if (!req.body.engContent) {
      newContact.engContent = req.body.content;
    }
    const contact = await Contact.create({ ...newContact, user: req.user._id });

    return res.status(HTTPStatus.OK).json(contact);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function updateContact(req, res) {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, isRemoved: false });
    if (!contact) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    Object.keys(req.body).forEach(key => {
      contact[key] = req.body[key];
    });

    return res.status(HTTPStatus.OK).json(await contact.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function deleteContact(req, res) {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, isRemoved: false });
    if (!contact) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    contact.isRemoved = true;

    return res.status(HTTPStatus.OK).json(await contact.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function getUtilityDocument(req, res) {
  try {
    const ud = await UtilityDocument.find({ isRemoved: false });

    return res.status(HTTPStatus.OK).json(ud);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function addUtilityDocument(req, res) {
  try {
    const newUD = req.body;
    if (!req.body.engContent) {
      newUD.engContent = req.body.content;
    }
    const ud = await UtilityDocument.create({ ...newUD, user: req.user._id });

    return res.status(HTTPStatus.OK).json(ud);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function updateUtilityDocument(req, res) {
  try {
    const ud = await UtilityDocument.findOne({ _id: req.params.id, isRemoved: false });
    if (!ud) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    Object.keys(req.body).forEach(key => {
      ud[key] = req.body[key];
    });

    return res.status(HTTPStatus.OK).json(await ud.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

export async function deleteUtilityDocument(req, res) {
  try {
    const ud = await UtilityDocument.findOne({ _id: req.params.id, isRemoved: false });
    if (!ud) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }

    ud.isRemoved = true;

    return res.status(HTTPStatus.OK).json(await ud.save());
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e);
  }
}

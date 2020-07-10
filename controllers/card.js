const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card
    .find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => res.status(404).send({ data: err.message }));
};
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card
    .create({ name, link, owner: req.user._id })
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => res.status(500).send({ err, message: 'Что - то не так!' }));
};
module.exports.deleteCard = (req, res) => {
  Card
    .findByIdAndRemove(req.params.cardId)
    .then(() => res.status(200).send({ message: 'Карточка удалена' }))
    .catch((err) => res.status(404).send({ err, message: 'нет такой карточки' }));
};

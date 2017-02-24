const express = require('express'),
      Sequelize = require('Sequelize');

const router = express.Router();

const sequelize = new Sequelize('bulletinboard', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, { dialect: 'postgres' });

var message = sequelize.define('message', {
    title: Sequelize.STRING,
    body: Sequelize.TEXT
});

 router.get('/', (request, response) => {
    response.render('messages/index');
 });

 router.get('/:id', (request, response) => {
     message.findById(request.params.id).then((message) => {
         response.render('messages/show', { message: message });
     });
 });

 router.delete('/:id', (request, response) => {
  console.log(request.params.id);
  message.destroy({
    where: {
      id: request.params.id
    }
  }).then(() => {
    response.redirect('/board');
  });
});

router.get('/:id/edit', (req, res) => {
  message.findOne({
    where: {
      id: req.params.id
    }
  }).then((message) => {
    res.render('messages/edit', { message: message });
  });
});

router.put('/:id', (request, response) => {
  console.log(request.params.id);
  console.log(request.body);
  message.update(request.body, {
    where: {
      id: request.params.id,
    }
  }).then(() => {
    response.redirect('/messages/' + request.params.id);
  });
});


module.exports = router;
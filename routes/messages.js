const express = require('express'),
      Sequelize = require('Sequelize'),
      router = express.Router;

const sequelize = new Sequelize('bulletin_board', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, { dialect: 'postgres' });

var message = sequelize.define('message', {
    title: Sequelize.STRING,
    body: Sequelize.TEXT
});

// router.get('/', (request, response) => {
//     message.findAll({ order: 'id ASC' }).then((messages) => {
//         response.render('messages/index', { messages: messages });
//     });
// });

// router.get('/:id', (request, response) => {
//     message.findById(request.params.id).then((message) => {
//         response.render('messages/show', { message: message });
//     });
// });

module.exports = router;
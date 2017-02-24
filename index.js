const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    pug = require('pug'),
    Sequelize = require('sequelize');

var app = express(),
    sequelize = new Sequelize('bulletinboard', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, { dialect: 'postgres' });

var messagesRouter = require('./routes/messages');

var message = sequelize.define('message', {
    title: Sequelize.STRING,
    body: Sequelize.TEXT
});

app.use(methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }})
);

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }})
);

app.set('view engine', 'pug');

app.get('/', (request, response) => {
    response.redirect('/messages');
});

app.get('/board', (request, response) => {
    message.findAll().then((messages) => {
        response.render('messages/board', { messages: messages });
    });
});

app.post('/messages', (request, response) => {
    message.create(request.body).then(() => {
        response.redirect('/board');
    });
});

app.use('/messages', messagesRouter);

sequelize.sync().then(() => {
    console.log('Connect to database');
    app.listen(3001, () => {
        console.log('Web Server is running on port 3001');
    });
});
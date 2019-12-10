'use strict';

module.exports = function(app) {
    var todoList = require('./controller');

    app.route('/api/')
        .get(todoList.index);

    app.route('/api/users')
        .post(todoList.users);
};
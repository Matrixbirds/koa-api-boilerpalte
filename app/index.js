'use strict'

const _ = require('lodash')
const models = require('./models')();
const fs = require('fs');

const koa = require('koa');
const logger = require('koa-bunyan-logger');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const app = new koa();
const env = require('./env');
const util = require('util');
const cors = require('@koa/cors');

if (process.env.NODE_ENV !== 'test') {
    app.use(logger());
    app.use(logger.requestIdContext());
    app.use(logger.requestLogger());
}
app.use(cors());
app.use(bodyParser({
    onerror: function (err, ctx) {
        ctx.throw(422, 'body parser error', { errors: err });
    }
}));

// app.use(routes.routes())
// app.use(routes.allowedMethods())

if (process.env.NODE_ENV !== 'production') {
    console.log('routeTable=====')
    // console.log(routes.stack.map(i => i.path))
    console.log('routeTable=====')
}

// if (process.env.NODE_ENV === 'production') require('newrelic');

if (process.env.NODE_ENV !== 'test' && require.main === module) {
    let listener = app.listen(env.port, () => {
        console.log('Listenning on %s', listener.address().port);
    });
}

const deps = {
    context: {
        app,
        models,
        env,
        utils: require('./facilities')
    }
}

module.exports = deps;

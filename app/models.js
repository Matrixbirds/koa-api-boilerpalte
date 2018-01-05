'use strict'

const env = require('./env')

const _ = require('lodash')

const dbs = env.dbs

const knex = require('knex')

const _db_pool = {}


function pull (name) {
    if (!name) throw Error('name is nil')
    if (!dbs[name]) throw Error('name is not exist')
    if (!_db_pool[name]) {
        _db_pool[name] = require('bookshelf')(knex(dbs[name]))
            .plugin('pagination')
            .plugin('registry')
            .plugin('virtuals')
            .plugin('visibility')
    }
    return _db_pool[name]
}

module.exports = $ => {
    const models = {}
    models.begin = pull

    // models.anchor = pull('db_name')
    //    .Model.extend({
    //        tableName: 'anchor',
    //        idAttribute: 'id'
    //    })
    // models.anchors = pull('db_name')
    //    .Model.extend({
    //        model: models.anchor
    //    })

    return models
}

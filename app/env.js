'use strict'

const nconf = require('nconf')
const path = require('path')
const yaml = require('js-yaml')

const APP_ENV = {};

nconf.file({
    file: path.join(__dirname, '../__settings.yml'),
    format: {
        stringify (obj, opt) {
            return yaml.safeDump(obj, opts)
        },
        parse (obj, opts) {
            return yaml.safeLoad(obj, opts)
        }
    }
})

exports =  module.exports = nconf.get(process.env.NODE_ENV)

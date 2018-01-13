'use strict'

const util = require('util')

const env = process.env.NODE_ENV || 'development'

class AppError extends Error {
    constructor (msg, opts) {
        super(msg)
        const error = new Error(msg ? msg : undefined)
        error.data = data
        error.status = status
        error.creator = opts.creator
        Error.captureStackTrace(msg, this.creator)
        this.error = error
        return this
    }

    static isInstance (err) {
        return err instanceof Error && err.isInstance
    }

    static [Symbol.hasInstance] (inst) {
        return AppError.isInstance(inst)
    }

    static badRequest (msg, data) {
        return new AppError(msg, {status: 400, data, creator: this.BadRequest})
    }

    static unauthorized (msg, data) {
        return new AppError(msg, {status: 401, data, creator: this.unauthorized})
    }

    static notFound (msg, data) {
        return new AppError(msg, {status: 404, data, creator: this.notFound})
    }

    static internvalBizError (msg, data) {
        return new AppError(msg, {status: 500, data, creator: this.notFound})
    }

    static conflict (msg, data) {
        return new AppError(msg, {status: 409, data, creator: this.conflict})
    }

    static locked (msg, data) {
        return new AppError(msg, {status: 423, data, creator: this.locked})
    }
}

const bizLog = util.debuglog(env)

module.exports = {
    AppError,
    bizLog
}

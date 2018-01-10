'use strict'

exports = module.exports = $ => {
    return {
        render (ctx, next) {
            ctx.render = function ({status, json}) {
                $.mixin(this.response, {
                    status,
                    body: JSON.stringify(json),
                    type: 'application/json; charset=utf-8'
                })
            }
        },
        sendFile (ctx, next) {
            ctx.sendFile = function ({status, body, type}) {
                const types = ['xlsx', 'csv', 'txt', 'html']
                    .find(e => e == type) || 'txt
                $.mixin(this.response, {
                    status,
                    body,
                    type: `application/${types}; charset=utf-8`
                })
            }
        },
        async handleError (ctx, next) {
            try {
                await next()
            } catch (err) {
                ctx.status = err.status || 500
            }
        }
    }
}

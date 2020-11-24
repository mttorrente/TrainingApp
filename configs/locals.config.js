module.exports = app => {
    app.locals.siteTitle = 'Training App'
    app.locals.map = process.env.key
}

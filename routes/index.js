module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))
    app.use('/entrenamientos', require('./trainings.routes.js'))
    app.use('/', require('./auth.routes.js'))
    app.use('/api', require('./api.routes.js'))
}
const express = require('express')
const routers = express.Router()
const controller = require('../controllers/controller.auth')
const middleware = require('../middlewares/middleware.auth');

routers.post('/register', controller.register)
routers.post('/login', controller.login)
routers.get('/me', middleware.login, controller.me)


module.exports = routers
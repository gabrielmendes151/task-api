const express = require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json')

const server = express()
const taskApi = require('./tasks');
const { app: userApi }  = require('./user');

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
server.use(taskApi)
server.use(userApi)

server.listen(3000)
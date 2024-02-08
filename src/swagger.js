const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./tasks.js', './user.js']

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./app.js')
})
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./express/index')
const mongoose = require('./database/index')
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

var cors = require('cors');
app.use(cors(
  {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
));
dotenv = require('dotenv')
dotenv.config()

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Express Swagger Example',
        version: '1.0.0',
        description: 'An example Express app with Swagger documentation',
      },
    },
    apis: ['./express/routes/*.js'], // Specify the path to your route files
  };

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('uploads'))



const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Serve Swagger UI at the /api-docs endpoint
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(routes)


app.listen(4000, () => {
  console.log('Server started on port 4000')
})
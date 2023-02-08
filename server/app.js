const express = require('express');
const app = express();
const { body, validationResult } = require('express-validator/check');
const bodyParser = require('body-parser');
const { userValidator, userSigninValidator } = require('./services/validators')
const UserController = require('./contollers/users-controller')
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));

app.get('/api/hello', (req, res, next) => {
    res.send('Hello its me');
})

app.get('/api/carscatalog', UserController.carsCatalog)

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../build/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
})

app.post('/api/carssearch', UserController.carsSearch)

app.post('/api/signup', UserController.createUser)

app.post('/api/addcar', UserController.createCar)

app.post('/api/signin', userSigninValidator, UserController.checkUser)

app.post('/api/getuser', UserController.getUser)

app.post('/api/carorder', UserController.carOrder)

app.post('/api/addorder', UserController.addOrder)

app.post('/api/getorder', UserController.getOrder)

app.post('/api/getactiveorder', UserController.getActiveOrder)

app.post('/api/getuserorders', UserController.getUserOrders)



let listener = app.listen(process.env.PORT || 3000, (port) => {
    console.log(`Server started on ${listener.address().port} port`)
})
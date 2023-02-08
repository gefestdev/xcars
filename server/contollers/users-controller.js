const { Users, Cars, Orders } = require('../models');
const { body, validationResult } = require('express-validator/check');
const { Op, or } = require('sequelize');

function getUser(req, res, next){
    Users.findOne({where: {login: req.body.login}}).then(user => {
        res.json(user)
    }).catch(error => console.log(error));
}

function carsCatalog(req, res, next){
    Cars.findAll({where: {status: "Свободен"}}).then(cars => {
        res.json(cars);
        //console.log(cars[0].login)
    }).catch(error => console.log(error));
}

function carOrder(req, res, next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()})
    }
    Cars.findOne({where: {id: req.body.id}}).then(car => {
        if(!car){
            return Promise.reject({statusCode: 422, message: "Автомобиль не найден"});
        }
        else{
            res.json(car);
        }
    })
    .catch((error) => {
        res.status(error.statusCode || 400).json({errors: error.message})
    })
}

function carsSearch(req, res, next){
    Cars.findAll({where:{location: req.body.location, type: req.body.type, status: "Свободен"}}).then(cars => {
        res.json(cars);
    }).catch(error => console.log(error));
}

function checkUser(req, res, next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()})
    }
    Users.findOne({where: {login: req.body.login, password: req.body.password}}).then(user => {
        if(!user){
            return Promise.reject({statusCode: 422, message: "Пользователь не найден или пароль неверный"});
        }
        else{
            res.json(user);
        }
    })
    .catch((error) => {
        res.status(error.statusCode || 400).json({errors: error.message})
    })
}

function createCar(req, res, next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()})
    }
    Cars.findOne({where: {state_number: req.body.state_number}}).then(car => {
        if(car){
            return Promise.reject({statusCode: 422, message: "Этот гос.номер уже существует в базе"});
        } else {
            const {image, brand, state_number, status, location, price, type} = req.body;
            return Cars.create({image, brand, state_number, status, location, price, type})
        }
    })
    .then(car => {
        res.json(car);
    })
    .catch((error) => {
        res.status(error.statusCode || 400).json({errors: error.message})
    })
}

function createUser(req, res, next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()})
    }
    Users.findOne({where: {phone_number: req.body.phone_number}}).then(user => {
        if(user){
            return Promise.reject({statusCode:422, message: "Этот номер телефона уже зарегистрирован"});
        } else {
            const {login, name, lastname, patronymic, password, phone_number, role, date_of_birth} = req.body;
            return Users.create({login, name, lastname, patronymic, password, phone_number, role, date_of_birth});
        }
    })
    .then(user => {
        res.json(user);
    })
    .catch((error) => {
        res.status(error.statusCode || 400).json({errors: error.message})
    })
}

function addOrder(req, res, next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()})
    }
    Orders.findOne({where: {id_user: req.body.id_user, status: "Активен"}}).then(orders => {
        if(orders){
            return Promise.reject({statusCode:422, message: "Этот заказ уже существует"});
        } else {
            const {id_user, id_car, date_start, date_end, price, real_date_end, status} = req.body;
            return Orders.create({id_user, id_car, date_start, date_end, price, real_date_end, status});
        }
    })
    .then(orders => {
        res.json(orders);
        Cars.update({status: "Занят"}, {where: {id: req.body.id_car}})
    })
    .catch((error) => {
        res.status(error.statusCode || 400).json({errors: error.message})
    })
}

function getUserOrders(req, res, next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()})
    }
    Orders.findAll({where: {id_user: req.body.id_user}, include: [{model: Users, required: true}]}).then(ordersUser => {
        res.json(ordersUser)
    })
    .catch(error => console.log(error))
}

function getOrder(req, res, next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()})
    }
    Orders.findAll({where: {id_user: req.body.id_user, status: 'Завершен'}, include: [{model: Cars, required: true}, {model: Users, required: true}]}).then(orders => {
        res.json(orders)
    })
    .catch(error => console.log(error))
}

function getActiveOrder(req, res ,next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()})
    }
    Orders.findOne({where: {id_user: req.body.id_user, status: 'Активен'}, include: [{model: Cars, required: true}]}).then(orders => {
        res.json(orders)
    })
    .catch(error => console.log(error))
}


module.exports = {
    createUser,
    carsCatalog,
    createCar,
    carsSearch,
    checkUser,
    getUser,
    carOrder,
    addOrder,
    getOrder,
    getActiveOrder,
    getUserOrders
}
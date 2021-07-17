const uuid = require('uuid/v4');
const HttpError = require('../models/http-error');

const { validationResult } = require('express-validator');

const DUMMY_USERS = [
    {
        id: 'utilizator1',
        name: 'Luca Stefan',
        email: 'ciobotaricaluca18@stud.ase.ro',
        password: '12345'
    }
];

const getUsers = (req,res,next) => {
    res.json({users: DUMMY_USERS});
}

const signup = (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        console.log(errors);
        throw new HttpError("Invalid data. Check your input.",422);
    }

    const { name, email, password } = req.body;

    const hasUser = DUMMY_USERS.find(u => u.email === email);
    if (hasUser){
        throw new HttpError("This email is already registered")
    }

    const createdUser =  {
        id: uuid(),
        name,
        email,
        password
    };

    DUMMY_USERS.push(createdUser);
    res.status(201).json({user: createdUser});
};

const login = (req,res,next) => {
    const { email, password } = req.body;

    const identifiedUser = DUMMY_USERS.find(u => u.email === email);

    if(!identifiedUser || identifiedUser.password !== password){
        throw new HttpError("Check your credentials",401);
    }
    
    res.json({message: "Logged in"});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
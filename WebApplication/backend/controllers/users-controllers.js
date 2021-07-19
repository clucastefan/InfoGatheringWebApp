const uuid = require('uuid/v4');
const HttpError = require('../models/http-error');
const User = require('../models/user');
const mongoose = require('mongoose');


const { validationResult } = require('express-validator');


const signup = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        console.log(errors);
        return next (new HttpError("Invalid data. Check your input.",422));
    }

    const { name, email, password} = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({emai: email});
    } catch (err) {
        const error = new HttpError('Inregistrarea a esuat. Incerca mai tarziu.', 500);
        return next(error);
    }

    if(existingUser){
        const error = new HttpError('Acest email este asociat unui cont.', 422);
        return next(error);
    }

    const createdUser =  new User({
        name,
        email,
        password,
        scans: []
    });

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError('Inregistrarea a esuat. Incearca din nou',500);
        return next(error);
    }

    res.json({
        scan: createdUser.toObject({getters:true})
    });
};

const login = async (req,res,next) => {
    const { email, password } = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({email: email});
    } catch (err) {
        const error = new HttpError('Logarea a esuat. Incerca mai tarziu.', 500);
        return next(error);
    }

    if (!existingUser || existingUser.password !== password){
        const error = new HttpError('Date de logare invalide.',401);
        return next(error);
    }
    
    res.json({message: "Logged in"});
};

exports.signup = signup;
exports.login = login;
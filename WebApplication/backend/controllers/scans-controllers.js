const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');
const { spawn,exec } = require("child_process");

const HttpError = require('../models/http-error');
const Scan = require('../models/scan');
const User = require('../models/user');
const mongoose = require('mongoose');

const getScansByUserId  = async (req, res, next) => {
    const userId = req.params.userId;

    let scan;
    try{
        scan = await Scan.find({creator: userId}).exec();
    } catch(err) {
        const error = new HttpError('Nu s-a putut gasi nicio inregistrate pentru acest utilizator',500);
        return next(error);
    }
    

    if (!scan || scan.length === 0) {
        const error = new HttpError('Unauthorized',404); 
        return next(error);       
    }

    res.json({
        scan: scan.map(scan => scan.toObject({getters: true}))
    });
}

const getScansByUserIdScanId = async (req, res, next) => {
    const userId = req.params.userId;
    const scanId = req.params.scanId;
    const newUserId = userId.slice(0,-1);

    let scan;
    try{
        scan = await Scan.findOne({_id: scanId});
    } catch(err) {
        const error = new HttpError('Nu s-a putut gasi acel raport',500);
        console.log(userId,newUserId);
        return next(error);
    }

    if (!scan) {
        const error = new HttpError('Unauthorized',404); 
        console.log(userId,newUserId);
        return next(error);
    }

    res.json({
        scan: scan.toObject({getters:true})
    });
}

const createdScan = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        console.log(errors);
        return next(new HttpError("Invalid data. Check your input.",422));
    }

    const { titlu, descriere, addr, tipScan, creator } = req.body;
    const createdScan = new Scan({
        titlu,
        descriere,
        addr,
        tipScan,
        creator
    });

    let user;
    try {
        user = await User.findById(creator);

    } catch (err) {
        const error = new HttpError('Scanarea nu poate efectua.',500);
        return next(error);
    }

    if (!user){
        const error = new HttpError('Unauthorized',404);
        return next(error);
    }

    let comandaScan;
    switch(tipScan) {
        case 'FULL-SCAN':
          comandaScan = `/home/cluca/Documents/Licenta/ToolAutomatization/scan_full.py`;
          break;
        case 'WEB-SCAN':
            comandaScan = `/home/cluca/Documents/Licenta/ToolAutomatization/scan_web.py`;
          break;
        case 'SERVER-SCAN':
            comandaScan = `/home/cluca/Documents/Licenta/ToolAutomatization/scan_server.py`;
            break;
        default:
            comandaScan = `/home/cluca/Documents/Licenta/ToolAutomatization/scan_full.py`;
      }
    
    const newProcessDescriptor = await spawn(
        'python3', 
        [`${comandaScan}`, `${addr}`]
    );

    newProcessDescriptor.on('error', (error) => {
      console.log(`child process creating error with error ${error}`);
    });

    newProcessDescriptor.on('close', async (code) => {
      console.log(`child process exited with code ${code}`);
    });

    try {
    
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdScan.save({session: sess});

        user.scans.push(createdScan);

        await user.save({session: sess});

        await sess.commitTransaction();

    } catch (err) {
        const error = new HttpError('Adaugarea scanarii a esuat. Incearca din nou',500);
        return next(error);
    }  
    
    res.status(201).json({scan: createdScan});
};

const updateScanById = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        console.log(errors);
        return next(new HttpError("Invalid data. Check your input.",422));
    }

    const { titlu, descriere } = req.body;
    const userId = req.params.userId;
    const scanId = req.params.scanId;

    let scan;
    try{
        scan = await Scan.findOne({_id: scanId});
    } catch(err) {
        const error = new HttpError('Nu s-a putut actualiza acel raport',500);
        return next(error);
    }

    scan.titlu = titlu;
    scan.descriere = descriere;

    try {
        await scan.save();
    } catch (err) {
        const error = new HttpError('A aparut o eroare.',500);
        return next(error);
    }

    res.json({
        scan: scan.toObject({getters:true})
    });
}

const deleteScanById = async (req,res,next) => {
    const userId = req.params.userId;
    const scanId = req.params.scanId;

    let scan;
    try{
        scan = await Scan.findOne({_id: scanId}).populate('creator');
    } catch(err) {
        const error = new HttpError('Nu s-a putut sterge acel raport',500);
        return next(error);
    }

    if(!scan){
        const error = new HttpError("Nu s-a putut gasi un raport pentru acest id",404);
        return next(error);
    }

    try {
        // await scan.remove();

        const sess = await mongoose.startSession();
        sess.startTransaction();
        await scan.remove({session : sess});
        scan.creator.scans.pull(scan);

        await scan.creator.save({session: sess});

        await sess.commitTransaction();

    } catch (err) {
        const error = new HttpError('A aparut o eroare.',500);
        return next(error);
    }

    res.status(200).json({message: "Deleted"});
};

exports.getScansByUserId = getScansByUserId;
exports.getScansByUserIdScanId = getScansByUserIdScanId;
exports.createdScan = createdScan;
exports.updateScanById = updateScanById;
exports.deleteScanById = deleteScanById;
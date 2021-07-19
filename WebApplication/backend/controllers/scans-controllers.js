const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Scan = require('../models/scan');

let DUMMY_SCANS = [
    {
        id: "scan1",
        titlu: "Scan rutina",
        descriere: "Scaneaza site-ul dupa ultimul commit in productie dd/mm/yyyy",
        addr: "192.168.0.1",
        tipScan: "WEB-SCAN",
        creator: "utilizator1"
    },
    {
        id: "scan2",
        titlu: "Scan rutina",
        descriere: "Scaneaza site-ul dupa ultimul commit in productie dd/mm/yyyy",
        addr: "192.168.0.1",
        tipScan: "WEB-SCAN",
        creator: "utilizator2"
    }
];

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

    let scan;
    try{
        scan = await Scan.findOne({creator: userId, _id: scanId});
    } catch(err) {
        const error = new HttpError('Nu s-a putut gasi acel utilizator',500);
        return next(error);
    }

    if (!scan) {
        const error = new HttpError('Unauthorized',404); 
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
        throw new HttpError("Invalid data. Check your input.",422);
    }

    const { titlu, descriere, addr, tipScan, creator } = req.body;
    const createdScan = new Scan({
        titlu,
        descriere,
        addr,
        tipScan,
        creator
    });

    try {
        await createdScan.save();
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
        throw new HttpError("Invalid data. Check your input.",422);
    }

    const { titlu, descriere } = req.body;
    const userId = req.params.userId;
    const scanId = req.params.scanId;

    let scan;
    try{
        scan = await Scan.findOne({creator: userId, _id: scanId});
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
        scan = await Scan.findOne({creator: userId, _id: scanId});
    } catch(err) {
        const error = new HttpError('Nu s-a putut sterge acel raport',500);
        return next(error);
    }

    try {
        await scan.remove();
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
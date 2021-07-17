const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

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

const getScansByUserId  = (req, res, next) => {
    const userId = req.params.userId;
    const scan = DUMMY_SCANS.filter( p => {
        return p.creator === userId;
    });

    if (!scan || scan.length === 0) {
        throw new HttpError('Unauthorized',404);        
    }

    res.json({
        scan: scan
    });
}

const getScansByUserIdScanId = (req, res, next) => {
    const userId = req.params.userId;
    const scanId = req.params.scanId;
    const scan = DUMMY_SCANS.find( p => {
        return p.creator === userId && p.id === scanId;
    });

    if (!scan) {
        return next(
            new HttpError('Aceasta resursa nu exista', 404)
        );
    }

    res.json({
        scan: scan
    });
}

const createdScan = (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        console.log(errors);
        throw new HttpError("Invalid data. Check your input.",422);
    }

    const { titlu, descriere, addr, tipScan, creator } = req.body;
    const createdScan = {
        id: uuid(),
        titlu,
        descriere,
        addr,
        tipScan,
        creator
    };

    DUMMY_SCANS.push(createdScan);

    res.status(201).json({scan: createdScan});
};

const updateScanById = (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        console.log(errors);
        throw new HttpError("Invalid data. Check your input.",422);
    }

    const { titlu, descriere} = req.body;
    const userId = req.params.userId;
    const scanId = req.params.scanId;

    const updatedScanById = { ...DUMMY_SCANS.find( p => {
        return p.creator === userId && p.id === scanId;
    })};
    const scanIndex = DUMMY_SCANS.findIndex( p => {
        return p.creator === userId && p.id === scanId;
    });

    updatedScanById.titlu = titlu;
    updatedScanById.descriere = descriere;

    DUMMY_SCANS[scanIndex] = updatedScanById;

    res.status(200).json({scan: updatedScanById});

}

const deleteScanById = (req,res,next) => {
    const userId = req.params.userId;
    const scanId = req.params.scanId;

    const scanIndex = DUMMY_SCANS.findIndex( p => {
        return p.creator === userId && p.id === scanId;
    });

    if (scanIndex === -1){
        throw new HttpError('Nu s-a gasit raportul respectiv.',404)
    }

    DUMMY_SCANS.splice(scanIndex,1);
    res.status(200).json({message: "Deleted"});
    console.log(DUMMY_SCANS);
};

exports.getScansByUserId = getScansByUserId;
exports.getScansByUserIdScanId = getScansByUserIdScanId;
exports.createdScan = createdScan;
exports.updateScanById = updateScanById;
exports.deleteScanById = deleteScanById;
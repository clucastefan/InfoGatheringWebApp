const HttpError = require('../models/http-error');

const DUMMY_SCANS = [
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
    const scan = DUMMY_SCANS.find( p => {
        return p.creator === userId;
    });

    if (!scan) {
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

exports.getScansByUserId = getScansByUserId;
exports.getScansByUserIdScanId = getScansByUserIdScanId;
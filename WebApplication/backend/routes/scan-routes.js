const express = require('express');

const { check } = require('express-validator');

const scansControllers = require('../controllers/scans-controllers')

const router = express.Router();

router.get('/:userId/myscans', scansControllers.getScansByUserId);

router.get('/:userId/myscans/:scanId', scansControllers.getScansByUserIdScanId);

router.post('/', 
    [check('titlu').not().isEmpty(),
    check('descriere').isLength({min: 1}),
    check('addr').matches(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/)
    ],scansControllers.createdScan);

router.patch('/:userId/myscans/:scanId', [
    check('titlu').not().isEmpty(),
    check('descriere').isLength({min: 1})
], scansControllers.updateScanById);
router.delete('/:userId/myscans/:scanId', scansControllers.deleteScanById);

module.exports = router;
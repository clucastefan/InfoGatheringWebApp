const express = require('express');

const scansControllers = require('../controllers/scans-controllers')

const router = express.Router();

router.get('/:userId/myscans', scansControllers.getScansByUserId);

router.get('/:userId/myscans/:scanId', scansControllers.getScansByUserIdScanId);

module.exports = router;
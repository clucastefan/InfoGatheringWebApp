const express = require('express');
const bodyParser = require('body-parser');

const scansRoutes = require('./routes/scan-routes');

const app = express();

app.use('/api/reports',scansRoutes);

app.use((error, req, res, next) => {
    if (res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({
        message: error.message || "Something went wrong."
    });
});

app.listen(5000);
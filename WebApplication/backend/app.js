const express = require('express');
const bodyParser = require('body-parser');

const scansRoutes = require('./routes/scan-routes');
const usersRoutes = require('./routes/users-routes')
const HttpError  = require('./models/http-error');

const app = express();

app.use(express.json());

app.use('/api/reports',scansRoutes);
app.use('/api/users/', usersRoutes);

app.use((req,res,next) => {
    const error = new HttpError('Aceasta resursa nu exista',404);
    throw error;
});

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
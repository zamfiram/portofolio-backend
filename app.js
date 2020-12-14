const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sendgrid = require('@sendgrid/mail');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Acces s-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/api', (req, res, next) => {
    res.send('API Status: Running')
});


app.post('/api/email', (req, res, next) => {
    // console.log(req.body);

    sendgrid.setApiKey('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');
    const msg = {
        to: 'madalina.zamfira@gmail.com',
        from: 'madalina.zamfira@gmail.com',
        subject: 'Website Contact',
        text:  req.body.email + " vous a envoyé ce message :" + req.body.message 
    }

    sendgrid.send(msg)
        .then(result => {
            res.status(200).json({
                success: true
            });
        })
    .catch(err => {

        console.log('error: ', err);
        res.status(401).json({
            success: false
        });
    });
});

//routes projets

//routes about

app.listen(3030, '0.0.0.0');
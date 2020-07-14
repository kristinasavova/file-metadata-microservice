const express = require('express');
const cors = require('cors');
const multer = require('multer');
const routes = require('./routes.js');

const app = express();

app.use(cors());
app.use('/public', express.static(__dirname + '/public'));

app.use('/api', routes);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/hello', (req, res) => {
    res.json({ greetings: "Hello, API" });
});

// 404 Error Handler
app.use((req, res, next) => {
    const err = new Error('404');
    err.status = 404;
    next(err); 
});

// Global Error Handler 
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        console.log('A multer error occurred when uploading', err);
        res.json({ error: 'A multer error occurred when uploading' });
    } else if (err) {
        err.message = err.message || 'Internal Server Error';
        res.status(err.status || 500);
        console.log(err);
        res.json({ error: err.message });
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Express is listening on port ${port}`);
});

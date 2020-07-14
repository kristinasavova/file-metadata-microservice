const express = require('express');
const router = express.Router(); 
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ 
    storage, // use memory storage
    limits: { fileSize: 2e+7 } // limit file size 
});

router.post('/fileanalyse', upload.single('upfile'), (req, res, next) => {
    const { originalname, mimetype, size } = req.file; 
    if (originalname && mimetype && size) {
        res.json({ name: originalname, type: mimetype, size });
    } else {
        const err = new Error('Error by uploading file');
        next(err); 
    }
});

module.exports = router; 
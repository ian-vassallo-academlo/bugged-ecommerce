const catchError = require('../utils/catchError');
const { image: Image } = require('../models');
const fs = require('fs');
const path = require('path');

const getAll = catchError(async (req, res) => {
    const results = await Image.findAll();
    return res.json(results);
});

const create = catchError(async (req, res) => {
    console.log(res.files);
    const result = req.files.map(file => ({
        url: (process.env.URL_BASE || req.protocol + "://" + req.headers.host) + "/uploads/" + file.filename,
        filename: file.filename
    }))
    const images = await Image.bulkCreate(result);
    return res.status(201).json(images);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const image = await Image.findByPk(id);
    if(!image) return res.sendStatus(404);
    fs.unlinkSync(path.join(__dirname, '..', 'public', 'uploads', image.filename));
    await image.destroy();
    return res.sendStatus(204);
});

module.exports = {
    getAll,
    create,
    remove
}
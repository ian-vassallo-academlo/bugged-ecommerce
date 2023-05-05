const { getAll, buy, getOne } = require('../controllers/purchases.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const purchasesRouter = express.Router();

purchasesRouter.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, buy);

purchasesRouter.route('/:id')
    .get(verifyJWT, getOne)

module.exports = purchasesRouter;
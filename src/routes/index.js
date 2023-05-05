const express = require('express');
const cartRouter = require('./cartProduct.routes');
const categoryRouter = require('./category.routes');
const imageRouter = require('./image.routes');
const productRouter = require('./product.routes');
const purchasesRouter = require('./purchases.routes');
const userRouter = require('./user.routes');
const router = express.Router();

// colocar las rutas aquí
router.use('/users', userRouter);
router.use('/categories', categoryRouter);
router.use('/images', imageRouter);
router.use('/products', productRouter);
router.use('/cart', cartRouter);
router.use('/purchases', purchasesRouter);

module.exports = router;

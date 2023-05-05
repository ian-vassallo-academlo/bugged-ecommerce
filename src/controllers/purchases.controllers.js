const catchError = require('../utils/catchError');
const { 
    purchases: Purchases, 
    cartProduct: CartProduct, 
    product: Product, 
    image: Image 
} = require('../models');

const purchasesInclude = [{
    model: Products,
    include: [{
        model: Image,
        attributes: ['id', 'url']
    }]
}]

const getAll = catchError(async(req, res) => {
    const results = await Purchases.findAll( {
        include: purchasesInclude,
        where: {userId: req.user.id},
    });
    return res.json(results);
});

const buy = catchError(async(req, res) => {
    const cart = await CartProducts.findAll({ 
        where: {userId: req.user.id},
        raw: true,
        attributes: [ "userId", "productId", "quantity" ]
    });

    const result = await Purchases.bulkCreate(cart);
    CartProduct.destroy({where: {userId: req.user.id}});
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Purchases.findByPk(ID, {include: purchasesInclude});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

module.exports = {
    getAll,
    buy,
    getOne,
}
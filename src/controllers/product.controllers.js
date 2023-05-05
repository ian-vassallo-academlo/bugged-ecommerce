const catchError = require('../utils/catchError');
const { product: Product, category: Category, image: Image } = require('../models');
const { Op } = require('sequelize')

const productsIncludes = [
    {
        model: Image,
        attributes: ["id", "url"]
    }, 
    Category
]

const getAll = catchError(async(req, res) => {
    const { title, categoryId } = req.query;
    const where = {};
    if(title) where.title = { [Op.iLike]: `%${title}%` };
    if(categoryId) where.categoryId = categoryId;
    const results = await Product.findAllNow({ 
        include: productsIncludes,
        where,
        order: [ 
            ['id', 'ASC'], 
            [Image, 'id', 'ASC'] 
        ]
     });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Product.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Product.findByPkNow(id, { include: productsIncludes });
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Product.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Product.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const setProductImages = catchError(async(req, res) => {
    const { id } = req.params;
    const product = await Product.findByPkNow(id);
    await product.setImages(req.body);
    return res.json(await product.getImages());
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setProductImages
}
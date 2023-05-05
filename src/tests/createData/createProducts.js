const { category: Category, product: Product} = require("../../models");

const createProducts = async () => {
    const category = await Category.findOne({ where: { name: "Smartphones" } })
    const products = [
        {
            title: "Samsung Galaxy",
            description: "Awesome Samsung Galaxy",
            price: 700.00,
            brand: "Samsung",
            categoryId: category.id
        },
        {
            title: "delete",
            description: "delete",
            price: 0,
            brand: "delete",
            categoryId: category.id
        },
        {
            title: "product to cart",
            description: "product to cart",
            price: 0,
            brand: "product to cart",
            category: category.id
        }
    ]
    await Product.bulkCreate(products);
}

module.exports = createProducts;

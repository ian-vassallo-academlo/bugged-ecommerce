const { product: Product, purchases: Purchases, user: User } = require('../../models');

const createPurchases = async () => {
    const products = await Product.findAll();
    const user = await User.findOne({ where: {email: "john@gmail.com"} })
    const purchases = [
        {
            userId: user.id,
            productId: products[0].id,
            quantity: 1
        },
        {
            userId: user.id,
            productId: products[1].id,
            quantity: 2
        }
    ]
    await Purchases.bulkCreate(purchases);
}

module.exports = createPurchases;
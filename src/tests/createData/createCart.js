const { cartProduct: CartProduct, product: Product, user: User } = require('../../models');

const createCart = async () => {
    const products = await Product.findAll();
    const user = await User.findOne({ where: {email: "john@gmail.com"} })
    const cartProducts = [
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
    await CartProduct.bulkCreate(cartProducts);
}

module.exports = createCart;
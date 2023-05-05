const getToken = require("./createData/getToken");
const request = require("supertest");
const app = require("../app");
const { cartProduct: CartProduct, product: Product } = require('../models');
const createCart = require("./createData/createCart");

let token;
let id;

beforeAll(async () => {
    token = await getToken();
    let cartProduct = await CartProduct.findOne({ where: { quantity: 1 } });
    if (!cartProduct){
        await createCart();
        cartProduct = await CartProduct.findOne({ where: { quantity: 1 } });
    }
    id = cartProduct.id;
})

test("GET /cart should return all cart products", async () => {
    const res = await request(app)
        .get("/api/v1/cart")
        .set("Authorization", "Bearer "+token);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
})

test("POST /cart should create a cart product", async () => {
    const product = await Product.findOne({ where: {title: "product to cart"} });
    const productCart = {
        productId: product.id,
        quantity: 3
    }
    const res = await request(app)
        .post('/api/v1/cart')
        .send(productCart)
        .set("Authorization", "Bearer "+token);
    expect(res.status).toBe(201);
    expect(res.body.productId).toBe(product.id);
})

test("DELETE /cart/:id should delete one cart product", async () => {
    const cartProduct = await CartProduct.findOne({ where: { quantity: 2 } });
    const res = await request(app)
        .delete('/api/v1/cart/'+cartProduct.id)
        .set("Authorization", "Bearer "+token);
    expect(res.status).toBe(204);
})

test("PUT /cart/:id should update one cart product", async () => {
    const update = {
        quantity: 4
    }
    const res = await request(app)
        .put(`/api/v1/cart/${id}`)
        .send(update)
        .set('Authorization', 'Bearer '+token);
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(4);
})

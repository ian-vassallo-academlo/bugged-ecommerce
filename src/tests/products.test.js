const request = require('supertest');
const app = require('../app');
const { category: Category, image: Image, product: Product } = require('../models');
const getToken = require('./createData/getToken');

let id;
let token;

beforeAll(async() => {
    const product = await Product.findOne({ where: { title: "Samsung Galaxy" } });
    id = product.id;
    token = await getToken();
});

test("GET /products should get two products", async() => {
    const res = await request(app).get('/api/v1/products');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
})

test("POST /products should add one product", async() => {
    const category = await Category.findOne();
    const newProduct = {
        title: "product",
        description: "product",
        price: 700.00,
        brand: "Samsung",
        categoryId: category.id
    }
    const res = await request(app)
        .post('/api/v1/products')
        .send(newProduct)
        .set('Authorization', 'Bearer '+token)
    expect(res.status).toBe(201);
    expect(res.body.title).toBe("product");
})

test("DELETE /products/:id should delete one product", async() => {
    const product = await Product.findOne({ where: { title: "delete" } })
    const res = await request(app)
        .delete('/api/v1/products/'+product.id)
        .set('Authorization', 'Bearer '+token)
    expect(res.status).toBe(204);
})

test("PUT /products/:id should update one product", async () => {
    const update = {
        title: "Samsung updated"
    }
    const res = await request(app)
        .put(`/api/v1/products/${id}`)
        .send(update)
        .set('Authorization', 'Bearer '+token)
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Samsung updated");
})

test("POST /products/:id/images should set product images", async () => {
    const images = await Image.findAll({ raw: true });
    const imagesIds = images.map(image => image.id);
    const res = await request(app)
        .post(`/api/v1/products/${id}/images`)
        .send(imagesIds)
        .set('Authorization', 'Bearer '+token);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(imagesIds.length);
})

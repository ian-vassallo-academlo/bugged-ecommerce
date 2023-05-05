
const { category: Category } = require('../models');
const getToken = require("./createData/getToken");
const request = require('supertest');
const app = require('../app');

let id;
let token;

beforeAll(async() => {
    const category = await Category.findOne({ where: { name: "Smartphones" } });
    id = category.id;
    token = await getToken();
})

test("GET /categories should return all categories", async() => {
    const res = await request(app).get('/api/v1/categories');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
})

test("POST /categories should create one category", async() => {
    const newCategory = { name: "Smart TV" }
    const res = await request(app)
        .post('/api/v1/categories')
        .send(newCategory)
        .set('Authorization', 'Bearer '+token);
    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Smart TV");
})

test("DELETE /categories/:id should delete one category", async() => {
    const category = await Category.findOne({ where: {name: 'delete'} });
    const res = await request(app)
        .delete(`/api/v1/categories/${category.id}`)
        .set('Authorization', 'Bearer '+token);
    expect(res.status).toBe(204);
})

test("PUT /categories/:id should update one category", async() => {
    const update = {
        name: "smartphones updated"
    }
    const res = await request(app)
        .put(`/api/v1/categories/${id}`)
        .send(update)
        .set('Authorization', 'Bearer '+token);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("smartphones updated")
})

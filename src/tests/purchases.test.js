const getToken = require("./createData/getToken");
const request = require('supertest');
const app = require('../app');

let token;

beforeAll(async() => {
    token = await getToken();
});

test('GET /purchases should return all purchases', async () => {
    const res = await request(app)
        .get('/api/v1/purchases')
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
})

test("POST /purchases should purchase the cart", async () => {
    const purchasesRes = await request(app)
        .post('/api/v1/purchases')
        .set('Authorization', `Bearer ${token}`)
    
    const cartRes = await request(app)
        .get('/api/v1/cart')
        .set('Authorization', `Bearer ${token}`)

    expect(purchasesRes.status).toBe(201);
    expect(cartRes.body).toHaveLength(0);
})

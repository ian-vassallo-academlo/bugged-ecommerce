const request = require("supertest");
const app = require('../app');
const { user: User } = require("../models");
const getToken = require("./createData/getToken");

let token;
let id;

beforeAll(async() => {
    token = await getToken();
    const user = await User.findOne({ where: {firstName: "John"} })
    id = user.id;
})


const getUsers = async () => {
    return await request(app)
        .get('/api/v1/users')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
}

test("GET /users should return two users", async () => {
    const res = await getUsers();
    expect(res.body).toHaveLength(2);
})

test("GET /users should not return the password", async () => {
    const res = await getUsers();
    expect(res.body[0].password).toBe(undefined);
})

test("POST /users should create one user", async () => {
    const newField = {
        firstName: "Mickey",
        lastName: "Mouse",
        email: "mickey@gmail.com",
        password: "mickey1234",
        phone: "1234567890"
    }
    const res = await request(app)
        .post('/api/v1/users')
        .send(newField);
    expect(res.statusCode).toBe(201);
})

test("DELETE /users/:id should delete an user", async () => {
    const user = await User.findOne({ where: {firstName: "user delete"} })
    const res = await request(app)
        .delete(`/api/v1/users/${user.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204);
    expect(res.status).toBe(204);
})

test("PUT /users/:id should update an user", async () => {
    const update = {
        firstName: "John updated"
    }
    const res = await request(app)
        .put(`/api/v1/users/${id}`).send(update)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe("John updated")
})

test("POST /users/login should return the token", async () => {
    const data = {
        email: "john@gmail.com",
        password: "john1234",
    };
    const res = await request(app).post('/api/v1/users/login').send(data);
    expect(res.status).toBe(200)
    expect(res.body.token).toBeDefined()
})

test("POST /users/login with invalid credentials should return 401", async () => {
    const data = {
        email: "incorrect@incorrect.com",
        password: "incorrect1234"
    };
    const res = await request(app).post('/api/v1/users/login').send(data);
    expect(res.status).toBe(401)
})

test("GET /users/me return logged user", async () => {
    const res = await request(app)
        .get('/api/v1/users/me')
        .set('Authorization', 'Bearer '+token)
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe("John");
})

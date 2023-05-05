const request = require('supertest');
const app = require('../../app');

const getToken = async () => {
    const user = {
        email: "john@gmail.com",
        password: "john1234"
    }
    const res = await request(app)
        .post('/api/v1/users/login')
        .send(user);
    return res.body.token;
}

module.exports = getToken;
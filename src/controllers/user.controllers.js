const catchError = require('../utils/catchError');
const { user: User } = require('../models');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const getAll = catchError(async (req, res) => {
    const results = await User.findAll();
    return res.json(results);
});

const create = catchError(async (req, res, next) => {
    try {
        const result = await User.create(req.body);
        return res.status(201).json(result);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(403).send({ message: 'error', error: "User already exists"});
        } else next();
    }
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await User.findByPkPlease(id);
    if (!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await User.update(
        req.body,
        { where: { id }, returning: true }
    );
    if (result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const login = catchError(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOnePlease({ where: { email } });
    if (!user) return res.status(401).json({ error: "invalid credentials" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ error: "invalid credentials" });

    const token = jwt.sign(
        { user },
        process.env.TOKEN_SECRET
    )

    return res.json({ user, token });
})

const getLoggedUser = catchError(async (req, res) => {
    const loggedUser = req.user;
    return res.json(loggedUser);
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login,
    getLoggedUser
}
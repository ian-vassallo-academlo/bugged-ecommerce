const { user: User } = require("../../models");

const createUsers = async () => {
    const usersData = [
        {
            firstName: "John",
            lastName: "Doe",
            email: "john@gmail.com",
            password: "john1234",
            phone: "1234567890"
        },
        {
            firstName: "user delete",
            lastName: "Bolt",
            email: "usain@gmail.com",
            password: "usain1234",
            phone: "1234567890"
        }
    ]
    const users = await User.bulkCreate(usersData, { individualHooks: true });
    return users;
}

module.exports = createUsers;
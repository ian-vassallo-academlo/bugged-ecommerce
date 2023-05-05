const { category: Category } = require("../../models");

const createCategories = async() => {
    const categories = [
        { name: "Smartphones" },
        { name: "delete" }
    ]
    await Category.bulkCreate(categories);
}

module.exports = createCategories;
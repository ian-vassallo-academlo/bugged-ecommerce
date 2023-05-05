const { image: Image } = require("../../models");

const createImages = async() => {
    const images = [
        {
            url: "https://hello",
            filename: "product1.jpg"
        },
        {
            url: "https://hello",
            filename: "product2.jpg"
        }
    ]
    await Image.bulkCreate(images);
}

module.exports = createImages;
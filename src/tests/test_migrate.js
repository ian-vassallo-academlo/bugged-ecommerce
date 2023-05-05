const createCart = require("./createData/createCart");
const createCategories = require("./createData/createCategories");
const createImages = require("./createData/createImages");
const createProducts = require("./createData/createProducts");
const createPurchases = require("./createData/createPurchases");
const createUsers = require("./createData/createUsers");

const main = async() => {
    try{
        await createUsers();
        await createCategories();
        await createImages();
        await createProducts();
        await createCart();
        await createPurchases();
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();

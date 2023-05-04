const mongoose = require('mongoose');
const Item = mongoose.model('item');

async function addItems() {
    try{
        const itemCount = await Item.find().estimatedDocumentCount();

        if (itemCount == 0){
            const item1 = new Item({
                name: 'LG TV',
                category_id: 1,
                price: 100000,
                owner_name: "admin"
            });
            await item1.save();

            const item2 = new Item({
                name: 'Samsung TV',
                category_id: 1,
                price: 160000,
                owner_name: "admin"
            });
            await item2.save();

            const item3 = new Item({
                name: 'PS5',
                category_id: 2,
                price: 200000,
                owner_name: "admin"
            });
            await item3.save();

            console.log('Itemek inicializalva!');
        }
    } catch (error){
        console.error('Hiba tortent az itemek inicializalasa soran!');
    }
}

module.exports = addItems;
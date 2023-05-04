const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    category_id: {type: Number, required: true},
    price: {type: Number, required: true},
    description: {type: String},
    owner_name: {type: String, default: ""},
    image_url: {type: String, default: ""}
});


itemSchema.post('find', (docs) => {
    if (Array.isArray(docs)) {
        for(let i =0; i < docs.length; i++){
            changeDesc(docs[i]);
        }
    }else{
        changeDesc(docs);
    }
    return docs;
})


function changeDesc(item){
    if(item.description == null){
        item.description = "Description is not available."
    }
}

const Item = mongoose.model('item', itemSchema);

module.exports = Item;
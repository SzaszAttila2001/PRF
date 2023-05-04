const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Item = mongoose.model('item');
const passport = require('passport');


async function getItem(req, res, next){
    if(req.isAuthenticated()){
        try{
            item = await Item.findById({_id: req.params.id});
            if(item == null){
                return res.status(404).json({ message: 'Az item nem található!' });
            }
        }catch(err){
            return res.status(500).json({ message: err.message });
        }
    }else{
        return res.status(403).send("A termekeket csak bejelentkezett felhasznalo tekintheti meg!")
    }
    req.item = item;
    next();
};


router.get('/', async (req, res) => {
    if (req.isAuthenticated()){
        const items = await Item.find();
        return res.status(200).send(items);
    }else{
        return res.status(403).send("A termekeket csak bejelentkezett felhasznalo tekintheti meg!")
    }
});

router.get('/:search', async (req, res) => {
    const regex = new RegExp(`${req.params.search}+`);
    if (req.isAuthenticated()){
        const items = await Item.find({name: regex});
        return res.status(200).send(items);
    }else{
        return res.status(403).send("A termekeket csak bejelentkezett felhasznalo tekintheti meg!")
    }
});

router.route('/select/:id').get(getItem, async (req, res) => {
    if(req.item == null){
        res.status(404).json({ message: "A termek nem talalhato!" });
    } else {
        res.status(200).send(req.item);
    }
});


router.patch('/:id', getItem, async (req, res) => {
    if(req.body.name != null) {
        req.item.name = req.body.name;
    }
    if(req.body.price != null) {
        req.item.price = req.body.price;
    }
    if(req.body.description != null) {
        req.item.description = req.body.description;
    }

    try{
        const updatedItem = await req.item.save();
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

router.delete('/:id', getItem, async (req, res) => {
    try{
        await req.item.remove();
        res.json({message: 'Az item sikeresen torolve!'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.post('/', async (req, res, next) => {
    if(req.isAuthenticated()){
        const item = new Item({
            name: req.body.name,
            category_id: req.body.category_id,
            price: req.body.price,
            description: req.body.description,
            owner_name: req.user.username,
            image_url: req.body.image_url
        })

        try{
            const newItem = await item.save();
            return res.status(200).send(item);   
        }catch (error){
            res.status(400).json({message: error.message});
        }
    }else{
        return res.status(403).send("A termekeket csak bejelentkezett felhasznalo tolthet fel!")
    }
});



module.exports = router;
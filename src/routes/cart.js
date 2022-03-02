const express = require('express');
const router = express.Router();
const CartManager = require('../managers/cart');

const cartService = new CartManager();

router.get('/', (req, res) => {
    cartService.getAll().then(cart => res.send(cart));
})

router.delete('/:id', (req, res) => {
    const req_id = req.params['id'];
    cartService.deleteCart(req_id).then(cart=> res.send(cart))
})

router.get('/:id/products', (req,res)=>{
    
})
module.exports = router;
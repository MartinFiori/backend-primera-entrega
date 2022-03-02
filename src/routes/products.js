const express = require('express');
const router = express.Router();
const ProductsManager = require('../managers/products');

const productService = new ProductsManager();

router.get('/(:id)?', (req, res) => {
    const req_id = req.params['id'];
    if(req_id){
        productService.findProductById(req_id).then(result=>res.send(result));
        return{
            status:"success",
            msg: '1 product shown'
        }
    }
    productService.getAllProducts().then(result => res.send(result));
    return{
        status:"success",
        msg: "Product's list shown"
    }
})

router.post('/',(req,res)=>{
    productService.addProduct()
})

router.delete('/:id', (req, res) => {
    const req_id = req.params['id'];
    if (isNaN(req_id)) return res.send({
        status: "error",
        error: "Invalid ID"
    })
    productService.deleteById(req_id).then(product => res.send(product));
})

router.put('/:id', (req, res) => {

})
module.exports = router;
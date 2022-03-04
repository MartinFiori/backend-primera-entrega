const express = require('express');
const productsRouter = require('./routes/products.js');
const cartRouter = require('./routes/cart.js')

const app = express();
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.get('*', (req, res) => {
    res.send({
        status: "error",
        error: `Couldn't find route ${req.url}`
    })
})


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
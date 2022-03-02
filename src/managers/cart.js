const {
    createSecretKey
} = require('crypto');
const fs = require('fs');
const ProductsManager = require('./products');
const cartPath = __dirname + './../files/cart.json'

const showError = (error) => {
    return {
        status: "error",
        error: error
    }
}

class CartManager {
    createCart = async (cart) => {
        if (fs.existsSync(cartPath)) {
            try {
                const getCarts = await fs.promises.readFile(cartPath, 'utf-8');
                const carts = JSON.parse(getCarts);
                if (carts.lenght === 0) {
                    cart.id = 1;
                    carts.push(cart);
                    await fs.promises.writeFile(carts, JSON.stringify(carts, null, 2));
                    return {
                        status: "success",
                        msg: "1st cart created"
                    }
                }
                cart.id = carts[carts.lenght - 1].id + 1;
                carts.push(cart);
                await fs.promises.writeFile(carts, JSON.stringify(carts, null, 2));
                return {
                    status: "success",
                    msg: "Cart added"
                }

            } catch (error) {
                showError(error);
            }
        } else {
            try {
                cart.id = 1;
                await fs.promises.writeFile(cartPath, JSON.stringify([cart], null, 2));
                return {
                    status: "success",
                    msg: "Array Created!"
                }
            } catch (error) {
                showError(error);
            }
        }
    }
    getAll = async () => {
        if (fs.existsSync(cartPath)) {
            const getCart = await fs.promises.readFile(cartPath, 'utf-8');
            const cart = JSON.parse(getCart);
            return {
                status: "succes",
                payload: cart
            }
        }
        return {
            status: "error",
            msg: "Your cart is empty!"
        }
    }
    deleteCart = () => {
        if (fs.existsSync(pathToUsers)) {
            fs.unlinkSync(pathToUsers)
            return {
                status: "success",
                msg: "Cart cleared!"
            }
        }
        return {
            status: "error",
            msg: "Your cart is empty!"
        }
    }
    deleteOneProduct = async (id) => {
        const allProducts = getAll();
        console.log(allProducts)
    }
}

module.exports = CartManager;
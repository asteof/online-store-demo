import ShopView from "./shopView.js";
import ShopModel from "./shopModel.js";

class ShopController {
    constructor() {
        this.model = new ShopModel(this.loadOKHandler, this.loadErrorHandler);
        this.view = new ShopView(this.addToCartHandler, this.removeItemHandler);


    }

    initialize = () => {
        this.view.setListeners()
        this.model.getProducts();
    }

    loadOKHandler = (productsArray) => {
        productsArray.forEach(product => {
            this.view.renderProduct(product);
        })
    }

    loadErrorHandler = (error) => {
        console.log("error", error);
        this.view.renderError(error);
    }

    addToCartHandler = (productData) => {
        productData.push(1);
        this.model.addToCart(productData);
        this.view.showMessage();
    }

    removeItemHandler = (id) => {
        this.model.removeFromCart(id);
        this.view.renderCart();
    }

}

const shop = new ShopController();
shop.initialize();
console.log(shop)
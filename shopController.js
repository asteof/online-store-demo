import ShopView from "./shopView.js";
import ShopModel from "./shopModel.js";


class ShopController {
    constructor() {
        this.view = new ShopView();
        this.model = new ShopModel(this.loadOKHandler, this.loadErrorHandler);
    }

    getProductsHandler = () => {
        this.model.getProducts();
    }

    loadOKHandler = (productsArray) => {
        this.view.toggleError();
        productsArray.forEach(product => {
            this.view.renderProduct(product);
        })
    }

    loadErrorHandler = (error) => {
        console.log("error", error);
        this.view.renderError(error);
    }
}

const shop = new ShopController();
shop.getProductsHandler();
console.log(shop)
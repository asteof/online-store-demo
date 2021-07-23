import ShopView from "./shopView.js";
import ShopModel from "./shopModel.js";

class ShopController {

    constructor() {
        this.model = new ShopModel(this.loadOKHandler, this.loadErrorHandler);
        this.view = new ShopView(
            this.addToCartHandler,
            this.removeItemHandler,
            this.changeQuantityHandler,
            this.placeOrderHandler,
            this.sortAscHandler,
            this.sortDescHandler,
            this.sortAZHandler,
            this.sortZAHandler,
            this.getCategoriesHandler,
            this.filterHandler
        );
    }

    initialize = () => {
        this.view.setListeners()
        this.model.getProducts();
        this.view.renderCartCounter();
    }

    loadOKHandler = productsArray => {
        this.model.setProducts(productsArray);
        this.view.renderCategories();
        this.view.renderAllProducts(productsArray)
    }

    loadErrorHandler = error => {
        console.log("error", error);
        this.view.showError('Unable to load data. Please, try again later.', error);
    }

    addToCartHandler = productData => {
        productData.push(1);
        this.model.addToCart(productData);
        this.view.showMessage('Item successfully added!',
            'Open your cart now to order it!');
        this.view.renderCartCounter();
    }

    removeItemHandler = id => {
        this.model.removeFromCart(id);
        this.view.renderCart();
        this.view.renderCartCounter();
    }

    changeQuantityHandler = (id, newQuantity) => {
        this.model.changeQuantity(id, newQuantity);
        this.view.renderCart();
    }

    placeOrderHandler = async (user, cartProducts) => {
        const order = this.model.formatOutput(user, cartProducts);
        const isSent = await this.model.sendMessage(order);
        if (isSent) {
            this.view.showMessage('Your order has been delivered!',
                'You can receive it in the store!');
            this.view.clearInputFields();
            this.removeItemHandler();
        } else {
            this.view.showError('Something went wrong...',
                'We couldn\'t make your order :(');
        }
    }

    sortAscHandler = () => {
        this.view.clearProducts();
        this.model.sortByPriceAsc(this.model.products);
        this.view.renderAllProducts(this.model.products);
    }

    sortDescHandler = () => {
        this.view.clearProducts();
        this.model.sortByPriceDesc(this.model.products);
        this.view.renderAllProducts(this.model.products);
    }

    sortAZHandler = () => {
        this.view.clearProducts();
        this.model.sortByNameAZ(this.model.products);
        this.view.renderAllProducts(this.model.products);
    }

    sortZAHandler = () => {
        this.view.clearProducts();
        this.model.sortByNameZA(this.model.products);
        this.view.renderAllProducts(this.model.products);
    }

    getCategoriesHandler = () => {
        this.model.productsToCategories();
        return this.model.getCategories();
    }

    filterHandler = (category) => {
        if (category !== 'none') {
            const filteredProducts = this.model.filterProducts(category)
            this.view.clearProducts();
            this.view.renderAllProducts(filteredProducts);
        } else {
            this.view.clearProducts();
            this.view.renderAllProducts(this.model.products);
        }
    }

}

const shop = new ShopController();
shop.initialize();

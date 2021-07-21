export default class ShopModel {
    constructor(loadOKHandler, loadErrorHandler) {
        this.loadOKHandler = loadOKHandler;
        this.loadErrorHandler = loadErrorHandler;

        this.API = 'https://spreadsheets.google.com/feeds/cells/1PXorfz2O2NqH-FcW0nA-HhmtZMmSSwgHheifWc0e1tU/1/public/full?alt=json';

    }

    getProducts = () => {
        fetch(this.API)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const productsArray = this.chunkEntryArray(data.feed.entry);
                this.loadOKHandler(productsArray)
            })
            .catch(error => this.loadErrorHandler(error));
    }

    chunkEntryArray = (entry) => {
        const CHUNK_SIZE = 9; // 9 properties of product
        const tempArray = [];

        for (let i = 9; i < entry.length; i += CHUNK_SIZE) {
            // console.log(JSON.stringify(entry[i].gs$cell.inputValue));
            // console.log('row', entry[i].gs$cell.row, 'col', entry[i].gs$cell.col);
            const chunk = entry.slice(i, i + CHUNK_SIZE).map(el => {
                return el.gs$cell.inputValue;
            });
            tempArray.push(chunk);
        }
        console.log(tempArray);
        return tempArray;
    }

    addToCart = (productData) => {
        const cartProducts = JSON.parse(window.localStorage.getItem('cart'));
        if (cartProducts) {
            const product = cartProducts.find(product => product.includes(productData[0]));

            if (product) {
                product[9] += 1;
            } else {
                cartProducts.push(productData);
            }
            window.localStorage.setItem('cart', JSON.stringify(cartProducts));
        } else {
            window.localStorage.setItem('cart', JSON.stringify([productData]));
        }
    }

    getCartItem = (id) => {
        const cartProducts = JSON.parse(window.localStorage.getItem('cart'));
        const product = cartProducts.find(product => product.includes(id));
        const index = cartProducts.findIndex(product => product.includes(id));
        return [cartProducts, index, product];
    }

    removeFromCart = (id = 0) => {
        if (id === 0) {
            window.localStorage.removeItem('cart');
            return;
        }

        const [cartProducts, index] = this.getCartItem(id);
        cartProducts.splice(index, 1);
        window.localStorage.setItem('cart', JSON.stringify(cartProducts));
    }

    changeQuantity = (id, newQuantity) => {
        const [cartProducts, index, product] = this.getCartItem(id);
        product[9] = newQuantity;
        cartProducts.splice(index, 1, product);
        window.localStorage.setItem('cart', JSON.stringify(cartProducts));
    }
}
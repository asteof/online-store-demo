export default class ShopModel {

    products = [];
    categories = [];

    constructor(loadOKHandler, loadErrorHandler) {
        this.loadOKHandler = loadOKHandler;
        this.loadErrorHandler = loadErrorHandler;

        this.products_API = 'https://spreadsheets.google.com/feeds/cells/1PXorfz2O2NqH-FcW0nA-HhmtZMmSSwgHheifWc0e1tU/1/public/full?alt=json';
    }

    getProducts = () => {
        fetch(this.products_API)
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

    setProducts = (products) => {
        this.products = products;
    }

    getCategories = () => {
        return this.categories;
    }

    productsToCategories = () => {
        this.categories = [...new Set(this.products.map(product => product[3]))]
    }

    filterProducts = (category) => {
        return [...this.products.filter(product => product[3] === category)]
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

    formatOutput = (user, cartProducts) => {
        if (cartProducts.length > 0) {
            let total = 0;
            let order = cartProducts.map(product => {
                const productTotal = product[9] * product[7];
                total += productTotal;
                const orderProduct = [
                    `Item ${ product[0] }, ${ product[1] },\n`,
                    `${ product[7] }$ for one\n`,
                    `in quantity of ${ product[9] } (${ product[6] })\n`,
                    `on sum ${ productTotal }\n`];
                return orderProduct.join(' ')
            })

            let userData = [`New order!\n`,
                `From: ${ user.name }\n`,
                `Email: ${ user.email }\n`,
                `Phone: ${ user.phone }\n\n`];
            userData = userData.join(' ');

            return `${ userData }\n ${ order }\n Total: ${ total }$`;
        } else {
            return false;
        }
    }

    sendMessage = (messageText) => {
        if (messageText) {
            console.log(messageText)
            /**/
            return fetch('https://api.telegram.org/bot1871240087:AAFBDWjzlqtiFC7HfpLRdokTIc1zbr6-d24/sendMessage',
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json',},
                    body: JSON.stringify({
                        chat_id: 390026995,
                        text: `${ messageText }`
                    })
                })
                .then(data => {
                    console.log(data);
                    return data.status === 200;
                })
                .catch(error => {
                    console.log(error)
                    return false
                })
            /**/
        } else {
            return false
        }
    }

    sortByNameAZ = (products) => {
        return products.sort((a, b) => {
            if (a[1] < b[1]) {
                return -1;
            }
            if (a[1] > b[1]) {
                return 1;
            }
            return 0;
        })
    }

    sortByNameZA = (products) => {
        return products.sort((a, b) => {
            if (a[1] < b[1]) {
                return 1;
            }
            if (a[1] > b[1]) {
                return -1;
            }
            return 0;
        })
    }

    sortByPriceAsc = (products) => {
        return products.sort((a, b) => {
            return a[7] - b[7];
        })
    }

    sortByPriceDesc = (products) => {
        return products.sort((a, b) => {
            return b[7] - a[7];
        })
    }

}
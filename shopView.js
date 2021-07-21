export default class ShopView {
    constructor(addToCartHandler, removeItemHandler) {
        this.DOM = {
            productsDiv: document.querySelector('.products'),
            testProduct: document.getElementById('test'),
            testProductIW: document.querySelector('#test .product-image-wrap'),

            productDetailsWrap: document.querySelector('.product-details-wrap'),
            detailBg: document.getElementById('detail-bg'),
            detailName: document.getElementById('detail-name'),
            detailManufacture: document.getElementById('detail-manufacture'),
            detailCategory: document.getElementById('detail-category'),
            detailIngredients: document.querySelector('.ingredients'),
            detailAmount: document.getElementById('detail-amount'),
            detailUnits: document.getElementById('detail-units'),
            detailPrice: document.getElementById('detail-price'),
            detailImage: document.querySelector('.detail-image'),
            detailClose: document.getElementById('detail-close'),

            openCartBtn: document.querySelector('.cart-btn'),
            cartWrap: document.querySelector('.cart-wrap'),
            cartBg: document.getElementById('cart-bg'),
            cartClose: document.getElementById('cart-close'),
            cartProducts: document.querySelector('.cart-products'),

            message: document.querySelector('.message'),

            errorContainer: document.querySelector('.error'),
            errorText: document.getElementById('error')
        }

        this.testProductData =
            [1, 'Kirpich', 'Mykolayovych',
                'Technology & gadgets',
                ' Love, Hearts, Cement, Clay, Fire',
                1, '10 L', 1488, 'media/kirpich_tr.png'];

        this.addToCartHandler = addToCartHandler;
        this.removeItemHandler = removeItemHandler;
    }

    renderProduct = (productData) => {
        const product = this.createElement('div', 'product')
        product.dataset.id = productData[0];

        const imageWrap = this.createElement('div', 'product-image-wrap');
        imageWrap.addEventListener('click', () => this.renderProductDetails(productData));

        const image = this.createElement('img', 'product-image');
        image.setAttribute('alt', productData[1]);
        image.setAttribute('src', productData[8]);
        image.addEventListener('error', () => image.setAttribute('src', 'media/cupidonus.png'));


        const productDescription = this.createElement('div', 'product-description');
        const name = this.createElement('div', 'name', productData[1]);
        const manufacturer = this.createElement('div', 'manufacturer', productData[2]);
        const unitsPriceDiv = this.createElement('div', 'units-price');
        const units = this.createElement('div', 'units', productData[6]);
        const price = this.createElement('div', 'price', `${ productData[7] }$`);
        unitsPriceDiv.append(units, price);

        const cartBtnWrap = this.createElement('div', 'cart-btn-wrap');
        const cartBtn = this.createElement('button', 'product-cart-btn');
        cartBtn.innerHTML = '<img class="cart-icon" src="media/shopping-cart.svg" alt="Add to cart"> Add to cart';
        cartBtn.addEventListener('click', () => this.addToCartHandler(productData));
        cartBtnWrap.appendChild(cartBtn);

        productDescription.append(name, manufacturer, unitsPriceDiv, cartBtnWrap);
        //1 name, 2 manufacturer, 5 amount, 6 units, 7 price


        imageWrap.appendChild(image);
        product.appendChild(imageWrap);
        product.appendChild(productDescription);
        this.DOM.productsDiv.appendChild(product);
    }

    createElement = (tag, className, textContent) => {
        const element = document.createElement(tag);
        if (className)
            element.setAttribute('class', className);
        if (textContent)
            element.textContent = textContent;
        return element;
    }

    renderProductDetails = (productData) => {
        this.DOM.productDetailsWrap.style.display = 'block';

        this.DOM.detailName.dataset.id = productData[0];
        this.DOM.detailName.textContent = productData[1];

        this.DOM.detailManufacture.textContent = productData[2];
        this.DOM.detailCategory.textContent = productData[3];
        this.DOM.detailIngredients.textContent = productData[4];

        this.DOM.detailAmount.textContent = productData[5];
        this.DOM.detailUnits.textContent = productData[6];
        this.DOM.detailPrice.textContent = productData[7] + '$';

        this.DOM.detailImage.setAttribute('alt', productData[1]);
        this.DOM.detailImage.setAttribute('src', productData[8]);
    }

    closeDetails = () => {
        this.DOM.productDetailsWrap.style.display = 'none';
    }

    renderCart = () => {
        const cartProducts = JSON.parse(window.localStorage.getItem('cart'));
        if (cartProducts)
            while (this.DOM.cartProducts.firstChild) {
                this.DOM.cartProducts.removeChild(this.DOM.cartProducts.firstChild);
            }

        let total = 0;
        console.log(cartProducts);
        cartProducts.forEach(product => {
            const productTotal = product[7] * product[9];
            total += productTotal;
            console.log(productTotal)
            this.renderCartProduct(product, productTotal);
        })
    }

    renderCartProduct = (product, productTotal) => {
        const cartProduct = this.createElement('div', 'cart-product');
        cartProduct.dataset.id = product[0];

        const image = this.createElement('img', 'product-image');
        image.setAttribute('alt', product[1]);
        image.setAttribute('src', product[8]);
        image.addEventListener('error', () => image.setAttribute('src', 'media/cupidonus.png'));

        const cartDescription = this.createElement('div', 'cart-description');
        const name = this.createElement('div', 'name', product[1]);
        const manufacturer = this.createElement('div', 'manufacturer', product[2]);

        const cartOther = this.createElement('div', 'cart-other');
        const units = this.createElement('div');
        units.innerHTML = `Units: <span>${ product[6] }</span>`;
        const price = this.createElement('div');
        price.innerHTML = `Price: <span>${ product[7] }$</span>`;
        cartOther.append(units, price);
        cartDescription.append(name, manufacturer, cartOther);

        const controlsWrap = this.createElement('div', 'controls-wrap');
        const cartControls = this.createElement('div', 'cart-controls');

        const label = this.createElement('label');
        const input = this.createElement('input');
        input.setAttribute('min', '1');
        input.setAttribute('max', '42');
        input.setAttribute('value', product[9].toString());
        label.appendChild(input);

        const buttonMinus = this.createElement('button');
        buttonMinus.innerHTML = `<img src="media/minus.svg" class="icon" alt="-">`;
        const buttonPlus = this.createElement('button');
        buttonPlus.innerHTML = `<img src="media/plus.svg" class="icon" alt="+">`;
        cartControls.append(buttonMinus, label, buttonPlus);

        const totalWrap = this.createElement('div', 'total');
        const total = this.createElement('div');
        total.innerHTML = `Total: <span>${ productTotal }$</span>`

        const removeButton = this.createElement('button');
        const removeIcon = this.createElement('img', 'icon');
        removeIcon.setAttribute('alt', 'Remove from cart');
        removeIcon.setAttribute('src', 'media/trash-bin.svg');
        removeButton.appendChild(removeIcon);
        removeButton.addEventListener('click', () => this.removeItemHandler(product[0]))

        totalWrap.append(removeButton, total);
        controlsWrap.append(cartControls, totalWrap);

        cartProduct.append(image, cartDescription, controlsWrap);
        this.DOM.cartProducts.appendChild(cartProduct);
    }

    toggleCart = () => {
        if (this.DOM.cartWrap.style.display === 'block') {
            this.DOM.cartWrap.style.display = 'none';
        } else {
            this.DOM.cartWrap.style.display = 'block';
        }
    }

    renderError = (error) => {
        this.DOM.errorText.textContent = `Error text: ${ error.toString() }`;
        this.toggleElement(this.DOM.errorContainer)
    }

    toggleElement(element, isShow = true) {
        if (isShow) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    }

    showMessage = () => {
        this.DOM.message.classList.add('messageAnimate');
        setTimeout(
            () => this.DOM.message.classList.remove('messageAnimate'),
            8000);
    }

    setListeners = () => {
        this.DOM.detailImage.addEventListener('error', () => {
            this.DOM.detailImage.setAttribute('src', 'media/shopping-cart.svg');
            this.DOM.detailImage.removeAttribute('style');
        });
        this.DOM.detailBg.addEventListener('click', this.closeDetails);
        this.DOM.detailClose.addEventListener('click', this.closeDetails);

        this.DOM.testProductIW.addEventListener('click', () => {
            this.renderProductDetails(this.testProductData);
        });

        this.DOM.openCartBtn.addEventListener('click', () => {
            this.toggleCart();
            this.renderCart();
        });
        this.DOM.cartBg.addEventListener('click', this.toggleCart)
        this.DOM.cartClose.addEventListener('click', this.toggleCart);
    }


}
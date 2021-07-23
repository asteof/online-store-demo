export default class ShopView {
    constructor(
        addToCartHandler,
        removeItemHandler,
        changeQuantityHandler,
        placeOrderHandler,
        sortAscHandler,
        sortDescHandler,
        sortAZHandler,
        sortZAHandler,
        getCategoriesHandler,
        filterHandler
    ) {

        this.DOM = {
            productsDiv: document.querySelector('.products'),
            testProduct: document.getElementById('test'),
            testProductIW: document.querySelector('#test .product-image-wrap'),

            productDetailsWrap: document.querySelector('.product-details-wrap'),
            detailBg: document.getElementById('detailBg'),
            detailName: document.getElementById('detail-name'),
            detailManufacture: document.getElementById('detail-manufacture'),
            detailCategory: document.getElementById('detail-category'),
            detailIngredients: document.querySelector('.ingredients'),
            detailAmount: document.getElementById('detail-amount'),
            detailUnits: document.getElementById('detail-units'),
            detailPrice: document.getElementById('detail-price'),
            detailImage: document.querySelector('.detail-image'),
            detailClose: document.getElementById('detail-close'),
            detailCartBtn: document.getElementById('add-to-cart'),

            openCartBtn: document.querySelector('.cart-btn'),
            cartCounter: document.getElementById('cartCounter'),
            cartWrap: document.querySelector('.cart-wrap'),
            cartBg: document.getElementById('cartBg'),
            cartClose: document.getElementById('cart-close'),
            cartProducts: document.querySelector('.cart-products'),
            cartTotal: document.querySelector('.cart-total'),

            orderForm: document.querySelector('form'),
            clearCartBtn: document.getElementById('clear'),
            userName: document.getElementById('name'),
            userEmail: document.getElementById('email'),
            userPhone: document.getElementById('phoneNumber'),
            termsCheck: document.getElementById('terms'),

            message: document.querySelector('.message'),
            messageText: document.querySelectorAll('.message div'),

            errorContainer: document.querySelector('.error'),
            warningText: document.getElementById('warning'),
            errorText: document.getElementById('error'),
            closeError: document.getElementById('closeError'),

            selectSort: document.getElementById('sort'),
            selectFilter: document.getElementById('filter')
        }

        this.testProductData =
            [1, 'Kirpich', 'Mykolayovych',
                'Technology & gadgets',
                ' Love, Hearts, Cement, Clay, Fire',
                1, '10 L', 4269, 'media/kirpich_tr.png'];

        this.addToCartHandler = addToCartHandler;
        this.removeItemHandler = removeItemHandler;
        this.changeQuantityHandler = changeQuantityHandler;
        this.placeOrderHandler = placeOrderHandler;

        this.sortAscHandler = sortAscHandler;
        this.sortDescHandler = sortDescHandler;
        this.sortAZHandler = sortAZHandler;
        this.sortZAHandler = sortZAHandler;

        this.getCategoriesHandler = getCategoriesHandler;
        this.filterHandler = filterHandler;

        this.detailCartBtnHasEvent = false;
    }

    renderAllProducts = productsArray => {
        productsArray.forEach(product => {
            this.renderProduct(product);
        })
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

    clearProducts = () => {
        while (this.DOM.productsDiv.firstChild) {
            this.DOM.productsDiv.removeChild(this.DOM.productsDiv.lastChild);
        }
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

        if (this.detailCartBtnHasEvent) {
            this.DOM.detailCartBtn.removeEventListener('click', () => {
                this.addToCartHandler(productData);
            });
        } else {
            this.DOM.detailCartBtn.addEventListener('click', () => {
                this.addToCartHandler(productData);
            })
        }
    }

    closeDetails = () => {
        this.DOM.productDetailsWrap.style.display = 'none';
    }


    renderCart = () => {
        const cartProducts = JSON.parse(window.localStorage.getItem('cart'));
        let total = 0;
        console.log(cartProducts);
        while (this.DOM.cartProducts.firstChild) {
            this.DOM.cartProducts.removeChild(this.DOM.cartProducts.firstChild);
        }
        if (cartProducts !== null && cartProducts.length > 0) {
            cartProducts.forEach(product => {
                const productTotal = product[7] * product[9];
                total += productTotal;
                console.log(productTotal)
                this.renderCartProduct(product, productTotal);
            })
            this.renderCartCounter();
        } else {
            this.renderEmptyCart();
        }
        this.DOM.cartTotal.textContent = total.toString() + '$';
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

        const buttonMinus = this.createElement('button');
        buttonMinus.innerHTML = `<img src="media/minus.svg" class="icon" alt="-">`;
        buttonMinus.addEventListener('click', () => {
            const newQuantity = product[9] - 1;
            this.changeQuantityHandler(product[0], newQuantity);
        })
        const buttonPlus = this.createElement('button');
        buttonPlus.innerHTML = `<img src="media/plus.svg" class="icon" alt="+">`;
        buttonPlus.addEventListener('click', () => {
            const newQuantity = product[9] + 1;
            this.changeQuantityHandler(product[0], newQuantity);
        })
        if (product[9] <= 1) {
            buttonMinus.disabled = true;
            buttonPlus.disabled = false;
            product[9] = 1
        } else if (product[9] >= 42) {
            buttonPlus.disabled = true;
            buttonMinus.disabled = false;
            product[9] = 42;
        } else if (product[9] === null) {
            product[9] = 1;
            productTotal = product[7];
        }

        const label = this.createElement('label');
        const input = this.createElement('input');
        input.setAttribute('min', '1');
        input.setAttribute('max', '42');
        input.setAttribute('maxlength', '2');
        input.setAttribute('value', product[9].toString());
        input.addEventListener('change', () => {
            this.changeQuantityHandler(product[0], parseInt(input.value))
        })

        label.appendChild(input);

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

    renderCartCounter = () => {
        const cartProducts = JSON.parse(window.localStorage.getItem('cart'));
        if (cartProducts === null || cartProducts.length <= 0) {
            this.DOM.cartCounter.style.opacity = '0';
        } else if (cartProducts.length > 0) {
            this.DOM.cartCounter.textContent = cartProducts.length;
            this.DOM.cartCounter.style.opacity = '1';
        }
    }

    renderEmptyCart = () => {
        const empty = this.createElement('div', 'empty');
        const row1 = this.createElement('div');
        const row2 = this.createElement('div');
        row1.textContent = 'Your cart is empty...';
        row2.textContent = 'But you always can fix that :)';
        empty.append(row1, row2);
        this.DOM.cartProducts.appendChild(empty);
    }

    toggleCart = () => {
        if (this.DOM.cartWrap.style.display === 'block') {
            this.DOM.cartWrap.style.display = 'none';
            this.toggleError(false)
        } else {
            this.DOM.cartWrap.style.display = 'block';
        }
    }

    showError = (warning, error = '') => {
        this.DOM.warningText.textContent = warning.toString();
        this.DOM.errorText.textContent = error.toString();
        this.toggleError();
    }

    toggleError(isShow = true) {
        if (isShow) {
            this.DOM.errorContainer.style.display = 'block';
            this.DOM.errorContainer.style.opacity = '1';
        } else {
            this.DOM.errorContainer.style.opacity = '0';
            this.DOM.errorContainer.style.display = 'none';
        }
    }

    showMessage = (message1, message2 = '') => {
        this.DOM.messageText[0].textContent = message1.toString();
        this.DOM.messageText[1].textContent = message2.toString();

        this.DOM.message.classList.add('messageAnimate');
        setTimeout(
            () => this.DOM.message.classList.remove('messageAnimate'),
            5000);
    }

    renderCategories = () => {
        const categories = this.getCategoriesHandler();
        console.log(categories)
        categories.forEach(category => {
            const option = this.createElement('option', false, category);
            option.setAttribute('value', category.toString())
            this.DOM.selectFilter.appendChild(option);
        })
    }

    getUserInfo = () => {
        const name = this.DOM.userName.value;
        const email = this.DOM.userEmail.value;
        const phone = this.DOM.userPhone.value;

        const user = {};

        if (name && email && phone) {
            user.name = name;
            user.email = email;
            user.phone = phone;
        }
        return user;
    }

    clearInputFields = () => {
        this.DOM.userName.value = '';
        this.DOM.userEmail.value = '';
        this.DOM.userPhone.value = '';
    }

    placeOrder = e => {
        e.preventDefault();

        const user = this.getUserInfo();
        const cartProducts = JSON.parse(window.localStorage.getItem('cart'));

        if (cartProducts === null) {
            this.showError('Cart is empty.');
            return;
        }

        if (Object.keys(user).length !== 0
            && this.DOM.termsCheck.checked) {
            this.placeOrderHandler(user, cartProducts);
        } else {
            this.showError('One or more fields are empty.',
                'Please fill all the fields!')
        }
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

        this.DOM.orderForm.addEventListener('submit', (e) => {
            this.placeOrder(e);
        })

        this.DOM.clearCartBtn.addEventListener('click', () => {
            this.removeItemHandler();
        })

        this.DOM.closeError.addEventListener('click', () => {
            this.toggleError(false)
        })

        this.DOM.selectSort.addEventListener('change', () => {
            const option = this.DOM.selectSort.value;
            switch (option) {
                case 'price-low-high':
                    this.sortAscHandler();
                    break;
                case 'price-high-low':
                    this.sortDescHandler();
                    break;
                case 'name-az':
                    this.sortAZHandler();
                    break;
                case 'name-za':
                    this.sortZAHandler();
                    break;
            }
        })

        this.DOM.selectFilter.addEventListener('change', () => {
            const category = this.DOM.selectFilter.value;
            this.filterHandler(category);
        })
    }

    createElement = (tag, className, textContent) => {
        const element = document.createElement(tag);
        if (className)
            element.setAttribute('class', className);
        if (textContent)
            element.textContent = textContent;
        return element;
    }
}
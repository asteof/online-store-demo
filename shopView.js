export default class ShopView {
    constructor() {
        this.DOM = {
            productsDiv: document.querySelector('.products'),
            testProduct: document.getElementById('test'),
            testProductIW: document.querySelector('#test .product-image-wrap'),

            productDetailsWrap: document.querySelector('.product-details-wrap'),
            detailBg: document.querySelector('.detail-bg'),
            detailName: document.getElementById('detail-name'),
            detailManufacture: document.getElementById('detail-manufacture'),
            detailCategory: document.getElementById('detail-category'),
            detailIngredients: document.querySelector('.ingredients'),
            detailAmount: document.getElementById('detail-amount'),
            detailUnits: document.getElementById('detail-units'),
            detailPrice: document.getElementById('detail-price'),
            detailImage: document.querySelector('.detail-image'),


            errorContainer: document.querySelector('.error'),
            errorText: document.getElementById('error')
        }

        this.testProductData =
            [1, 'Kirpich', 'Mykolayovych',
                'Technology & gadgets',
                ' Love, Hearts, Cement, Clay, Fire',
                1, '10 L', 1488, 'media/kirpich.png'];


    }

    renderProduct = (productData) => {
        const product = this.createElement('div', 'product')
        product.dataset.id = productData[0].gs$cell.inputValue;

        const imageWrap = this.createElement('div', 'product-image-wrap');
        imageWrap.addEventListener('click', () => this.renderProductDetails(productData));

        const image = this.createElement('img', 'product-image');
        image.setAttribute('alt', productData[1].gs$cell.inputValue);
        image.setAttribute('src', productData[8].gs$cell.inputValue);
        image.addEventListener('error', () => image.setAttribute('src', 'media/cupidonus.png'));


        const productDescription = this.createElement('div', 'product-description');
        const name = this.createElement('div', 'name', productData[1].gs$cell.inputValue);
        const manufacturer = this.createElement('div', 'manufacturer', productData[2].gs$cell.inputValue);
        const unitsPriceDiv = this.createElement('div', 'units-price');
        const units = this.createElement('div', 'units', productData[6].gs$cell.inputValue);
        const price = this.createElement('div', 'price', `${ productData[7].gs$cell.inputValue }$`);
        unitsPriceDiv.append(units, price);

        const cartBtnWrap = this.createElement('div', 'cart-btn-wrap');
        const cartBtn = this.createElement('button', 'product-cart-btn');
        cartBtn.innerHTML = '<img class="cart-icon" src="media/shopping-cart.svg" alt="Add to cart"> Add to cart';
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
        this.DOM.detailName.dataset.id = productData[0].gs$cell.inputValue;
        this.DOM.detailName.textContent = productData[1].gs$cell.inputValue;

        this.DOM.detailManufacture.textContent = productData[2].gs$cell.inputValue;

        this.DOM.detailCategory.textContent = productData[3].gs$cell.inputValue;

        this.DOM.detailIngredients.textContent = productData[4].gs$cell.inputValue;

        this.DOM.detailAmount.textContent = productData[5].gs$cell.inputValue;

        this.DOM.detailUnits.textContent = productData[6].gs$cell.inputValue;

        this.DOM.detailPrice.textContent = productData[7].gs$cell.inputValue + '$';

        this.DOM.detailImage.setAttribute('alt', productData[1].gs$cell.inputValue);
        this.DOM.detailImage.setAttribute('src', productData[8].gs$cell.inputValue);

        console.log(productData)
    }

    renderError = (error) => {
        this.DOM.errorText.textContent = `Error text: ${ error.toString() }`;
        this.toggleError(true)
    }

    toggleError(isShow = false) {
        if (isShow) {
            this.DOM.errorContainer.style.display = 'block';
        } else {
            this.DOM.errorContainer.style.display = 'none';
        }
    }

    setListeners = () => {
        this.DOM.detailImage.addEventListener('error', () => image.setAttribute('src', 'media/shopping-cart.svg'));
        this.DOM.detailBg.addEventListener('click', () => {
            this.DOM.productDetailsWrap.style.display = 'none';
        });
        this.DOM.testProductIW.addEventListener('click', () => this.renderProductDetails(this.testProductData));
        // this.DOM.
    }

}
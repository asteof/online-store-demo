const productsDiv = document.querySelector('.products');
const testProduct = document.getElementById('test');
const productDetailsWrap = document.querySelector('.product-details-wrap');
const detailsBg = document.querySelector('.details-bg');

const fetchData = () => {
    fetch('https://spreadsheets.google.com/feeds/cells/1PXorfz2O2NqH-FcW0nA-HhmtZMmSSwgHheifWc0e1tU/1/public/full?alt=json')
        .then(response => {
            console.log(response)
            return response.json()
        })
        .then(data => {
            console.log(data)

            const productsArray = chunkEntryArray(data.feed.entry);
            productsArray.forEach(product => {
                createProduct(product);
            })

        })
        .catch(error => console.log(error));
}

fetchData();

//splits array in fixed size subarrays
const chunkEntryArray = (entry) => {
    const CHUNK_SIZE = 9; // 9 properties of product
    const tempArray = [];

    for (let i = 9; i < entry.length; i += CHUNK_SIZE) {
        // console.log(JSON.stringify(entry[i].gs$cell.inputValue));
        // console.log('row', entry[i].gs$cell.row, 'col', entry[i].gs$cell.col);
        const chunk = entry.slice(i, i + CHUNK_SIZE);
        chunk.forEach(el => {
            delete el.id;
            delete el.category;
            delete el.link;
            delete el.updated;
        })
        tempArray.push(chunk);
    }
    console.log(tempArray);
    return tempArray;
}


const createProduct = (productData) => {
    const product = createElement('div', 'product')
    product.dataset.id = productData[0].gs$cell.inputValue;

    const imageWrap = createElement('div', 'product-image-wrap');

    const image = createElement('img', 'product-image');
    image.setAttribute('alt', productData[1].gs$cell.inputValue);
    image.setAttribute('src', productData[8].gs$cell.inputValue);
    image.addEventListener('error', () => image.setAttribute('src', 'media/cupidonus.png'));
    image.addEventListener('click', ()=>productDetailsHandler(productData));


    const productDescription = createElement('div', 'product-description');
    const name = createElement('div', 'name', productData[1].gs$cell.inputValue);
    const manufacturer = createElement('div', 'manufacturer', productData[2].gs$cell.inputValue);
    const unitsPriceDiv = createElement('div', 'units-price');
    const units = createElement('div', 'units', productData[6].gs$cell.inputValue);
    const price = createElement('div', 'price', `${ productData[7].gs$cell.inputValue }$`);
    unitsPriceDiv.append(units, price);

    const cartBtnWrap = createElement('div', 'cart-btn-wrap');
    const cartBtn = createElement('button', 'product-cart-btn');
    cartBtn.innerHTML = '<img class="cart-icon" src="media/shopping-cart.svg" alt="Add to cart"> Add to cart';
    cartBtnWrap.appendChild(cartBtn);

    productDescription.append(name, manufacturer, unitsPriceDiv, cartBtnWrap);
    //1 name, 2 manufacturer, 5 amount, 6 units, 7 price


    imageWrap.appendChild(image);
    product.appendChild(imageWrap);
    product.appendChild(productDescription);
    productsDiv.appendChild(product);
}

const createElement = (tag, className, textContent) => {
    const element = document.createElement(tag);
    if (className)
        element.setAttribute('class', className);
    if (textContent)
        element.textContent = textContent;
    return element;
}

const productDetailsHandler = (productData)=>{
    productDetailsWrap.style.display = 'block';

}

detailsBg.addEventListener('click', ()=>{productDetailsWrap.style.display = 'none'})
testProduct.addEventListener('click', productDetailsHandler);

/*
[0]
    "col": "1",
    "inputValue": "ID",

[1]
    "col": "2",
    "inputValue": "PRODUCT_NAME",

[2]
    "col": "3",
    "inputValue": "MANUFACTURE",

[3]
    "col": "4",
    "inputValue": "CATEGORY",

[4]
    "col": "5",
    "inputValue": "INGRIDIENTS",

[5]
    "col": "6",
    "inputValue": "AMOUNT",

[6]
    "col": "7",
    "inputValue": "UNITS",

[7]
    "col": "8",
    "inputValue": "PRICE",

[8]
    "col": "9",
    "inputValue": "IMG_LINK",

* */
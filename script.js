
const fetchData = ()=>{
    fetch('https://spreadsheets.google.com/feeds/cells/1PXorfz2O2NqH-FcW0nA-HhmtZMmSSwgHheifWc0e1tU/1/public/full?alt=json')
        .then(response=> {
            console.log(response)
            return response.json()
        })
        .then(data => {
            console.log(data)
            // console.log(JSON.stringify(data))
            for (let i = 0; i<9; i++){
                console.log(JSON.stringify(data.feed.entry[i].gs$cell.inputValue))
            }

            // console.log(JSON.stringify(data.feed.entry))

        })
        .catch(error =>console.log(error));
}

fetchData();


/*
    "col": "1",
    "inputValue": "ID",

    "col": "2",
    "inputValue": "PRODUCT_NAME",

    "col": "3",
    "inputValue": "MANUFACTURE",

    "col": "4",
    "inputValue": "CATEGORY",

    "col": "5",
    "inputValue": "INGRIDIENTS",

    "col": "6",
    "inputValue": "AMOUNT",

    "col": "7",
    "inputValue": "UNITS",

    "col": "8",
    "inputValue": "PRICE",

    "col": "9",
    "inputValue": "IMG_LINK",


* */
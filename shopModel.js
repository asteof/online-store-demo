export default class ShopModel {
    constructor(loadOKHandler, loadErrorHandler) {
        this.loadOKHandler = loadOKHandler;
        this.loadErrorHandler = loadErrorHandler;

    }

    getProducts = () => {
        fetch('https://spreadsheets.google.com/feeds/cells/1PXorfz2O2NqH-FcW0nA-HhmtZMmSSwgHheifWc0e1tU/1/public/full?alt=json')
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
}
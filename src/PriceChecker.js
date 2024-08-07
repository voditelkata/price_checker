
export default class PriceChecker {
    constructor(products) {
        this.products = products;
    }

    parse(productsFromAkum, productsFromBat, productsFromRimbat) {
        return this.products.map((item) => {
            const productFromAkum = productsFromAkum.find(product => product['Артикул'] === item.productCode);
            if (!productFromAkum) {
                return undefined;
            }

            const productFromBat = item.productCodeFromBat && productsFromBat.find(product => product['Артикул'] ===  item.productCodeFromBat );
            const productFromRimbat = item.productCodeFromRimbat &&  productsFromRimbat.find(product => product['Артикул'] === item.productCodeFromRimbat);

            return {
                ...productFromAkum,
                ...(productFromBat && {
                    'Артикул Бат': productFromBat['Артикул'],
                    'Наименование Бат': productFromBat['Наименование'],
                    'Рекомендованная цена Бат': productFromBat['Рекомендованная цена'],
                    'Цена Бат': productFromBat['Цена']
                }),
                ...(productFromRimbat && {
                    'Артикул Римбат': productFromRimbat['Артикул'],
                    'Наименование Римбат': productFromRimbat['Наименование'],
                    'Цена Римбат': productFromRimbat['Цена'],
                    'РРЦ Римбат': productFromRimbat['РРЦ']
                }),

            };

        }).filter(product => product);
    }
}

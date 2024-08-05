
export default class PriceChecker {
    constructor(pairs) {
        this.pairs = pairs;
    }

    parse(productsFromAkum, productsFromBat, productsFromRimbat) {
        return Object.keys(this.pairs).map((productCode) => {
            const productFromAkum = productsFromAkum.find(product => product['Артикул'] === productCode);
            if (!productFromAkum) {
                return undefined;
            }

            const [productCodeRimbat, productCodeBat] = this.pairs[productCode];
            const productFromBat = productsFromBat.find(product => product['Артикул'] === productCodeBat);
            const productFromRimbat = productsFromRimbat.find(product => product['Артикул'] === productCodeRimbat);

            return {
                ...productFromAkum,
                ...(productFromBat && {
                    'Артикул Бат': productFromBat['Артикул'],
                    'Рекомендованная цена Бат': productFromBat['Рекомендованная цена'],
                    'Цена Бат': productFromBat['Цена']
                }),
                ...(productFromRimbat && {
                    'Артикул Римбат': productFromRimbat['Артикул'],
                    'Цена Римбат': productFromRimbat['Цена'],
                    'РРЦ Римбат': productFromRimbat['РРЦ']
                }),

            };

        }).filter(product => product);
    }
}

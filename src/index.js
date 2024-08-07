import XlsFile from "./XlsFile.js";
import PriceChecker from "./PriceChecker.js";
import { pairs } from "./pairs.js";

const filePath = './prices';
const files = {
    Bat: 'Бат.xlsx',
    Rimbat: 'Римбат.xls',
    Akamulik: 'Аккамулик артикул.xls',
};
const sheetNumber = 0;

const filename = 'resultFile.xlsx';

try {
    const priceChecker = new PriceChecker(pairs);

    const fileBat = XlsFile.read(`${filePath}/${files.Bat}`, sheetNumber);
    const fileRimbat = XlsFile.read(`${filePath}/${files.Rimbat}`, sheetNumber);
    const fileAkamulik = XlsFile.read(`${filePath}/${files.Akamulik}`, sheetNumber);

    const res = priceChecker.parse(fileAkamulik, fileBat, fileRimbat);

    const columnWidth = [{ wch: 12 }, { wch: 35 }, { wch: 12 }, { wch: 35 }, { wch: 24 }, { wch: 10 }, { wch: 18 }, { wch: 35 }, { wch: 12 }, { wch: 10 }];
    XlsFile.createFile(filename, res, columnWidth)

} catch (error) {
    console.error('Something happens:', error);
}

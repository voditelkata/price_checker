import * as XLSX from 'xlsx';
import * as fs from 'fs';

XLSX.set_fs(fs);

export default class XlsFile {
    static read(filePath, sheet)  {
        const file = XLSX.readFile(filePath);
        return XLSX.utils.sheet_to_json(file.Sheets[file.SheetNames[sheet]]);
    }

    static createFile(fileName, data, columnWidth = []) {
        const currentDate = new Date();
        const workSheet = XLSX.utils.json_to_sheet(data);
        workSheet['!cols'] = columnWidth;
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet 1');
        XLSX.writeFile(workBook, `./${currentDate.getDate()}_${currentDate.getMonth() + 1}_${fileName}`);
    }
}

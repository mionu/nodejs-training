import fs from 'fs';
import path from 'path';
import csvjson from 'csvjson';
import { DIRWATCHER_EVENT, DATA_PATH } from './constants';
import emitter from './dir-emitter';


export default class Importer {
    listen(event, handler) {
        emitter.on(event, handler);
    }

    import(filename) {
        const filePath = path.join(DATA_PATH, { encoding : 'utf8'}, filename);
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, (err, data) => {
                if(err) {
                    reject(err);
                }
                resolve(csvjson.toObject(data));
            })
        })
    }

    importSync(filename) {
        const filePath = path.join(DATA_PATH, filename);
        const data = fs.readFileSync(filePath, { encoding : 'utf8'});
        return csvjson.toObject(data);
    }
}

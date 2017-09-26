import fs from 'fs';
import path from 'path';
import { DIRWATCHER_EVENT } from './constants';
import emitter from './dir-emitter';


export default class Importer {
    constructor(dataPath) {
        this.dataPath = dataPath;
    }

    listen(event, handler) {
        emitter.on(event, handler);
    }

    import(filename) {
        const filePath = path.join(this.dataPath, filename);
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, (err, data) => {
                if(err) {
                    console.log(err);                
                    reject(err);
                }
                console.log(data);
                resolve(data);
            })
        })
    }

    importSync(filename) {
        const filePath = path.join(this.dataPath, filename);
        const data = fs.readFileSync(filePath);
        console.log(data);
        return data;
    }
}
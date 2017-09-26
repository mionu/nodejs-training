import fs from 'fs';
import { DIRWATCHER_EVENT } from './constants';
import emitter from './dir-emitter';

export default class DirWatcher {
    watch(path, delay) {
        fs.watch(path, (event, filename) => {
            if(event === 'change') {
                emitter.emit(DIRWATCHER_EVENT, filename);
            }
            console.log(event, filename);
          });
    }
}
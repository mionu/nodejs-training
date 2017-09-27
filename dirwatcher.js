import fs from 'fs';
import { DIRWATCHER_EVENT } from './constants';
import emitter from './dir-emitter';

export default class DirWatcher {
    watch(path, delay) {
        fs.watch(path, (event, filename) => {
            const timeouts = {};
            if(event === 'change') {
                if(!timeouts[filename]) {
                    timeouts[filename] = setTimeout(() => {
                        emitter.emit(DIRWATCHER_EVENT, filename);
                        timeouts[filename] = null;
                    }, delay);
                }
            }
            console.log(event, filename);
          });
    }
}
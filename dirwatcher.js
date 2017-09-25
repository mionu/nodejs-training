import fs from 'fs';
import { DIRWATCHER_EVENT } from './constants';
import emitter from './dir-emitter';

export default class DirWatcher {
    watch(path, delay) {
        fs.watch(path, (event, filename) => {
            emitter.emit(DIRWATCHER_EVENT, { event, filename });
            console.log(event, filename);
          });
    }
}
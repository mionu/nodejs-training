import fs from 'fs';
import EventEmitter from 'events';

export default class DirWatcher {
    watch(path, delay) {
        fs.watch(path, (event, filename) => {
            EventEmitter.emit(`dirwatcher:${event}`, filename);
            console.log(event);
            console.log(filename);  
          })
    }
}
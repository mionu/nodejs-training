import { DIRWATCHER_EVENT } from './constants';
import emitter from './dir-emitter';

export default class Importer {
    listen(event = DIRWATCHER_EVENT, handler = this.import) {
        emitter.on(event, handler);
    }

    import() {
        console.log('asd');
    }
}
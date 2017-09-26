import conf from './config';
import { User, Product } from './models';
import Importer from './importer';
import DirWatcher from './dirwatcher';
import { DIRWATCHER_EVENT } from './constants';

const DATA_PATH = 'data';

console.log(conf.name);
new User();
new Product();

new DirWatcher().watch(DATA_PATH);

const importer = new Importer(DATA_PATH);

new importer.listen(DIRWATCHER_EVENT, importer.importSync.bind(importer));

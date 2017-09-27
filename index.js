import conf from './config';
import { User, Product } from './models';
import Importer from './importer';
import DirWatcher from './dirwatcher';
import { DIRWATCHER_EVENT } from './constants';

const DATA_PATH = 'data';

console.log(conf.name);
new User();
new Product();

new DirWatcher().watch(DATA_PATH, 1000);

const importer = new Importer();

new importer.listen(DIRWATCHER_EVENT, importer.importSync);

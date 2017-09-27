import conf from './config';
import { User, Product } from './models';
import Importer from './importer';
import DirWatcher from './dirwatcher';
import { DIRWATCHER_EVENT, DATA_PATH } from './constants';

console.log(conf.name);
new User();
new Product();

new DirWatcher().watch(DATA_PATH, 1000);

const importer = new Importer();

importer.listen(DIRWATCHER_EVENT, importer.importSync);

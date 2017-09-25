import conf from './config';
import { User, Product } from './models';
import Importer from './importer';
import DirWatcher from './dirwatcher';

console.log(conf.name);
new User();
new Product();

new DirWatcher().watch('data');

new Importer().listen();

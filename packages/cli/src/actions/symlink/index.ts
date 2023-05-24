import { ensureSymlink } from './ensure';
import { createSymlink } from './create';
import { removeSymlink } from './remove';

export default {
  create: createSymlink,
  remove: removeSymlink,
  ensure: ensureSymlink,
};

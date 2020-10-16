import Dexie from 'dexie';

var db = new Dexie('WizardFormAppDB');

db.version(11).stores({
  users: '++id',
  formState: '++id',
});
db.open();
export default db;

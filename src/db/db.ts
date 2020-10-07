import Dexie from 'dexie';

var db = new Dexie('WizardFormAppDB');

db.version(10).stores({ users: '++id' });
db.open();

export default db;

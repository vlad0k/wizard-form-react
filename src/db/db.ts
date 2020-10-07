import Dexie from "dexie";

var db: any = new Dexie("WizardFormAppDB");

db.version(10).stores({ users: "++id" });
db.open();

export default db;

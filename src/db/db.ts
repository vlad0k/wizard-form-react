import Dexie from "dexie";

var db = new Dexie("WizardFormAppDB");

db.version(1).stores({ users: "++id" });

export default db;

const db = indexedDB.open("users");

db.onerror = function (event) {
  console.log(db.error);
};
db.onsuccess = function (event) {
  console.log("connected to db!", db);
};

export default db;

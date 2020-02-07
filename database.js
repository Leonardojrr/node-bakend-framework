const { MongoClient, ObjectId } = require("mongodb");

// Connection URI
const uri = "mongodb://localhost:27017";

// Database Name
const DB_NAME = "test";

class Mongo {
  constructor() {
    this.client = new MongoClient(uri, { useNewUrlParser: true });
    this.dbname = DB_NAME;
  }

  connect() {
    return new Promise((resolve, rejected) => {
      this.client.connect(err => {
        if (err) rejected(err);
        resolve(this.client.db(this.dbname));
      });
    });
  }

  getAll(query, collection_name) {
    return this.connect().then(db => {
      return db
        .collection(collection_name)
        .find(query)
        .toArray();
    });
  }

  get(id, collection_name) {
    return this.connect().then(db => {
      return db
        .collection(collection_name)
        .find({ email: id })
        .toArray();
    });
  }

  create(data, collection_name) {
    return this.connect().then(db => {
      return db
        .collection(collection_name)
        .insertOne(data)
        .then(result => result.insertedId);
    });
  }

  update(id, data, collection_name) {
    return this.connect().then(db => {
      db.collection(collection_name).updateOne(
        { _id: ObjectId(id) },
        { $set: data },
        { upser: true }
      );
    });
  }

  delete(id, collection_name) {
    return this.connect().then(db => {
      return db.collection(collection_name).deleteOne({ _id: ObjectId(id) });
    });
  }

  query(query, collection_name) {
    return this.connect().then(db => {
      return db
        .collection(collection_name)
        .find(query)
        .toArray();
    });
  }
}

module.exports = { Mongo };
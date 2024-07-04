const { MongoClient, ObjectID } = require('mongodb');

const mongoUsername = process.env.MONGO_ROOT_USERNAME;
const mongoPassword = process.env.MONGO_ROOT_PASSWORD;
const mongoHost = 'mongo'; // Nombre del servicio en Docker Compose
const mongoPort = 27017;
const dbName = 'narumis'; // Nombre de tu base de datos

// URL de conexión con autenticación
const mongoURL = `mongodb://${mongoUsername}:${mongoPassword}@${mongoHost}:${mongoPort}`;

let client;
let db;

const connect = async () => {
  try {
    if (!client) {
      client = new MongoClient(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      await client.connect();
      db = client.db(dbName);
      await initializeDatabase(db);
    }
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

const initializeDatabase = async (db) => {
  const collections = await db.listCollections().toArray();
  const collectionNames = collections.map(col => col.name);

  if (!collectionNames.includes('products')) {
    await db.createCollection('products');
    console.log("Collection 'products' created in 'narumis' database");
  }
};

const close = async () => {
  try {
    await client.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    throw error;
  }
};

const getCollection = (collectionName) => {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db.collection(collectionName);
};

module.exports = {
  connect,
  close,
  getCollection,
  ObjectID
};

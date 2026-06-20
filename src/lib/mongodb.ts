import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI
const dbName = process.env.APP_ENV === 'production' ? 'playlistProd' : 'playlistDev'

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI no está definida')
}

const fullUri = `${MONGODB_URI}/${dbName}`

const opts = {
  dbName,
  bufferCommands: false,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 30000,
}

const connectMongooseSingleton = async () => {
  try {
    const mongooseInstance = await mongoose.connect(fullUri, opts)
    console.log(`Conectado a MongoDB (${process.env.APP_ENV})`)
    return mongooseInstance
  } catch (err) {
    console.error('Error al conectar a MongoDB:', err)
    throw err
  }
}

type MongooseConnection = ReturnType<typeof connectMongooseSingleton>

const globalForMongoose = globalThis as unknown as {
  mongoose: Awaited<MongooseConnection> | undefined
}

let connPromise: MongooseConnection | null = null;

export const getMongoose = async (): Promise<Awaited<MongooseConnection> | undefined> => {
  if (globalForMongoose.mongoose) return globalForMongoose.mongoose;

  if (!connPromise) {
    connPromise = connectMongooseSingleton();
  }

  try {
    const conn = await connPromise;
    globalForMongoose.mongoose = conn;
    return conn;
  } catch {
    console.warn('MongoDB no disponible. Las operaciones que requieran MongoDB fallarán.');
    connPromise = null;
    return undefined;
  }
};


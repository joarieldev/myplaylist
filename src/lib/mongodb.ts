import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI
const dbName = process.env.APP_ENV === 'production' ? 'playlistProd' : 'playlistDev'

const fullUri = `${MONGODB_URI}/${dbName}`

const connectMongooseSingleton = () => {
  return mongoose.connect(fullUri, {
    dbName,
    bufferCommands: false,
  }).then((mongooseInstance) => {
    console.log(`Conectado a MongoDB (${process.env.APP_ENV})`)
    return mongooseInstance
  }).catch((err) => {
    console.error('Error al conectar a MongoDB:', err)
    throw err
  })
}

type MongooseConnection = ReturnType<typeof connectMongooseSingleton>

const globalForMongoose = globalThis as unknown as {
  mongoose: Awaited<MongooseConnection> | undefined
}

const mongooseConnection = globalForMongoose.mongoose ?? await connectMongooseSingleton()

export default mongooseConnection

if (process.env.APP_ENV !== 'production') {
  globalForMongoose.mongoose = globalForMongoose.mongoose = mongooseConnection
}


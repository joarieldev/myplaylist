'use server'

import connectMongoDB from '@/lib/mongodb'
import Favorite from '@/models/Favorite'

export async function getFavorite(user_id: string) {
  if (!connectMongoDB) {
    throw new Error('Error en el servidor al conectar a la base de datos')
  }

  await connectMongoDB

  try {
    const favorite = await Favorite.find({ uid: user_id })

    if (favorite.length === 0) {
      return []
    }
    
    return favorite[0].list
    
  } catch (e) {
    console.error("Error en getFavorite: ", e)
    return []
  }

}

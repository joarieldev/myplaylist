'use server'

import { getMongoose } from '@/lib/mongodb'
import Favorite from '@/models/Favorite'

export async function getFavorite(user_id: string) {
  const mongoose = await getMongoose();
  if (!mongoose) {
    throw new Error('Error en el servidor al conectar a la base de datos')
  }

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

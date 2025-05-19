'use server'

import connectMongoDB from '@/lib/mongodb'
import Favorite from '@/models/Favorite'

export async function getFavorite(user_id: string) {
  await connectMongoDB

  try {
    const favorite = await Favorite.find({ uid: user_id })

    if (favorite.length === 0) {
      return []
    }
    
    return favorite[0].list
    
  } catch (e) {
    console.log("Error en getFavorite: ", e)
    return []
  }

}

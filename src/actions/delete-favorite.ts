"use server"

import connectMongoDB from '@/lib/mongodb'
import Favorite from '@/models/Favorite'

export async function deleteFavorite(user_id: string, itemId: string) {
  await connectMongoDB

  try {
    const result = await Favorite.updateOne(
      { uid: user_id },
      { $pull: { list: { id: itemId } } }
    )

    if (result.modifiedCount === 0) {
      return { ok: false, message: 'No se puedo quitar de favoritos' }
    }

    return { ok: true, modified: result.modifiedCount }
  } catch (e) {
    console.error("Error deleteFavorite:", e)
    return { ok: false, error: e }
  }
}

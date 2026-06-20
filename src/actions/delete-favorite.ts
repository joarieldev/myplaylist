"use server"

import { getMongoose } from '@/lib/mongodb'
import Favorite from '@/models/Favorite'

export async function deleteFavorite(user_id: string, itemId: string) {
  const mongoose = await getMongoose();
  if (!mongoose) {
    throw new Error('Error en el servidor al conectar a la base de datos')
  }

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

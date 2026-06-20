'use server'

import { IList } from '@/interfaces/List'
import { getMongoose } from '@/lib/mongodb'
import Favorite from '@/models/Favorite'

export async function createFavorite(user_id: string, name: string, item: IList) {
  const mongoose = await getMongoose();
  if (!mongoose) {
    throw new Error('Error en el servidor al conectar a la base de datos')
  }

  try {
    const favorite = await Favorite.find({ uid: user_id })

    if (favorite.length !== 0) {
      favorite[0].list.push(item)
      await favorite[0].save()
      return { ok: true, message: 'Añadido a Favoritos' }
    }
    if (favorite.length === 0) {
      await Favorite.create({ uid: user_id, name, list: [item] })
      return { ok: true, message: 'Guardado en Favoritos' }
    }
  } catch (e) {
    console.error("Error en createFavorite: ", e)
    return { ok: false, error: e }
  }

}

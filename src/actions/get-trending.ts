"use server";

import { appName } from "./shared";

export const getTrending = async () => {
  try {
    const res = await fetch(`https://api.audius.co/v1/full/playlists/trending?app_name=${appName}`)

    if (!res.ok) {
      throw new Error("Trending: Algo salió mal");
    }

    const result = await res.json();

    return result.data

  } catch (error) {
    console.error("Error action getTrending: ", error);
    const message = error instanceof Error ? error.message : "Error desconocido"
    throw new Error(message);
  }
}
"use server";

import { appName } from "./shared";

export const getSearch = async (query: string) => {
  try {
    const res = await fetch(`https://discoveryprovider.audius.co/v1/playlists/search?query=${query}?app_name=${appName}`)

    if (!res.ok) {
      throw new Error("Search: Algo salió mal");
    }

    const result = await res.json();

    return result.data

  } catch (error) {
    console.error("Error en getSearch: ", error);
    return error instanceof Error ? error.message : "Error desconocido"
  }
}
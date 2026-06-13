"use server";

import { apiUrl } from "./shared";

export const getSearch = async (query: string) => {
  try {
    const res = await fetch(`${apiUrl}/playlists/search?query=${encodeURIComponent(query)}`)

    if (!res.ok) {
      throw new Error("Algo salió mal");
    }

    const result = await res.json();
    return result.data

  } catch (error) {
    console.error("Error actions getSearch: ", error);
    throw error
  }
}
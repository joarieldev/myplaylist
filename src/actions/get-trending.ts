"use server";

import { apiUrl } from "./shared";

export const getTrending = async () => {
  try {
    const res = await fetch(`${apiUrl}/playlists/trending`)

    if (!res.ok) {
      throw new Error("Algo salió mal");
    }

    const result = await res.json();
    return result.data

  } catch (error) {
    console.error("Error actions getTrending: ", error);
    throw error;
  }
}
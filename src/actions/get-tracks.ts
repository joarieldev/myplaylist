"use server";

import { apiUrl } from "./shared";

export const getTracks = async(id: string) => {
  try {
    const res = await fetch(`${apiUrl}/playlists/${id}/tracks`)
    
    if (!res.ok) {
      throw new Error("Algo salió mal");
    }
    
    const result = await res.json();
    return result.data;

  } catch (error) {
    console.error("Error actions getTracks:", error);
    throw error
  }
}
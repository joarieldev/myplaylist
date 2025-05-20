"use server";

import { appName } from "./shared";

export const getTracks = async(id: string) => {
  try {
    const res = await fetch(`https://discoveryprovider.audius.co/v1/playlists/${id}/tracks?app_name=${appName}`)
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Tracks: Algo salió mal");
    }

    return {
      ok: true,
      data: data.data
    };

  } catch (error) {
    console.error("Error en getTracks:", error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error desconocido"
    }
  }
}
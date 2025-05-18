"use server";

export const getTrending = async () => {
  try {
    const res = await fetch("https://discoveryprovider.audius.co/v1/playlists/trending")

    if (!res.ok) {
      throw new Error("Trending: Algo salió mal");
    }

    const result = await res.json();

    return result.data

  } catch (error) {
    console.error("Error en getTrending: ", error);
    return error instanceof Error ? error.message : "Error desconocido"
  }
}
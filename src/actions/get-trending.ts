"use server";

export const getTrending = async () => {
  try {
    const res = await fetch("https://discoveryprovider.audius.co/v1/playlists/trending")
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Trending: Something went wrong");
    }

    return {
      ok: true,
      data: data.data
    };

  } catch (error) {
    console.error("Error en getTrending:", error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Error desconocido"
    }
  }
}
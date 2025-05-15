"use server";

export const getTracks = async(id: string) => {
  try {
    const res = await fetch(`https://discoveryprovider.audius.co/v1/playlists/${id}/tracks`)
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Tracks: Something went wrong");
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
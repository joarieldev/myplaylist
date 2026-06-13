import { parseBlob } from 'music-metadata';

export async function extractAudioMetadata(file: File) {
  const metadata = await parseBlob(file);

  const title = metadata.common.title || file.name.split('.')[0];
  const artist = metadata.common.artist || 'Desconocido';
  const duration = metadata.format.duration || 0;
  const album = metadata.common.album || 'Desconocido';

  let cover = null;
  if (metadata.common.picture && metadata.common.picture.length > 0) {
    const pic = metadata.common.picture[0];
    const bytes = new Uint8Array(pic.data);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    cover = `data:${pic.format};base64,${btoa(binary)}`;
  }

  return {
    title,
    artist,
    album,
    duration,
    cover,
  };
}
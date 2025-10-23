import { parseBlob } from 'music-metadata';

export async function extractAudioMetadata(file: File) {
  const metadata = await parseBlob(file);

  const title = metadata.common.title || file.name.split('.')[0];
  const artist = metadata.common.artist || 'Desconocido';
  const isDuration = metadata.format.duration;
  let duration = '00:00';
  if (isDuration !== undefined) {
    const minutes = Math.floor(isDuration / 60);
    const seconds = Math.floor(isDuration % 60);
    duration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
  const album = metadata.common.album || 'Desconocido';

  let cover = null;
  if (metadata.common.picture && metadata.common.picture.length > 0) {
    const coverData = metadata.common.picture[0].data;
    const uint8Array = new Uint8Array(coverData);
    cover = URL.createObjectURL(new Blob([uint8Array]));
  }

  return {
    title,
    artist,
    album,
    duration,
    cover,
  };
}
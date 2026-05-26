/**
 * Formatea un tiempo en segundos a formato mm:ss
 */
export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

/**
 * Calcula hasta dónde está buffereado el audio actual.
 * Devuelve el extremo final del buffer que contiene currentTime.
 */
export const updateBuffer = (audio: HTMLAudioElement): number => {
  const currentTime = audio.currentTime;
  const buffered = audio.buffered;

  let bufferedEnd = 0;

  for (let i = 0; i < buffered.length; i++) {
    const start = buffered.start(i);
    const end = buffered.end(i);

    if (currentTime >= start && currentTime <= end) {
      bufferedEnd = end;
      break;
    }

    if (currentTime < start) {
      bufferedEnd = currentTime;
      break;
    }
  }

  if (bufferedEnd === 0 && buffered.length > 0) {
    bufferedEnd = currentTime;
  }

  return bufferedEnd;
};

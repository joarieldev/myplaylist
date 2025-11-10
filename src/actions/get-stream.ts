import { appName } from "./shared";

export const getStream = (id: string) => {
  return `https://discoveryprovider.audius.co/v1/tracks/${id}/stream?app_name=${appName}`
}

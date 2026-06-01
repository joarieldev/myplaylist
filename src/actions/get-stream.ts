import { apiUrl } from "./shared";

export const getStream = (id: string) => {
  return `${apiUrl}/tracks/${id}/stream`
}

"use server";

import { appName } from "./shared";

export const getStream = async (id: string) => {
  return (`https://discoveryprovider.audius.co/v1/tracks/${id}/stream?app_name=${appName}`)
}
"use server";

export const getStream = async (id: string) => {
  return (`https://discoveryprovider.audius.co/v1/tracks/${id}/stream?app_name=TestPower`)
}
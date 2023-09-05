import { PunkBeer } from "@modules/PunkApiClient/punkApi.types";

const baseUrl = process.env.PUNK_API_URL ?? "";
export const PunkApiClient = {
  getBeers: async (page: number, perPage: number): Promise<PunkBeer[]> => {
    const response = await fetch(`${baseUrl}?page=${page}&per_page=${perPage}`);
    const beers = await response.json();
    return beers;
  },

  getBeer: async (id: number): Promise<PunkBeer> => {
    const response = await fetch(`${baseUrl}/${id}`);
    const beer = await response.json();
    return beer;
  },
};

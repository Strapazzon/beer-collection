import { getUniqueListBy } from "@modules/libs/arrays";
import { http } from "@modules/libs/http";
import { PunkBeer } from "@modules/common/PunkApiClient/punkApi.types";

const baseUrl = process.env.PUNK_API_URL ?? "";
export const PunkApiClient = {
  getBeers: async (page: number, perPage: number): Promise<PunkBeer[]> => {
    let url = `${baseUrl}?page=${page}&per_page=${perPage}`;
    return await http<PunkBeer[]>(url);
  },

  getBeer: async (id: number | string): Promise<PunkBeer[]> => {
    return await http<PunkBeer[]>(`${baseUrl}/${id}`);
  },

  searchBeers: async (query: string): Promise<PunkBeer[]> => {
    const beersByName = await http<PunkBeer[]>(
      `${baseUrl}/?beer_name=${query}`
    );

    const beersByFood = await http<PunkBeer[]>(`${baseUrl}/?food=${query}`);

    return getUniqueListBy<PunkBeer>([...beersByName, ...beersByFood], "id");
  },

  getBeersByIds: async (ids: number[] | string[]): Promise<PunkBeer[]> => {
    const queryIds = ids.join("|");
    return await http<PunkBeer[]>(`${baseUrl}/?ids=${queryIds}`);
  },
};

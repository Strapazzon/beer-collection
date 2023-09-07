import { http } from "@modules/libs/http";

type NewCollectionResponse = {
  collectionId: string;
};

type CollectionResponse = {
  ids: number[];
};

const defaultHeaders = {
  "Content-Type": "application/json",
};

export const CollectionClient = {
  newCollection: async () => {
    return await http<NewCollectionResponse>("/api/collection/new", {
      method: "POST",
      headers: defaultHeaders,
    });
  },

  addBeerToCollection: async (collectionId: string, beerId: number) => {
    return await http<CollectionResponse>(`/api/collection/${collectionId}`, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify({
        beerId,
      }),
    });
  },

  removeBeerFromCollection: async (collectionId: string, beerId: number) => {
    return await http<CollectionResponse>(`/api/collection/${collectionId}`, {
      method: "DELETE",
      headers: defaultHeaders,
      body: JSON.stringify({
        beerId,
      }),
    });
  },

  getCollection: async (collectionId: string) => {
    return await http<CollectionResponse>(`/api/collection/${collectionId}`);
  },
};

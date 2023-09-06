import { http } from "@modules/libs/http";

type NewCollectionResponse = {
  collectionId: string;
};

type CollectionResponse = {
  ids: number[];
};

export const CollectionClient = {
  newCollection: async () => {
    return await http<NewCollectionResponse>("/api/collection/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  addBeerToCollection: async (collectionId: string, beerId: number) => {
    return await http<CollectionResponse>(`/api/collection/${collectionId}`, {
      method: "POST",
      body: JSON.stringify({
        beerId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  removeBeerFromCollection: async (collectionId: string, beerId: number) => {
    return await http<CollectionResponse>(`/api/collection/${collectionId}`, {
      method: "DELETE",
      body: JSON.stringify({
        beerId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  getCollection: async (collectionId: string) => {
    return await http<CollectionResponse>(`/api/collection/${collectionId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};

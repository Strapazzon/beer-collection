import React, { createContext, useCallback, useEffect, useState } from "react";
import { useBrowserStorage } from "@modules/common/hooks/useBrowserStorage";
import { CollectionClient } from "@modules/common/CollectionCLient";

type MyCollectionContextProps = {
  myCollection?: string;
  addToMyCollection: (id: number) => void;
  removeFromMyCollection: (id: number) => void;
  isBeerInMyCollection: (id: number) => boolean;
  collectionIds?: number[];
};

type MyCollectionProviderProps = {
  children: React.ReactNode;
};

export const MyCollectionContext = createContext<MyCollectionContextProps>(
  {} as MyCollectionContextProps
);

export const MyCollectionProvider: React.FC<MyCollectionProviderProps> = ({
  children,
}) => {
  const [collectionIds, setCollectionIds] = useState<number[]>();
  const { storedValue: myCollection, setValue: setCollectionId } =
    useBrowserStorage<string>("my-collection", "");

  const newCollection = useCallback(async () => {
    const { collectionId } = await CollectionClient.newCollection();
    setCollectionId(collectionId);
  }, [setCollectionId]);

  const addToMyCollection = useCallback(
    async (id: number) => {
      const { ids } = await CollectionClient.addBeerToCollection(
        myCollection,
        id
      );

      setCollectionIds(ids);
    },
    [myCollection]
  );

  const removeFromMyCollection = useCallback(
    async (id: number) => {
      const { ids } = await CollectionClient.removeBeerFromCollection(
        myCollection,
        id
      );

      setCollectionIds(ids);
    },
    [myCollection]
  );

  const isBeerInMyCollection = useCallback(
    (id: number) => {
      if (!collectionIds) {
        return false;
      }

      return collectionIds.includes(id);
    },
    [collectionIds]
  );

  const getCollectionIds = useCallback(async () => {
    if (!collectionIds && myCollection) {
      const { ids } = await CollectionClient.getCollection(myCollection);
      setCollectionIds(ids);
    }
  }, [collectionIds, myCollection]);

  useEffect(() => {
    getCollectionIds();

    if (!myCollection) {
      newCollection();
    }
  }, [getCollectionIds, myCollection, newCollection]);

  return (
    <MyCollectionContext.Provider
      value={{
        myCollection,
        addToMyCollection,
        removeFromMyCollection,
        isBeerInMyCollection,
        collectionIds,
      }}
    >
      {children}
    </MyCollectionContext.Provider>
  );
};

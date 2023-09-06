import React, { createContext, useCallback } from "react";
import { useBrowserStorage } from "@modules/common/hooks/useBrowserStorage";

type MyCollectionContextProps = {
  myCollectionIds?: number[];
  addToMyCollection: (id: number) => void;
  removeFromMyCollection: (id: number) => void;
  isBeerInMyCollection: (id: number) => boolean;
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
  const { storedValue: myCollectionIds, setValue } = useBrowserStorage<
    number[]
  >("my-collection", []);

  const addToMyCollection = useCallback(
    (id: number) => {
      if (myCollectionIds.includes(id)) {
        return;
      }
      setValue([...myCollectionIds, id]);
    },
    [myCollectionIds, setValue]
  );

  const removeFromMyCollection = useCallback(
    (id: number) => {
      const list = myCollectionIds.filter((item) => item !== id);
      setValue(list);
    },
    [myCollectionIds, setValue]
  );

  const isBeerInMyCollection = useCallback(
    (id: number) => myCollectionIds.includes(id),
    [myCollectionIds]
  );

  return (
    <MyCollectionContext.Provider
      value={{
        myCollectionIds,
        addToMyCollection,
        removeFromMyCollection,
        isBeerInMyCollection,
      }}
    >
      {children}
    </MyCollectionContext.Provider>
  );
};

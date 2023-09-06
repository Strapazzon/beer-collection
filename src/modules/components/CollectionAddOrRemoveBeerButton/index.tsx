import React, { useCallback, useContext } from "react";
import { MyCollectionContext } from "@modules/common/MyCollection/myCollectionProvider";
import { styled } from "@modules/Theme";
import { Button } from "@radix-ui/themes";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";

type CollectionAddOrRemoveBeerButtonProps = {
  id: number;
};

const AddOrRemoveButton = styled(Button, {
  width: "$full",
});

export const CollectionAddOrRemoveBeerButton: React.FC<
  CollectionAddOrRemoveBeerButtonProps
> = ({ id }) => {
  const { addToMyCollection, isBeerInMyCollection, removeFromMyCollection } =
    useContext(MyCollectionContext);

  const handlerClick = useCallback(() => {
    if (isBeerInMyCollection(id)) {
      removeFromMyCollection(id);
    } else {
      addToMyCollection(id);
    }
  }, [addToMyCollection, id, isBeerInMyCollection, removeFromMyCollection]);

  if (isBeerInMyCollection(id)) {
    return (
      <AddOrRemoveButton
        size="2"
        variant="surface"
        color="red"
        mt="4"
        onClick={handlerClick}
      >
        <MinusIcon />
        Remove from my collection
      </AddOrRemoveButton>
    );
  }

  return (
    <AddOrRemoveButton size="2" variant="surface" mt="4" onClick={handlerClick}>
      <PlusIcon />
      Add to my collection
    </AddOrRemoveButton>
  );
};

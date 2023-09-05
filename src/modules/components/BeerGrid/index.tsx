import React from "react";
import { Grid } from "@radix-ui/themes";
import { PunkBeer } from "@modules/PunkApiClient/punkApi.types";

type BeerGridProps = {
  data: PunkBeer[];
  renderCard?: (beer: PunkBeer) => React.ReactNode;
};

export const BeerGrid: React.FC<BeerGridProps> = ({
  data,
  renderCard = () => null,
}) => {
  return (
    <Grid
      columns={{ lg: "4", md: "3", sm: "2", xs: "1" }}
      gap="3"
      gapY="6"
      width="auto"
    >
      {data.map((beer) => renderCard(beer))}
    </Grid>
  );
};

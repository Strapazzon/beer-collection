import React from "react";
import Image from "next/image";
import { PunkBeer } from "@modules/PunkApiClient/punkApi.types";
import { Card, Flex, Heading, Separator } from "@radix-ui/themes";
import { ShortText } from "../UI/ShortText";

type CatalogBeerCardProps = {
  data: PunkBeer;
};

const [imageWidth, imageHeight] = [48, 190];

export const CatalogBeerCard: React.FC<CatalogBeerCardProps> = ({ data }) => {
  const { id, image_url, name, tagline, description } = data;
  return (
    <Card key={id} size="2">
      <Flex justify="center" align="center">
        <Image
          src={image_url ?? "/assets/bootle-placeholder.png"}
          placeholder="empty"
          alt={`${name} bottle image`}
          height={imageHeight}
          width={imageWidth}
        />
      </Flex>

      <Separator my="4" size="4" />
      <Heading size="2">{name}</Heading>
      <ShortText size="2" maxLines={1} mb="2">
        {tagline}
      </ShortText>
      <ShortText size="1" maxLines={4}>
        {description}
      </ShortText>
    </Card>
  );
};

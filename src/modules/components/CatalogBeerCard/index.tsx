import React from "react";
import Image from "next/image";
import { PunkBeer } from "@modules/common/PunkApiClient/punkApi.types";
import { Card, Flex, Heading, Separator } from "@radix-ui/themes";
import { ShortText } from "../UI/ShortText";
import { CollectionAddOrRemoveBeerButton } from "@modules/components/CollectionAddOrRemoveBeerButton";
import Link from "next/link";

type CatalogBeerCardProps = {
  data: PunkBeer;
};

const [imageWidth, imageHeight] = [48, 190];

export const CatalogBeerCard: React.FC<CatalogBeerCardProps> = ({ data }) => {
  const { id, image_url, name, tagline, description } = data;
  const detailUrl = `/detail/${id}`;

  return (
    <Card size="2">
      <Link href={detailUrl}>
        <Flex justify="center" align="center">
          <Image
            src={image_url ?? "/assets/bootle-placeholder.png"}
            placeholder="empty"
            alt={`${name} bottle image`}
            height={imageHeight}
            width={imageWidth}
          />
        </Flex>
      </Link>

      <Separator my="4" size="4" />
      <Link href={detailUrl}>
        <Heading size="2">
          <ShortText size="2">{name}</ShortText>
        </Heading>
      </Link>
      <ShortText size="2" maxLines={1} mb="2">
        {tagline}
      </ShortText>
      <ShortText size="1" maxLines={2}>
        {description}
      </ShortText>
      <CollectionAddOrRemoveBeerButton id={id} />
    </Card>
  );
};

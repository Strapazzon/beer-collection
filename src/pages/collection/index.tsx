import type { GetServerSideProps, NextPage } from "next";
import { Button, Container, Flex } from "@radix-ui/themes";
import { PageHeader } from "@modules/components/PageHeader";
import { PunkBeer } from "@modules/common/PunkApiClient/punkApi.types";
import { CatalogBeerCard } from "@modules/components/CatalogBeerCard";
import { PageSeo, PageSeoProps } from "@modules/common/PageSeo";
import { getGrayMatter } from "../../gray-matter";
import { BeerGrid } from "@modules/components/BeerGrid";
import { PunkApiClient } from "@modules/common/PunkApiClient";
import { type } from "os";
import { ToggleThemeButton } from "@modules/components/ToggleThemeButton";
import { ChevronLeftIcon, HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useContext } from "react";
import { MyCollectionContext } from "@modules/common/MyCollection/myCollectionProvider";

type CollectionPageData = {
  data: PunkBeer[];
  seoData?: PageSeoProps;
};

const Collection: NextPage<CollectionPageData> = ({ data, seoData }) => {
  const { myCollectionIds } = useContext(MyCollectionContext);

  const filteredData = data.filter((beer) =>
    myCollectionIds?.includes(beer.id)
  );

  return (
    <>
      {seoData ? <PageSeo {...seoData} /> : null}

      <Container size="4">
        <PageHeader
          pageTitle="My Collection"
          rightSlot={
            <Flex direction="row" gap="4">
              <ToggleThemeButton />
            </Flex>
          }
          leftSlot={
            <Link href="/">
              <Button variant="ghost">
                <ChevronLeftIcon width="24" height="24" />
                Back
              </Button>
            </Link>
          }
        />
        <BeerGrid
          data={filteredData}
          renderCard={(beer) => <CatalogBeerCard key={beer.id} data={beer} />}
        />
      </Container>
    </>
  );
};

export default Collection;

export const getServerSideProps: GetServerSideProps<
  CollectionPageData
> = async ({ query }) => {
  const { ids } = query ?? {};

  if (typeof ids !== "string") {
    return {
      notFound: true,
    };
  }

  const arrIds = ids.split(",");
  const data = await PunkApiClient.getBeersByIds(arrIds);

  const seoData = getGrayMatter<PageSeoProps>("home-seo");
  return {
    props: {
      data,
      seoData,
    },
  };
};

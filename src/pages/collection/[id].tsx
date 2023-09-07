import type { GetServerSideProps, NextPage } from "next";
import { Button, Container, Flex } from "@radix-ui/themes";
import { PageHeader } from "@modules/components/PageHeader";
import { PunkBeer } from "@modules/common/PunkApiClient/punkApi.types";
import { CatalogBeerCard } from "@modules/components/CatalogBeerCard";
import { PageSeo, PageSeoProps } from "@modules/common/PageSeo";
import { getGrayMatter } from "@gray-matter";
import { BeerGrid } from "@modules/components/BeerGrid";
import { PunkApiClient } from "@modules/common/PunkApiClient";
import { ToggleThemeButton } from "@modules/components/ToggleThemeButton";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { I18nProvider } from "@modules/common/I18n/I18nContext";
import { kv } from "@vercel/kv";
import { useContext } from "react";
import { MyCollectionContext } from "@modules/common/MyCollection/myCollectionProvider";

type CollectionPageData = {
  data: PunkBeer[];
  seoData?: PageSeoProps;
  i18n?: Record<string, string>;
};

type CollectionPageParams = {
  id: string;
};

const Collection: NextPage<CollectionPageData> = ({ data, seoData, i18n }) => {
  const { collectionIds } = useContext(MyCollectionContext);

  const filteredData = data.filter((beer) => collectionIds?.includes(beer.id));

  return (
    <I18nProvider i18n={i18n}>
      {seoData ? <PageSeo {...seoData} /> : null}

      <Container size="4">
        <PageHeader
          pageTitle="My Collection"
          rightSlot={
            <Flex direction="row" gap="4">
              <ToggleThemeButton ariaLabel={i18n?.toggleThemeLabel} />
            </Flex>
          }
          leftSlot={
            <Link href="/">
              <Button variant="ghost">
                <ChevronLeftIcon width="24" height="24" />
                {i18n?.backButtonLabel}
              </Button>
            </Link>
          }
        />
        <BeerGrid
          data={filteredData}
          renderCard={(beer) => <CatalogBeerCard key={beer.id} data={beer} />}
        />
      </Container>
    </I18nProvider>
  );
};

export default Collection;

export const getServerSideProps: GetServerSideProps<
  CollectionPageData,
  CollectionPageParams
> = async ({ params }) => {
  const { id } = params ?? {};

  if (typeof id !== "string") {
    return {
      notFound: true,
    };
  }

  const arrIds = await kv.lrange<string>(id, 0, -1);

  if (!arrIds) {
    return {
      notFound: true,
    };
  }

  const data = await PunkApiClient.getBeersByIds(arrIds);
  const seoData = getGrayMatter<PageSeoProps>("home-seo");
  const i18n = getGrayMatter<Record<string, string>>("collection");
  return {
    props: {
      data,
      seoData,
      i18n,
    },
  };
};

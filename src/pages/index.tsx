import type { GetServerSideProps, NextPage } from "next";
import { PunkApiClient } from "@modules/PunkApiClient";
import { Container } from "@radix-ui/themes";
import { PageHeader } from "@modules/components/PageHeader";
import { PunkBeer } from "@modules/PunkApiClient/punkApi.types";
import { CatalogBeerCard } from "@modules/components/CatalogBeerCard";
import { PageSeo, PageSeoProps } from "@modules/common/PageSeo";
import { getGrayMatter } from "../gray-matter";
import { BeerGrid } from "@modules/components/BeerGrid";

type HomePageData = {
  data: PunkBeer[];
  seoData?: PageSeoProps;
};

const Home: NextPage<HomePageData> = ({ data, seoData }) => {
  return (
    <>
      {seoData ? <PageSeo {...seoData} /> : null}

      <Container size="4">
        <PageHeader pageTitle="Beer catalog" />

        <BeerGrid
          data={data}
          renderCard={(beer) => <CatalogBeerCard key={beer.id} data={beer} />}
        />
      </Container>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<HomePageData> = async ({
  query,
}) => {
  const { page, page_size } = query ?? {};

  if (Array.isArray(page) || Array.isArray(page_size)) {
    return {
      notFound: true,
    };
  }

  if (
    (page && isNaN(parseInt(page))) ||
    (page_size && isNaN(parseInt(page_size)))
  ) {
    return {
      notFound: true,
    };
  }

  const parsedPage = page ? parseInt(page) : 1;
  const parsedPageSize = page_size ? parseInt(page_size) : 10;

  const data = await PunkApiClient.getBeers(parsedPage, parsedPageSize);
  const seoData = getGrayMatter<PageSeoProps>("home-seo");
  return {
    props: {
      data,
      seoData,
    },
  };
};

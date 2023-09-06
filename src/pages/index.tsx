import type { GetServerSideProps, NextPage } from "next";
import { PunkApiClient } from "@modules/PunkApiClient";
import { Container } from "@radix-ui/themes";
import { PageHeader } from "@modules/components/PageHeader";
import { PunkBeer } from "@modules/PunkApiClient/punkApi.types";
import { CatalogBeerCard } from "@modules/components/CatalogBeerCard";
import { PageSeo, PageSeoProps } from "@modules/common/PageSeo";
import { getGrayMatter } from "../gray-matter";
import { BeerGrid } from "@modules/components/BeerGrid";
import { Pagination } from "@modules/components/Pagination";
import { useRouter } from "next/router";
import { SearchBar } from "@modules/components/SearchBar";
import { useCallback } from "react";

type HomePageData = {
  data: PunkBeer[];
  seoData?: PageSeoProps;
};

const Home: NextPage<HomePageData> = ({ data, seoData }) => {
  const { query } = useRouter();

  const showPagination = !query?.search;
  const currentPage = (query?.page as string) ?? "1";

  const hrefNextPage = `/?page=${parseInt(currentPage) + 1}`;
  const hrefPreviousPage = `/?page=${parseInt(currentPage) - 1}`;

  const router = useRouter();

  const handlerSearch = useCallback(
    (search?: string) => {
      if (search?.length === 0) {
        router.push({
          pathname: "/",
        });
        return;
      } else {
        router.push({
          pathname: "/",
          query: {
            search,
          },
        });
      }
    },
    [router]
  );

  return (
    <>
      {seoData ? <PageSeo {...seoData} /> : null}

      <Container size="4">
        <PageHeader pageTitle={seoData?.title}>
          <SearchBar
            placeholder="Search beers by name or food"
            onSearch={handlerSearch}
            boxProps={{
              my: "3",
            }}
          />
        </PageHeader>
        <BeerGrid
          data={data}
          renderCard={(beer) => <CatalogBeerCard key={beer.id} data={beer} />}
        />
        <Pagination
          boxProps={{
            my: "6",
          }}
          hrefNextPage={hrefNextPage}
          hrefPreviousPage={hrefPreviousPage}
          disabledPreviousPage={parseInt(currentPage) === 1}
          disabledNextPage={data.length < 24}
          hidden={!showPagination}
        />
      </Container>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<HomePageData> = async ({
  query,
}) => {
  const { page, search } = query ?? {};

  if (Array.isArray(page)) {
    return {
      notFound: true,
    };
  }

  if (page && isNaN(parseInt(page))) {
    return {
      notFound: true,
    };
  }

  const parsedPage = page ? parseInt(page) : 1;
  const parsedPageSize = 24;

  let data: PunkBeer[] = [];

  if (search) {
    data = await PunkApiClient.searchBeers(search as string);
  } else {
    data = await PunkApiClient.getBeers(parsedPage, parsedPageSize);
  }
  const seoData = getGrayMatter<PageSeoProps>("home-seo");
  return {
    props: {
      data,
      seoData,
    },
  };
};

import type { GetServerSideProps, NextPage } from "next";
import { PunkApiClient } from "@modules/common/PunkApiClient";
import { Button, Container, Flex, Text } from "@radix-ui/themes";
import { PageHeader } from "@modules/components/PageHeader";
import { PunkBeer } from "@modules/common/PunkApiClient/punkApi.types";
import { CatalogBeerCard } from "@modules/components/CatalogBeerCard";
import { PageSeo, PageSeoProps } from "@modules/common/PageSeo";
import { getGrayMatter } from "@gray-matter/index";
import { BeerGrid } from "@modules/components/BeerGrid";
import { Pagination } from "@modules/components/Pagination";
import { useRouter } from "next/router";
import { SearchBar } from "@modules/components/SearchBar";
import { useCallback, useContext } from "react";
import Link from "next/link";
import { ToggleThemeButton } from "@modules/components/ToggleThemeButton";
import { MyCollectionContext } from "@modules/common/MyCollection/myCollectionProvider";

type HomePageData = {
  data: PunkBeer[];
  seoData?: PageSeoProps;
  i18n?: Record<string, string>;
};

const Home: NextPage<HomePageData> = ({ data, seoData, i18n }) => {
  const { query } = useRouter();

  const showPagination = !query?.search;
  const currentPage = (query?.page as string) ?? "1";

  const hrefNextPage = `/?page=${parseInt(currentPage) + 1}`;
  const hrefPreviousPage = `/?page=${parseInt(currentPage) - 1}`;
  const { myCollectionIds } = useContext(MyCollectionContext);

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
        <PageHeader
          pageTitle={seoData?.title}
          rightSlot={
            <Flex direction="row" gap="4">
              <Link href={`/collection?ids=${myCollectionIds?.toString()}`}>
                <Button variant="ghost">
                  <Text size="3">{i18n?.myCollectionButton}</Text>
                </Button>
              </Link>
              <ToggleThemeButton />
            </Flex>
          }
        >
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
  locale,
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
  const parsedPageSize = Number(process.env.MAX_ITEMS_PER_PAGE);

  let data: PunkBeer[] = [];

  if (search) {
    data = await PunkApiClient.searchBeers(search as string);
  } else {
    data = await PunkApiClient.getBeers(parsedPage, parsedPageSize);
  }
  const seoData = getGrayMatter<PageSeoProps>("home-seo", locale);
  const i18n = getGrayMatter<Record<string, string>>("home", locale);
  return {
    props: {
      data,
      seoData,
      i18n,
    },
  };
};

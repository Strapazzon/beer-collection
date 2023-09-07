import { PageSeo, PageSeoProps } from "@modules/common/PageSeo";
import { PunkBeer } from "@modules/common/PunkApiClient/punkApi.types";
import { GetServerSideProps, NextPage } from "next";
import { PunkApiClient } from "@modules/common/PunkApiClient";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import { PageHeader } from "@modules/components/PageHeader";
import { ToggleThemeButton } from "@modules/components/ToggleThemeButton";
import { getGrayMatter } from "@gray-matter";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { styled } from "@modules/Theme";
import { useRouter } from "next/router";
import { I18nProvider } from "@modules/common/I18n/I18nContext";
import { CollectionAddOrRemoveBeerButton } from "@modules/components/CollectionAddOrRemoveBeerButton";
import { BeerDetailsTable } from "@modules/components/BeerDetailsTable";

type DetailPageData = {
  data: PunkBeer;
  seoData?: PageSeoProps;
  i18n?: Record<string, string>;
};

type DetailPageParams = {
  id: string;
};

const ImageHolder = styled(Box, {
  minWidth: "$3500",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "$full",
});

const DetailPage: NextPage<DetailPageData> = ({ data, seoData, i18n }) => {
  const [imgWidth, imgHeight] = [144, 570];
  const router = useRouter();

  return (
    <I18nProvider i18n={i18n}>
      {seoData ? <PageSeo {...seoData} /> : null}
      <Container size="4" mb="9">
        <PageHeader
          rightSlot={
            <Flex direction="row" gap="4">
              <ToggleThemeButton ariaLabel={i18n?.toggleThemeLabel} />
            </Flex>
          }
          leftSlot={
            <Button variant="ghost" onClick={() => router.back()}>
              <ChevronLeftIcon width="24" height="24" />
              <Text size="3">{i18n?.backButton}</Text>
            </Button>
          }
        ></PageHeader>

        <Flex
          direction={{
            lg: "row",
            md: "column",
            sm: "column",
            xs: "column",
          }}
          gap="4"
        >
          <Card>
            <ImageHolder>
              <Image
                src={data.image_url ?? "/assets/bootle-placeholder.png"}
                alt={`${data.name} ${i18n?.bottleImage}`}
                width={imgWidth}
                height={imgHeight}
              />
            </ImageHolder>
          </Card>

          <Flex direction="column" gap="4">
            <Heading size="8" weight="bold">
              {data.name}
            </Heading>

            <Text size="2">{data.description}</Text>

            <Heading size="4">{i18n?.food}</Heading>
            <Text size="2">{data.food_pairing.join(", ")}</Text>

            <BeerDetailsTable data={data} />
            <CollectionAddOrRemoveBeerButton id={data.id} />
          </Flex>
        </Flex>
      </Container>
    </I18nProvider>
  );
};

export default DetailPage;

export const getServerSideProps: GetServerSideProps<
  DetailPageData,
  DetailPageParams
> = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const { id } = params;
  const data = await PunkApiClient.getBeer(id);
  const beer = data[0];

  if (!data || !beer) {
    return {
      notFound: true,
    };
  }

  const seoData: PageSeoProps = {
    title: beer.name,
    description: beer.description,
    imageUrl: beer.image_url ?? `${process.env.SITE_URL}/assets/open-graph.png`,
    keywords: beer.tagline.split(" ").toString(),
  };

  const i18n = getGrayMatter<Record<string, string>>("detail");

  return {
    props: {
      data: beer,
      seoData,
      i18n,
    },
  };
};

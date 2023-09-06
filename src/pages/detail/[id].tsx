import Link from "next/link";
import { PageSeo, PageSeoProps } from "@modules/common/PageSeo";
import { PunkBeer } from "@modules/common/PunkApiClient/punkApi.types";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { PunkApiClient } from "@modules/common/PunkApiClient";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Separator,
  Table,
  Text,
} from "@radix-ui/themes";
import { PageHeader } from "@modules/components/PageHeader";
import { ToggleThemeButton } from "@modules/components/ToggleThemeButton";
import { MyCollectionContext } from "@modules/common/MyCollection/myCollectionProvider";
import { useContext } from "react";
import { getGrayMatter } from "@gray-matter/index";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { styled } from "@modules/Theme";

type DetailPageData = {
  data: PunkBeer;
  seoData?: PageSeoProps;
  i18n?: Record<string, string>;
};

type DetailPageParams = {
  id: string;
};

const ImageHolder = styled(Card, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minWidth: "$3500",
  flex: 1,
});

const DetailPage: NextPage<DetailPageData> = ({ data, seoData, i18n }) => {
  const { myCollectionIds } = useContext(MyCollectionContext);

  const [imgWidth, imgHeight] = [144, 570];

  return (
    <>
      {seoData ? <PageSeo {...seoData} /> : null}
      <Container size="4">
        <PageHeader
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
          leftSlot={
            <Link href="/">
              <Button variant="ghost">
                <ChevronLeftIcon width="24" height="24" />
                <Text size="3">{i18n?.backButton}</Text>
              </Button>
            </Link>
          }
        ></PageHeader>

        <Flex
          direction={{
            lg: "row",
            md: "row",
            sm: "column",
            xs: "column",
          }}
          gap="4"
        >
          <ImageHolder>
            <Image
              src={data.image_url ?? "/assets/bootle-placeholder.png"}
              alt={data.name}
              width={imgWidth}
              height={imgHeight}
            />
          </ImageHolder>

          <Flex direction="column" gap="4">
            <Heading size="4">{i18n?.details}</Heading>
            <Table.Root>
              <Table.Body>
                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text weight="bold">{i18n?.malt}</Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    {data.ingredients.malt.map((malt) => (
                      <Box key={malt.name}>
                        {malt.name} - {malt.amount.value} {malt.amount.unit}
                      </Box>
                    ))}
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text weight="bold">{i18n?.hops}</Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    {data.ingredients.hops.map((hops) => (
                      <Box key={hops.name}>
                        {hops.name} - {hops.amount.value} {hops.amount.unit}
                      </Box>
                    ))}
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text weight="bold">{i18n?.yeast}</Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>{data.ingredients.yeast}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text weight="bold">{i18n?.attenuation}</Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>{data.attenuation_level}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text weight="bold">{i18n?.boilVolume}</Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>
                    {data.boil_volume.value} {data.boil_volume.unit}
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text weight="bold">{i18n?.brewers}</Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>{data.brewers_tips}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.RowHeaderCell>
                    <Text weight="bold">{i18n?.firstBrewed}</Text>
                  </Table.RowHeaderCell>
                  <Table.Cell>{data.first_brewed}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Flex>
        </Flex>
        <Box my="4">
          <Heading size="8" weight="bold">
            {data.name}
          </Heading>

          <Text size="2">{data.description}</Text>

          <Separator size="4" my="3" />
          <Heading size="4">{i18n?.food}</Heading>
          <Text size="2">{data.food_pairing.join(", ")}</Text>
        </Box>
      </Container>
    </>
  );
};

export default DetailPage;

export const getStaticProps: GetStaticProps<
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
    imageUrl: beer.image_url,
    keywords: beer.tagline.split(" ").toString(),
  };

  const i18n = getGrayMatter<Record<string, string>>("detail");

  return {
    props: {
      data: beer,
      seoData,
      i18n,
    },
    revalidate: Number(process.env.REVALIDATE_STATIC_PAGES ?? 0),
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const maxBeerId = Number(process.env.MAX_BEER_ID ?? 324);

  const paths = new Array(maxBeerId).fill(0).map((_, index) => ({
    params: {
      id: (index + 1).toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

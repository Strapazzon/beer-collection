import React, { useContext } from "react";
import { I18nContext } from "@modules/common/I18n/I18nContext";
import { PunkBeer } from "@modules/common/PunkApiClient/punkApi.types";
import { Box, Heading, Table, Text } from "@radix-ui/themes";

type BeerDetailsTableProps = {
  data: PunkBeer;
};

export const BeerDetailsTable: React.FC<BeerDetailsTableProps> = ({ data }) => {
  const { i18n } = useContext(I18nContext);
  return (
    <>
      <Heading size="4">{i18n?.details}</Heading>
      <Table.Root>
        <Table.Body>
          <Table.Row>
            <Table.RowHeaderCell>
              <Text weight="bold">{i18n?.malt}</Text>
            </Table.RowHeaderCell>
            <Table.Cell>
              {data.ingredients.malt.map((malt, index) => (
                <Box key={index}>
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
              {data.ingredients.hops.map((hops, index) => (
                <Box key={index}>
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
    </>
  );
};

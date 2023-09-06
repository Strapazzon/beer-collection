import React from "react";
import { Box, Flex, Heading, Separator } from "@radix-ui/themes";
import { styled } from "@modules/Theme";

type PageHeaderProps = {
  boxProps?: React.ComponentProps<typeof Box>;
  pageTitle?: string;
  children?: React.ReactNode;
  rightSlot?: React.ReactNode;
  leftSlot?: React.ReactNode;
};

const Wrapper = styled(Box, {
  position: "sticky",
  top: 0,
  zIndex: 1,
  backgroundColor: "$background",
});

export const PageHeader: React.FC<PageHeaderProps> = ({
  boxProps,
  pageTitle,
  children,
  leftSlot,
  rightSlot,
}) => {
  return (
    <Wrapper {...boxProps} my="4">
      <Flex direction="row" align="center" justify="between">
        {leftSlot}
        <Heading
          mb="2"
          size={{
            lg: "8",
            md: "5",
            sm: "3",
            xs: "2",
          }}
        >
          {pageTitle}
        </Heading>
        {rightSlot}
      </Flex>
      {children}
      <Separator mt="4" mb="6" size="4" />
    </Wrapper>
  );
};

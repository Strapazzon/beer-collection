import React from "react";
import { Box, Flex, Heading, Separator } from "@radix-ui/themes";
import { ToggleThemeButton } from "../ToggleThemeButton";

type PageHeaderProps = {
  boxProps?: React.ComponentProps<typeof Box>;
  pageTitle?: string;
};

export const PageHeader: React.FC<PageHeaderProps> = ({
  boxProps,
  pageTitle,
}) => {
  return (
    <Box {...boxProps}>
      <Flex direction="row" align="center" justify="between">
        <Heading mb="2" size="8">
          {pageTitle}
        </Heading>
        <ToggleThemeButton />
      </Flex>
      <Separator mt="4" mb="6" size="4" />
    </Box>
  );
};

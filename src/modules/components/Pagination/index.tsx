import React from "react";
import { Button, Flex, Text } from "@radix-ui/themes";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type PaginationProps = {
  iconSize?: string;
  boxProps?: React.ComponentProps<typeof Flex>;
  hrefNextPage?: string;
  hrefPreviousPage?: string;
  disabledNextPage?: boolean;
  disabledPreviousPage?: boolean;
  hidden?: boolean;
};

export const Pagination: React.FC<PaginationProps> = ({
  boxProps,
  iconSize = "24",
  hrefNextPage = "/",
  hrefPreviousPage = "/",
  disabledNextPage,
  disabledPreviousPage,
  hidden,
}) => {
  if (hidden) {
    return null;
  }

  return (
    <Flex justify="between" align="center" {...boxProps}>
      <Link href={hrefPreviousPage}>
        <Button variant="ghost" disabled={disabledPreviousPage}>
          <ChevronLeftIcon width={iconSize} height={iconSize} />
          <Text size="4">Previous</Text>
        </Button>
      </Link>

      <Link href={hrefNextPage}>
        <Button variant="ghost" disabled={disabledNextPage}>
          <Text size="4">Next</Text>
          <ChevronRightIcon width={iconSize} height={iconSize} />
        </Button>
      </Link>
    </Flex>
  );
};

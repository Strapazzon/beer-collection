import React from "react";
import { Cross1Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, Button, Kbd, TextField } from "@radix-ui/themes";

type SearchBarProps = {
  boxProps?: React.ComponentProps<typeof Box>;
  onSearch?: (value: string) => void;
  placeholder?: string;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  boxProps,
  placeholder,
  onSearch = () => null,
}) => {
  const [value, setValue] = React.useState<string>("");
  const handlerOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(value);
    }
  };

  const cleanSearch = () => {
    setValue("");
    onSearch("");
  };

  return (
    <Box {...boxProps}>
      <TextField.Root size="3">
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Input
          placeholder={placeholder}
          onKeyDown={handlerOnKeyDown}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
        {value.length > 0 ? (
          <TextField.Slot>
            <Button variant="ghost" type="submit" onClick={cleanSearch}>
              <Cross1Icon height="16" width="16" />
            </Button>
          </TextField.Slot>
        ) : null}
        <TextField.Slot>
          <Kbd>Enter &#x21B2;</Kbd>
        </TextField.Slot>
      </TextField.Root>
    </Box>
  );
};

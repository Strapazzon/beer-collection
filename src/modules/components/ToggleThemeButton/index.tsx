import { RadixThemeContext } from "@modules/Theme/RadixThemeProvider";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import React, { SVGAttributes, useContext } from "react";

type ToggleThemeButtonProps = {
  size?: SVGAttributes<SVGElement>["width"];
};

export const ToggleThemeButton: React.FC<ToggleThemeButtonProps> = ({
  size = "24",
}) => {
  const { setDarkMode, darkMode } = useContext(RadixThemeContext);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Button variant="ghost" onClick={toggleDarkMode}>
      {darkMode ? (
        <SunIcon width={size} height={size} />
      ) : (
        <MoonIcon width={size} height={size} />
      )}
    </Button>
  );
};

import { RadixThemeContext } from "@modules/theme/RadixThemeProvider";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import React, { SVGAttributes, useContext } from "react";

type ToggleThemeButtonProps = {
  size?: SVGAttributes<SVGElement>["width"];
  ariaLabel?: string;
};

export const ToggleThemeButton: React.FC<ToggleThemeButtonProps> = ({
  size = "24",
  ariaLabel = "Toggle theme",
}) => {
  const { setDarkMode, darkMode } = useContext(RadixThemeContext);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Button variant="ghost" onClick={toggleDarkMode} aria-label={ariaLabel}>
      {darkMode ? (
        <SunIcon width={size} height={size} />
      ) : (
        <MoonIcon width={size} height={size} />
      )}
    </Button>
  );
};

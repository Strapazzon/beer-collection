import React, { createContext } from "react";
import { Theme, ThemeOptions } from "@radix-ui/themes";
import { useMediaQuery } from "@modules/common/hooks/useMediaQuery";

const theme: Partial<ThemeOptions> = {
  radius: "small",
  accentColor: "indigo",
  panelBackground: "solid",
};

type RadixThemeContextProps = {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
};

type RadixThemeProviderProps = {
  children: React.ReactNode;
};

export const RadixThemeContext = createContext<RadixThemeContextProps>(
  {} as RadixThemeContextProps
);

export const RadixThemeProvider: React.FC<RadixThemeProviderProps> = ({
  children,
}) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = React.useState<boolean>(true);

  React.useEffect(() => {
    setDarkMode(prefersDarkMode);
  }, [prefersDarkMode]);

  return (
    <RadixThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <Theme {...theme} appearance={darkMode ? "dark" : "light"}>
        {children}
      </Theme>
    </RadixThemeContext.Provider>
  );
};

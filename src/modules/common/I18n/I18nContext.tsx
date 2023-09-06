import React, { createContext } from "react";
import { I18n } from "@modules/common/I18n/types";

type I18nContextProps = {
  i18n?: I18n;
};

type I18nProviderProps = {
  children: React.ReactNode;
  i18n?: I18n;
};

export const I18nContext = createContext<I18nContextProps>(
  {} as I18nContextProps
);

export const I18nProvider: React.FC<I18nProviderProps> = ({
  children,
  i18n,
}) => {
  return (
    <I18nContext.Provider value={{ i18n }}>{children}</I18nContext.Provider>
  );
};

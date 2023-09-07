import "@styles/globals.scss";
import "@radix-ui/themes/styles.css";
import type { AppProps } from "next/app";
import { RadixThemeProvider } from "@modules/theme/RadixThemeProvider";
import { MyCollectionProvider } from "@modules/common/MyCollection/myCollectionProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MyCollectionProvider>
      <RadixThemeProvider>
        <Component {...pageProps} />
      </RadixThemeProvider>
    </MyCollectionProvider>
  );
}

import "@styles/globals.scss";
import "@radix-ui/themes/styles.css";
import type { AppProps } from "next/app";
import { RadixThemeProvider } from "@modules/Theme/RadixThemeProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RadixThemeProvider>
      <Component {...pageProps} />;
    </RadixThemeProvider>
  );
}

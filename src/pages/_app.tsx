import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type AppType } from "next/dist/shared/lib/utils";
import { Plus_Jakarta_Sans } from "next/font/google";

import "@/styles/globals.css";

const queryClient = new QueryClient();

const pjs = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Component className={pjs.className} {...pageProps} />
    </QueryClientProvider>
  );
};

export default MyApp;

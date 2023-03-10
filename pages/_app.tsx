import { AppProps } from 'next/app';
import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import getQueryClientConfig from '../lib/client/react-query/queryClientConfig';
import { themes } from '../lib/client/constants';
import 'styles/index.scss';
import { ThemeProvider } from 'next-themes';

export default function App({
  Component,
  pageProps: { session, dehydratedState, ...pageProps },
}: AppProps) {
  const [queryClient] = useState(() => new QueryClient(getQueryClientConfig()));
  return (
    /* <ThemeProvider themes={themes} attribute="class"> */
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
    /*  </ThemeProvider> */
  );
}

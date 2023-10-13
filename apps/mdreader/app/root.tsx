import { SWRConfig } from 'swr';
import { useState } from 'react';
import { Toaster } from '@mdreader/interface';
import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';

import {
  ThemeProvider,
  useTheme,
  PreventFlashOnWrongTheme,
} from 'remix-themes';

import { createBrowserClient } from '@supabase/auth-helpers-remix';

import './index.css';
import '@mdreader/markdown/src/styles/md.css';
import '@mdreader/interface/src/styles/ui.css';

import { getSupabaseServerSession } from './services/supabase';
import { themeSessionResolver } from './sessions.server';
import AppContextProvider from './context/AppContext';
import Layout from './components/layout';

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

function localStorageProvider() {
  if (global?.window) {
    const map = new Map(
      JSON.parse(sessionStorage.getItem('@mdreader/swr-cache') || '[]')
    );

    window.addEventListener('beforeunload', () => {
      const appCache = JSON.stringify(Array.from(map.entries()));
      sessionStorage.setItem('@mdreader/swr-cache', appCache);
    });

    return map as any;
  }

  return new Map();
}

export async function loader({ request }: LoaderFunctionArgs) {
  const ENV = {
    SUPABASE_KEY: process.env.SUPABASE_KEY as string,
    SUPABASE_URL: process.env.SUPABASE_URL as string,
  };

  const [{ session, headers }, { getTheme }] = await Promise.all([
    getSupabaseServerSession(request),
    themeSessionResolver(request),
  ]);

  return {
    ENV,
    headers,
    session,
    theme: getTheme(),
  };
}

function App() {
  const {
    ENV,
    session,
    theme: serverTheme,
  } = useLoaderData<ReturnType<typeof loader>>();

  const [supabaseClient] = useState(() =>
    createBrowserClient(ENV.SUPABASE_URL, ENV.SUPABASE_KEY)
  );

  const [clientTheme] = useTheme();

  return (
    <html className={clientTheme!} lang="en" data-theme={clientTheme ?? ''}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(serverTheme)} />
        <Links />
      </head>
      <body>
        <AppContextProvider
          session={session as any}
          supabaseClient={supabaseClient}
        >
          <Layout>
            <Toaster />
            <Outlet />
          </Layout>
        </AppContextProvider>

        <ScrollRestoration />

        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error, ...props }: any) {
  console.error('ErrorBoundary', { error, props });

  return (
    <html>
      <head>
        <title>Oops... | MD Reader</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div>Unable to load page</div>
        {JSON.stringify(error, null, 2)}
        {/* add the UI you want your users to see */}
        <Scripts />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const { theme } = useLoaderData<ReturnType<typeof loader>>();

  return (
    <ThemeProvider specifiedTheme={theme} themeAction="/action/theme">
      <SWRConfig
        value={{
          provider: localStorageProvider,
          refreshInterval: 0,
          revalidateOnFocus: false,
        }}
      >
        <App />
      </SWRConfig>
    </ThemeProvider>
  );
}

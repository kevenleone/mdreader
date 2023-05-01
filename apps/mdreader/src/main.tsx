import { SWRConfig } from 'swr';
import ReactDOM from 'react-dom/client';

import MDReaderRouter from './Router.tsx';

import './index.css';
import '@mdreader/md/styles/md.css';
import '@mdreader/ui/styles/ui.css';

function localStorageProvider() {
  const map = new Map(JSON.parse(localStorage.getItem('app-cache') || '[]'));

  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem('app-cache', appCache);
  });

  return map as any;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <SWRConfig
    value={{
      refreshInterval: 0,
      provider: localStorageProvider,
      revalidateOnFocus: false,
    }}
  >
    <MDReaderRouter />
  </SWRConfig>
);

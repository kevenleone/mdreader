import React from 'react';
import ReactDOM from 'react-dom/client';
import MDReaderRouter from './Router.tsx';

import './index.css';
import '@mdreader/ui/styles/ui.css';
import '@mdreader/md/styles/md.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MDReaderRouter />
  </React.StrictMode>
);

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import App from './App';
import Layout from './components/layout';

const MDReaderRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route element={<Home />} index />
          <Route element={<App />} path="/app" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MDReaderRouter;

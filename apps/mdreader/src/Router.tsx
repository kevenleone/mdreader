import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Layout from './components/layout';
import Profile from './pages/profile';
import { ProfileOutlet } from './pages/profile/ProfileOutlet';
import { Preview } from './pages/profile/preview';
import { PreviewOutlet } from './pages/profile/preview/PreviewOutlet';

const MDReaderRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />} path="/">
        <Route element={<Home />} index />
        <Route element={<ProfileOutlet />} path="/profile/:username?">
          <Route element={<Profile />} index />

          <Route element={<PreviewOutlet />} path="preview/:id/:slug">
            <Route element={<Preview />} index />
          </Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default MDReaderRouter;

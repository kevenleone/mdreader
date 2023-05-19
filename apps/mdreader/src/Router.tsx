import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Preview } from './pages/profile/preview';
import { PreviewOutlet } from './pages/profile/preview/PreviewOutlet';
import { ProfileOutlet } from './pages/profile/ProfileOutlet';
import Home from './pages/Home';
import Layout from './components/layout';
import Profile from './pages/profile';
import Users from './pages/users';

const MDReaderRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />} path="/">
        <Route element={<Home />} index />
        <Route element={<Users />} path="users" />
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

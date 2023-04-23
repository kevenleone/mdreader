import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import App from './App';
import Layout from './components/layout';
import Profile from './pages/profile';
import { ProfileOutlet } from './pages/profile/ProfileOutlet';

const MDReaderRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route element={<Home />} index />
          <Route element={<App />} path="/app" />
          <Route element={<ProfileOutlet />} path="/profile">
            <Route element={<Profile />} index />
            <Route element={<Profile />} path=":username" />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MDReaderRouter;

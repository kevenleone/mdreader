import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const useSession = () => {
  return useContext(AppContext).session;
};

export default useSession;

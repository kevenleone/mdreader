import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const useSupabase = () => {
  return useContext(AppContext).supabaseClient;
};

export default useSupabase;

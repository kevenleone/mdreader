import { useContext } from 'react';
import { supabase } from '../services/supabase';
import { atomWithCache } from 'jotai-cache';
import { AppContext } from '../context/AppContext';

const useSession = () => {
  return useContext(AppContext).session;
};

export const sessionAtom = atomWithCache(() => supabase.auth.getSession());

export default useSession;

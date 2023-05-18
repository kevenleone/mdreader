import { ReactNode, createContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { AuthSession } from '@supabase/supabase-js';

type Session = AuthSession;

export const AppContext = createContext<{ session: Session | null }>({
  session: null,
});

type AppContextProviderProps = {
  children: ReactNode;
};

const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AppContext.Provider value={{ session }}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;

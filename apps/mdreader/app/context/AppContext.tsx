import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import { AuthSession, UserMetadata } from '@supabase/supabase-js';
import { SupabaseClient } from '@supabase/auth-helpers-remix';

type Session = AuthSession;

type AppContextProviderProps = {
  session: Session | null;
  supabaseClient: SupabaseClient;
  children: ReactNode;
};

export const AppContext = createContext<
  Omit<AppContextProviderProps, 'children'>
>({
  session: null,
  supabaseClient: null as any,
});

const AppContextProvider: React.FC<AppContextProviderProps> = ({
  session: defaultSession,
  supabaseClient,
  children,
}) => {
  const [session, setSession] = useState<Session | null>(defaultSession);

  useEffect(() => {
    supabaseClient.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) =>
      setSession(session)
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AppContext.Provider value={{ session, supabaseClient }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

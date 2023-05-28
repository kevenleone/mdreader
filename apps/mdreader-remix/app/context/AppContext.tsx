import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import { AuthSession, UserMetadata } from '@supabase/supabase-js';
import { useProfile } from '../hooks/useProfiles';
import { SupabaseClient } from '@supabase/auth-helpers-remix';
import { GithubUser, githubProfileService } from '../services/githubProfile';

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
  const githubService = useMemo(
    () => githubProfileService(supabaseClient),
    [supabaseClient]
  );

  const userMetadata = useMemo(
    () =>
      session
        ? ({
            ...session?.user?.user_metadata,
            user_name: session?.user?.user_metadata?.user_name as string,
            user_id: session?.user?.id as string,
          } as UserMetadata)
        : undefined,
    [session]
  );

  const {
    data: profile,
    isLoading,
    isValidating,
    mutate: mutateProfile,
  } = useProfile(userMetadata?.user_name);

  const isProfileLoading = isLoading || isValidating;

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

  useEffect(() => {
    if (userMetadata && !isProfileLoading && !profile) {
      githubService
        .store({
          name: userMetadata?.name,
          photo: userMetadata?.avatar_url,
          id: userMetadata?.user_id as string,
          login: userMetadata?.user_name as string,
        } as GithubUser)
        .then(mutateProfile);
    }
  }, [profile, githubService, userMetadata]);

  return (
    <AppContext.Provider value={{ session, supabaseClient }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

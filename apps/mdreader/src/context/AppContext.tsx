import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../services/supabase';
import { AuthSession, UserMetadata } from '@supabase/supabase-js';
import { useProfile } from '../hooks/useProfiles';
import { GithubUser, githubProfileService } from '../services/githubProfile';

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
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      setSession(session)
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (userMetadata && !isProfileLoading && !profile) {
      githubProfileService
        .store({
          name: userMetadata?.name,
          photo: userMetadata?.avatar_url,
          id: userMetadata?.user_id as string,
          login: userMetadata?.user_name as string,
        } as GithubUser)
        .then(mutateProfile);
    }
  }, [profile, userMetadata]);

  return (
    <AppContext.Provider value={{ session }}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;

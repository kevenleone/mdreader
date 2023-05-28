import { createServerClient } from '@supabase/auth-helpers-remix';

const getSupabaseCredentials = (): {
  SUPABASE_KEY: string;
  SUPABASE_URL: string;
} => {
  if (global.window) {
    return (global.window as any).env;
  }

  return {
    SUPABASE_KEY: process.env.SUPABASE_KEY as string,
    SUPABASE_URL: process.env.SUPABASE_URL as string,
  };
};

export const getSupabaseServerClient = (
  request: Request,
  env: ReturnType<typeof getSupabaseCredentials>
) => {
  const response = new Response();

  const client = createServerClient(env.SUPABASE_URL, env.SUPABASE_KEY, {
    request,
    response,
  });

  return client;
};

export const getSupabaseServerSession = async (
  request: Request,
  env: ReturnType<typeof getSupabaseCredentials>
) => {
  const client = getSupabaseServerClient(request, env);

  const response = new Response();

  const {
    data: { session },
  } = await client.auth.getSession();

  return { client, session, headers: response.headers };
};

import { createServerClient } from '@supabase/auth-helpers-remix';

const getSupabaseCredentials = (): {
  SUPABASE_KEY: string;
  SUPABASE_URL: string;
} => ({
  SUPABASE_KEY: process.env.SUPABASE_KEY as string,
  SUPABASE_URL: process.env.SUPABASE_URL as string,
});

export const getSupabaseServerClient = (request: Request) => {
  const { SUPABASE_KEY, SUPABASE_URL } = getSupabaseCredentials();

  const response = new Response();

  return createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    request,
    response,
  });
};

export const getSupabaseServerSession = async (request: Request) => {
  const client = getSupabaseServerClient(request);

  const response = new Response();

  const {
    data: { session },
  } = await client.auth.getSession();

  return { client, session, headers: response.headers };
};

import { LoaderArgs, redirect, json } from '@remix-run/node';

import { getSupabaseServerClient } from '~/services/supabase';

export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response();
  const code = new URL(request.url).searchParams.get('code');

  if (!code) {
    return json({ message: 'Code is missing' }, { status: 400 });
  }

  const supabaseClient = await getSupabaseServerClient(request, response);

  await supabaseClient.auth.exchangeCodeForSession(code);

  return redirect('/', {
    headers: response.headers,
  });
};

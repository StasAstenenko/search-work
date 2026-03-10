import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  const country = params.get('country');

  const url = new URL(
    `https://api.adzuna.com/v1/api/jobs/${country}/categories`
  );

  url.searchParams.set('app_id', process.env.NEXT_PUBLIC_JOBS_APP_ID!);
  url.searchParams.set('app_key', process.env.NEXT_PUBLIC_JOBS_APP_KEY!);

  const res = await fetch(url.toString());

  console.log(res);

  const data = await res.json();

  return Response.json(data);
}

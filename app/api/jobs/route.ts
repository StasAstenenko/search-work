import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  const country = params.get('country');
  const page = params.get('page');
  const category = params.get('category');
  const sort_by = params.get('sort_by');

  const url = new URL(
    `https://api.adzuna.com/v1/api/jobs/${country}/search/${page}`
  );

  url.searchParams.set('app_id', process.env.NEXT_PUBLIC_JOBS_APP_ID!);
  url.searchParams.set('app_key', process.env.NEXT_PUBLIC_JOBS_APP_KEY!);

  if (category) url.searchParams.set('category', category);
  if (sort_by) url.searchParams.set('sort_by', sort_by);

  const res = await fetch(url.toString());

  if (!res.ok) {
    const text = await res.text();

    return Response.json(
      {
        error: 'Adzuna API error',
        status: res.status,
        message: text,
      },
      { status: res.status }
    );
  }
  const data = await res.json();

  return Response.json(data);
}

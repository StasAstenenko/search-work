import { JOBS_APP_KEY, JOBS_ID } from '@/constant/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  const country = params.get('country');
  const page = params.get('page');
  const category = params.get('category');
  const sort_by = params.get('sort_by');
  const salary_min = params.get('salary_min');
  const salary_max = params.get('salary_max');

  const url = new URL(
    `https://api.adzuna.com/v1/api/jobs/${country}/search/${page}`
  );

  url.searchParams.set('app_id', JOBS_ID);
  url.searchParams.set('app_key', JOBS_APP_KEY);

  if (category) url.searchParams.set('category', category);
  if (sort_by) url.searchParams.set('sort_by', sort_by);
  if (salary_max) url.searchParams.set('salary_max', salary_max);
  if (salary_min) url.searchParams.set('salary_min', salary_min);

  const res = await fetch(url.toString());

  if (!res.ok) {
    const text = await res.text();

    return NextResponse.json(
      {
        error: 'Adzuna API error',
        status: res.status,
        message: text,
      },
      { status: res.status }
    );
  }
  const data = await res.json();

  return NextResponse.json(data);
}

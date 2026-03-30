import { JOBS_APP_KEY, JOBS_ID } from '@/constant/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  const country = params.get('country');

  const url = new URL(`https://api.adzuna.com/v1/api/jobs/${country}/history`);

  url.searchParams.set('app_id', JOBS_ID);
  url.searchParams.set('app_key', JOBS_APP_KEY);

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

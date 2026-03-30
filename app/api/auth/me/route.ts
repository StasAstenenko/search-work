// import { prisma } from '@/lib/prisma';
// import { createSupabaseServer } from '@/lib/server-supabase';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ ok: true });
}

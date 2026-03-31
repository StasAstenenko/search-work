import { prisma } from '@/lib/prisma';
import { createSupabaseServer } from '@/lib/server-supabase';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  if (!data.user) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const user = data.user;

  const userFromPrisma = await prisma.user.findUnique({
    where: { supabaseUserId: user.id },
    include: { favorites: true },
  });

  if (!userFromPrisma) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ user: userFromPrisma });
}

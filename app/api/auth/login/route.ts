import { prisma } from '@/lib/prisma';
import { createSupabaseServer } from '@/lib/server-supabase';
import { LoginProps } from '@/types/Register.types';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServer();

  const body = (await req.json()) as LoginProps;

  const { email, password } = body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
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

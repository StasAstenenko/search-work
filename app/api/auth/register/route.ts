import { prisma } from '@/lib/prisma';
import { createSupabaseServer } from '@/lib/server-supabase';
import { RegisterProps } from '@/types/Register.types';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServer();

  const body = (await req.json()) as RegisterProps;

  const { email, firstName, lastName, password } = body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const user = data.user;

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  if (!user.email) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const userFromPrisma = await prisma.user.upsert({
    where: { supabaseUserId: user.id },
    update: {},
    create: {
      supabaseUserId: user.id,
      email: user.email,
      firstName,
      lastName,
    },
    include: { favorites: true },
  });

  return NextResponse.json({ user: userFromPrisma });
}

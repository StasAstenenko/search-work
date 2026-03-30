import { prisma } from '@/lib/prisma';
import { createSupabaseServer } from '@/lib/server-supabase';
import { LoginProps } from '@/types/Register.types';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServer();

  const { email, password } = (await req.json()) as LoginProps;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  const user = data.user;

  const userFromPrisma = await prisma.user.findUnique({
    where: { supabaseUserId: user.id },
    include: { favorites: true },
  });

  if (!userFromPrisma) {
    return Response.json({ error: 'User not found' }, { status: 404 });
  }

  return Response.json({ user: userFromPrisma });
}

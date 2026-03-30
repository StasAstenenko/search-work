import { prisma } from '@/lib/prisma';
import { createSupabaseServer } from '@/lib/server-supabase';
import { RegisterProps } from '@/types/Register.types';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServer();

  const { email, password, firstName, lastName } =
    (await req.json()) as RegisterProps;

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
    return Response.json({ error: error.message }, { status: 400 });
  }

  const user = data.user;

  if (!user) {
    return Response.json({ error: 'User not found' }, { status: 404 });
  }

  if (!user.email) {
    return Response.json({ error: 'User not found' }, { status: 404 });
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

  return Response.json({ user: userFromPrisma });
}

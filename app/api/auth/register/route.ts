import { prisma } from '@/lib/prisma';
import { createSupabaseServer } from '@/lib/server-supabase';
import { User } from '@/types/Register.types';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServer();

  const { email, password, firstName, lastName } = await req.json();

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

  const userFromPrisma: User = await prisma.user.upsert({
    where: { supabaseUserId: user?.id },
    update: {},
    create: {
      supabaseUserId: user?.id,
      email: user?.email,
      firstName,
      lastName,
    },
  });

  return Response.json({ user: userFromPrisma });
}

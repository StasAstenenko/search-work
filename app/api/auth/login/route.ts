import { prisma } from '@/lib/prisma';
import { createSupabaseServer } from '@/lib/server-supabase';
import { User } from '@/types/Register.types';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServer();

  const { email, password } = await req.json();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  const user = data.user;

  const userFromPrisma: User = await prisma.user.findUnique({
    where: { supabaseUserId: user.id },
  });

  return Response.json({ user: userFromPrisma });
}

import { prisma } from '@/lib/prisma';
import { createSupabaseServer } from '@/lib/server-supabase';
import { User } from '@/types/Register.types';

export async function GET() {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }

  const user = data.user;

  const userFromPrisma: User = await prisma.user.findUnique({
    where: { supabaseUserId: user.id },
  });

  return Response.json({ user: userFromPrisma });
}

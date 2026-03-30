import { prisma } from '@/lib/prisma';
import { createSupabaseServer } from '@/lib/server-supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.auth.getUser();

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

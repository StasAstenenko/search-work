import { prisma } from '@/lib/prisma';
import { createSupabaseServer } from '@/lib/server-supabase';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function DELETE(req: NextRequest) {
  const id = (await req.json()) as string;

  const supabase = await createSupabaseServer();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const profile = await prisma.user.findUnique({
    where: {
      supabaseUserId: user.id,
    },
  });

  if (!profile) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  await prisma.favorite.delete({
    where: {
      userId_jobId: {
        userId: profile.id,
        jobId: String(id),
      },
    },
  });

  return NextResponse.json({ removed: true });
}

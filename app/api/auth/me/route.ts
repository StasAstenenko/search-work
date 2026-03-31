import { prisma } from '@/lib/prisma';
import { createSupabaseServer } from '@/lib/server-supabase';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = await createSupabaseServer();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const userFromPrisma = await prisma.user.findUnique({
      where: {
        supabaseUserId: user.id,
      },

      include: {
        favorites: true,
      },
    });

    return NextResponse.json({
      user: userFromPrisma,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ user: null }, { status: 200 });
  }
}

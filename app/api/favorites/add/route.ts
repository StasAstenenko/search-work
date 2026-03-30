import { prisma } from '@/lib/prisma';
import { createSupabaseServer } from '@/lib/server-supabase';
import { Results } from '@/types/Jobs.type';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Results;

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

  const favorite = await prisma.favorite.upsert({
    where: {
      userId_jobId: {
        userId: profile.id,
        jobId: body.id,
      },
    },
    update: {},
    create: {
      jobId: body.id,
      category: body.category?.label ?? '',
      companyName: body.company?.display_name ?? '',
      description: body.description,
      title: body.title,
      maxSalary: body.salary_max,
      minSalary: body.salary_min,
      redirectUrl: body.redirect_url,
      user: {
        connect: {
          id: profile.id,
        },
      },
    },
  });

  return NextResponse.json({ favorite });
}

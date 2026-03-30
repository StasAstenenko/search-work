import { prisma } from '@/lib/prisma';
import { createSupabaseServer } from '@/lib/server-supabase';
import { profileSchema, UpdateUser } from '@/validation/UpdateUser.validation';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function PATCH(req: NextRequest) {
  const body = (await req.json()) as UpdateUser;
  const supabase = await createSupabaseServer();

  const { data } = await supabase.auth.getUser();

  if (!data) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = data.user;

  const validated = profileSchema.parse(body);

  if (!validated) {
    return NextResponse.json(
      { error: 'Невірно вказані поля' },
      { status: 400 }
    );
  }

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const updatedUser = await prisma.user.update({
    where: { supabaseUserId: user.id },
    data: validated,
  });

  return NextResponse.json({ user: updatedUser });
}

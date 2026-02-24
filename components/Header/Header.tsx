'use client';

import { getUser } from '@/services/auth.services';
import { type User } from '@supabase/supabase-js';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  Briefcase,
  BarChart3,
  LayoutDashboard,
  Settings,
  User as UserIcon,
  ChevronDown,
} from 'lucide-react';

const Header = () => {
  const [user, setUser] = useState<User>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { user } = await getUser();
      if (user) setUser(user);
    };

    fetchUser();
  }, []);

  return (
    <header
      className='w-full px-8 py-4 flex justify-between items-center
    bg-white/70 backdrop-blur-xl shadow-lg border-b border-white/40 relative'
    >
      {/* Navigation */}
      <nav className='flex gap-8 font-medium text-gray-700'>
        <Link
          href='/jobs'
          className='flex items-center gap-2 hover:text-orange-600 
          transition-all duration-300 group'
        >
          <Briefcase size={18} className='group-hover:scale-110 transition' />
          Роботи
        </Link>

        <Link
          href='/stats'
          className='flex items-center gap-2 hover:text-orange-600 
          transition-all duration-300 group'
        >
          <BarChart3 size={18} className='group-hover:scale-110 transition' />
          Статистика
        </Link>

        <Link
          href='/dashboard'
          className='flex items-center gap-2 hover:text-orange-600 
          transition-all duration-300 group'
        >
          <LayoutDashboard
            size={18}
            className='group-hover:scale-110 transition'
          />
          Домашня
        </Link>
      </nav>

      {/* User Menu */}
      <div className='relative'>
        <Button
          onClick={() => setOpen(!open)}
          className='flex items-center gap-2 px-4 py-2 rounded-full
          bg-gradient-to-r from-amber-500 to-orange-500 text-white
          shadow-lg hover:scale-105 transition-all duration-300'
        >
          <UserIcon size={18} />
          <span className='text-sm'>
            {user?.user_metadata.first_name} {user?.user_metadata.last_name}
          </span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </Button>

        {/* Dropdown */}
        <div
          className={`absolute right-0 mt-3 w-48 bg-white/90 backdrop-blur-xl
          rounded-2xl shadow-xl border border-white/40
          transition-all duration-300 origin-top
          ${
            open
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
          }`}
        >
          <ul className='flex flex-col p-2 text-gray-700'>
            <Link
              href='/settings'
              className='flex items-center gap-2 px-3 py-2 rounded-xl
              hover:bg-orange-100 transition-all duration-200'
            >
              <Settings size={16} />
              Налаштування
            </Link>

            <Link
              href='/profile'
              className='flex items-center gap-2 px-3 py-2 rounded-xl
              hover:bg-orange-100 transition-all duration-200'
            >
              <UserIcon size={16} />
              Профіль
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;

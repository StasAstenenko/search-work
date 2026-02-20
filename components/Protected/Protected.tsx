'use client';

import { Token } from '@/types/Token.types';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedProps {
  children: React.ReactNode;
}

const Protected = ({ children }: ProtectedProps) => {
  const route = useRouter();

  useEffect(() => {
    const json = localStorage.getItem('sb-ssetqyogwgmgytjmkmxe-auth-token');

    if (json) {
      const token: Token = JSON.parse(json);
      const { access_token } = token;
      if (!access_token) {
        return route.push('/login');
      }
    } else {
      return route.push('/login');
    }
  }, [route]);

  return <div>{children}</div>;
};

export default Protected;

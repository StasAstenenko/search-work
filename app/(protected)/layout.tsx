import Header from '@/components/Header/Header';
import Protected from '@/components/Protected/Protected';
import TanstackQueryProvider from '@/components/TanstackQueryProvider/TanstackQueryProvider';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Protected>
      <TanstackQueryProvider>
        <Header />
        {children}
      </TanstackQueryProvider>
    </Protected>
  );
}

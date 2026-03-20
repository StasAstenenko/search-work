import Header from '@/components/Header/Header';
import TanstackQueryProvider from '@/components/TanstackQueryProvider/TanstackQueryProvider';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TanstackQueryProvider>
      <Header />
      {children}
    </TanstackQueryProvider>
  );
}

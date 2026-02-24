import Header from '@/components/Header/Header';
import Protected from '@/components/Protected/Protected';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Protected>
      <Header />
      {children}
    </Protected>
  );
}

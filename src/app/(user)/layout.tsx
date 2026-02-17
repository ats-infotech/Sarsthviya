import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

export default async function UserLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='bg-background-secondary'>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

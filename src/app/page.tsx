import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import HomePage from '@/features/home/home';

export default function Home() {
  return (
    <div className='bg-background-secondary h-screen'>
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import ReturnExchange from '@/features/returnexchange/returnexchange';

export default function ReturnExchangePage() {
  return (
    <div className='bg-background-secondary'>
      <Header />
      <ReturnExchange />
      <Footer />
    </div>
  );
}

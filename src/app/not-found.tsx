import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import PageNotFound from '@/features/404/page-not-found';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.'
};

export default function NotFound() {
  return (
    <>
      <Header />
      <PageNotFound />
      <Footer />
    </>
  );
}

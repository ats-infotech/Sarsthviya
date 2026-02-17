import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import ContactUs from '@/features/contactus/contact-us';

export default function ContactUsPage() {
  return (
    <div className='bg-background-secondary'>
      <Header />
      <ContactUs />
      <Footer />
    </div>
  );
}

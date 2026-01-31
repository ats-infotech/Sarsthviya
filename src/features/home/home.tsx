import BestSellerSection from './best-seller/best-seller';
import Collections from './collections/collections';
import DiwaliDhamakaSection from './diwali-dhamaka/diwali-dhamaka';
import EleganceSection from './elegance/elegance-section';
import HeroSection from './hero-section/hero-section';
import NewArrivalSection from './new-arrival/new-arrival';
import SeasonalOffer from './seasonal-offer/seasonal-offer';
import ViralCollections from './viral-collection/viral-collection';

export default function HomePage() {
  return (
    <div className='bg-background-secondary'>
      <HeroSection />
      <NewArrivalSection />
      <DiwaliDhamakaSection />
      <Collections />
      <EleganceSection />
      <SeasonalOffer />
      <BestSellerSection />
      <ViralCollections />
    </div>
  );
}

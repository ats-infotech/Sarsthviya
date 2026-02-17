import OtherCategories from './other-categories/othercategories';
import ProductList from './product-list/productlist';
import SimilarProductSection from './similar-products/similar-products';

export default function ProductListPage() {
  return (
    <div className='bg-background-secondary'>
      <ProductList />
      <SimilarProductSection />
      <OtherCategories />
    </div>
  );
}
